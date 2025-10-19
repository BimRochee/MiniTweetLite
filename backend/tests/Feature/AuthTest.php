<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test user registration with valid data
     */
    public function test_user_can_register_with_valid_data()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'created_at',
                        'updated_at'
                    ],
                    'token'
                ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com'
        ]);
    }

    /**
     * Test user registration validation
     */
    public function test_user_registration_requires_valid_data()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /**
     * Test user registration with minimum password length
     */
    public function test_user_registration_requires_minimum_password_length()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => '123'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test user registration with duplicate email
     */
    public function test_user_cannot_register_with_duplicate_email()
    {
        User::factory()->create(['email' => 'john@example.com']);

        $userData = [
            'name' => 'Jane Doe',
            'email' => 'john@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test user login with valid credentials
     */
    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('password123')
        ]);

        $loginData = [
            'email' => 'john@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/login', $loginData);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'user' => [
                        'id',
                        'name',
                        'email'
                    ],
                    'token'
                ]);
    }

    /**
     * Test user login with invalid credentials
     */
    public function test_user_cannot_login_with_invalid_credentials()
    {
        $loginData = [
            'email' => 'john@example.com',
            'password' => 'wrongpassword'
        ];

        $response = $this->postJson('/api/login', $loginData);

        $response->assertStatus(401)
                ->assertJson([
                    'message' => 'Invalid credentials'
                ]);
    }

    /**
     * Test authenticated user can access protected route
     */
    public function test_authenticated_user_can_access_protected_route()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/user');

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $user->id,
                    'email' => $user->email
                ]);
    }

    /**
     * Test unauthenticated user cannot access protected route
     */
    public function test_unauthenticated_user_cannot_access_protected_route()
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(401);
    }

    /**
     * Test user can logout
     */
    public function test_user_can_logout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Logout successful'
                ]);
    }

    /**
     * Test user can get their profile via /me endpoint
     */
    public function test_user_can_get_profile_via_me_endpoint()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/me');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'created_at',
                        'updated_at'
                    ]
                ])
                ->assertJson([
                    'success' => true,
                    'user' => [
                        'id' => $user->id,
                        'email' => $user->email,
                        'name' => $user->name
                    ]
                ]);
    }
}
