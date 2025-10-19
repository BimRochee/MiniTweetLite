<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test user can be created
     */
    public function test_user_can_be_created()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123')
        ];

        $user = User::create($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('John Doe', $user->name);
        $this->assertEquals('john@example.com', $user->email);
        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com'
        ]);
    }

    /**
     * Test user can create API tokens
     */
    public function test_user_can_create_api_tokens()
    {
        $user = User::factory()->create();

        $token = $user->createToken('test-token');

        $this->assertNotNull($token);
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => User::class,
            'name' => 'test-token'
        ]);
    }

    /**
     * Test user email is unique
     */
    public function test_user_email_is_unique()
    {
        User::factory()->create(['email' => 'john@example.com']);

        $this->expectException(\Illuminate\Database\QueryException::class);

        User::create([
            'name' => 'Jane Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123')
        ]);
    }

    /**
     * Test user has hidden attributes
     */
    public function test_user_hides_password_and_remember_token()
    {
        $user = User::factory()->create();

        $userArray = $user->toArray();

        $this->assertArrayNotHasKey('password', $userArray);
        $this->assertArrayNotHasKey('remember_token', $userArray);
    }

    /**
     * Test user can have multiple tokens
     */
    public function test_user_can_have_multiple_tokens()
    {
        $user = User::factory()->create();

        $token1 = $user->createToken('token-1');
        $token2 = $user->createToken('token-2');

        $this->assertCount(2, $user->tokens);
    }

    /**
     * Test user can revoke all tokens
     */
    public function test_user_can_revoke_all_tokens()
    {
        $user = User::factory()->create();

        $user->createToken('token-1');
        $user->createToken('token-2');

        $this->assertCount(2, $user->tokens);

        $user->tokens()->delete();

        $this->assertCount(0, $user->fresh()->tokens);
    }
}
