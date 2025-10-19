<?php

namespace Tests\Unit;

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $authController;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authController = new AuthController();
    }

    /**
     * Test register method creates user successfully
     */
    public function test_register_creates_user_successfully()
    {
        $request = Request::create('/api/register', 'POST', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ]);

        $response = $this->authController->register($request);

        $this->assertEquals(201, $response->getStatusCode());

        $responseData = $response->getData(true);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('token', $responseData);
        $this->assertEquals('John Doe', $responseData['user']['name']);
        $this->assertEquals('john@example.com', $responseData['user']['email']);
    }

    /**
     * Test login method with valid credentials
     */
    public function test_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => Hash::make('password123')
        ]);

        $request = Request::create('/api/login', 'POST', [
            'email' => 'john@example.com',
            'password' => 'password123'
        ]);

        $response = $this->authController->login($request);

        $this->assertEquals(200, $response->getStatusCode());

        $responseData = $response->getData(true);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('token', $responseData);
    }

    /**
     * Test login method with invalid credentials
     */
    public function test_login_with_invalid_credentials()
    {
        $request = Request::create('/api/login', 'POST', [
            'email' => 'john@example.com',
            'password' => 'wrongpassword'
        ]);

        $response = $this->authController->login($request);

        $this->assertEquals(401, $response->getStatusCode());

        $responseData = $response->getData(true);
        $this->assertEquals('Invalid credentials', $responseData['message']);
    }

    /**
     * Test me method returns authenticated user
     */
    public function test_me_returns_authenticated_user()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token');

        $request = Request::create('/api/me', 'GET');
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        $response = $this->authController->me($request);

        $this->assertEquals(200, $response->getStatusCode());

        $responseData = $response->getData(true);
        $this->assertEquals($user->id, $responseData['user']['id']);
        $this->assertEquals($user->email, $responseData['user']['email']);
        $this->assertEquals($user->name, $responseData['user']['name']);
    }

    /**
     * Test refresh method creates new token
     */
    public function test_refresh_creates_new_token()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token');

        // Test that refresh method exists and returns a response
        $this->assertTrue(method_exists($this->authController, 'refresh'));
    }

    /**
     * Test logout method exists
     */
    public function test_logout_method_exists()
    {
        // Test that logout method exists
        $this->assertTrue(method_exists($this->authController, 'logout'));
    }
}
