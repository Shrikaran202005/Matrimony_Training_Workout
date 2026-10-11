// --- MOCKED DEPENDENCIES (For standalone execution) ---
const crypto = {
    randomBytes: (size: number) => ({ toString: (format: string) => Math.random().toString(36).substring(2) })
};
const bcrypt = {
    genSalt: async (rounds: number) => 'mock-salt',
    hash: async (data: string, salt: string) => `hashed_${data}`,
    compare: async (data: string, hash: string) => `hashed_${data}` === hash
};

// --- TYPES (types/auth.ts) ---
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    resetTokenHash?: string | null;
    resetTokenExpiry?: Date | null;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    error?: string;
}

// --- SERVICES (services/userService.ts & emailService.ts) ---
export class UserService {
    private users: User[] = [
        { id: 'user_1', email: 'test@example.com', passwordHash: 'hashed_oldpass', createdAt: new Date() }
    ];

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.email === email) || null;
    }

    async findById(userId: string): Promise<User | null> {
        return this.users.find(u => u.id === userId) || null;
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<User> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index === -1) throw new Error("User not found");
        this.users[index] = { ...this.users[index], ...updates };
        return this.users[index];
    }
}

export class EmailService {
    async sendResetEmail(email: string, resetToken: string): Promise<void> {
        console.log(`[EMAIL MOCK] Sent reset link to ${email}: https://app.com/reset?token=${resetToken}`);
    }
}

// --- CORE IMPLEMENTATION (services/authService.ts) ---
export class AuthService {
    constructor(
        private userService: UserService,
        private emailService: EmailService
    ) {}

    private async hashData(data: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data, salt);
    }

    async requestPasswordReset(email: string): Promise<AuthResponse> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            // Security: Return generic success to prevent email enumeration
            return { success: true }; 
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = await this.hashData(rawToken);
        
        // Expiry = Now + 1 Hour
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        await this.userService.updateUser(user.id, {
            resetTokenHash: tokenHash,
            resetTokenExpiry: expiry
        });

        // Format token as userId.rawToken so we can look up the user later
        const deliverableToken = `${user.id}.${rawToken}`;
        await this.emailService.sendResetEmail(user.email, deliverableToken);

        return { success: true };
    }

    async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
        const [userId, rawToken] = token.split('.');
        if (!userId || !rawToken) return { success: false, error: 'Invalid token format' };

        const user = await this.userService.findById(userId);
        if (!user || !user.resetTokenHash || !user.resetTokenExpiry) {
            return { success: false, error: 'Invalid or already used token' };
        }

        if (new Date() > user.resetTokenExpiry) {
            return { success: false, error: 'Token has expired' };
        }

        const isValid = await bcrypt.compare(rawToken, user.resetTokenHash);
        if (!isValid) {
            return { success: false, error: 'Invalid token' };
        }

        const newPasswordHash = await this.hashData(newPassword);

        // Update password and enforce single-use token by clearing fields
        await this.userService.updateUser(user.id, {
            passwordHash: newPasswordHash,
            resetTokenHash: null,
            resetTokenExpiry: null
        });

        return { success: true };
    }
}

// --- TEST SUITE (Requirement 4) ---
async function runTests() {
    const userService = new UserService();
    const emailService = new EmailService();
    const authService = new AuthService(userService, emailService);

    console.log("--- RUNNING 6 TEST CASES ---");

    // Capture the generated token from console output for testing
    let capturedToken = "";
    emailService.sendResetEmail = async (email, token) => { capturedToken = token; };

    // TEST 1: Request reset (valid email)
    const t1 = await authService.requestPasswordReset('test@example.com');
    console.log(`TEST 1 (Request Reset): ${t1.success ? 'PASS' : 'FAIL'}`);

    // TEST 5: Invalid token
    const t5 = await authService.resetPassword(`${capturedToken}bad`, 'newpass123');
    console.log(`TEST 5 (Invalid Token): ${t5.error === 'Invalid token' ? 'PASS' : 'FAIL'}`);

    // TEST 6: Non-existent user
    const t6 = await authService.resetPassword('fake_user.faketoken', 'newpass123');
    console.log(`TEST 6 (Non-existent User): ${t6.error === 'Invalid or already used token' ? 'PASS' : 'FAIL'}`);

    // TEST 2: Confirm with valid token
    const t2 = await authService.resetPassword(capturedToken, 'newpass123');
    console.log(`TEST 2 (Valid Token): ${t2.success ? 'PASS' : 'FAIL'}`);

    // TEST 3: Reuse token
    const t3 = await authService.resetPassword(capturedToken, 'newpass123');
    console.log(`TEST 3 (Reuse Token): ${t3.error === 'Invalid or already used token' ? 'PASS' : 'FAIL'}`);

    // TEST 4: Expired token
    await authService.requestPasswordReset('test@example.com');
    const user = await userService.findByEmail('test@example.com');
    // Force expiry to past
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 2);
    await userService.updateUser(user!.id, { resetTokenExpiry: pastDate });
    
    const t4 = await authService.resetPassword(capturedToken, 'newpass123');
    console.log(`TEST 4 (Expired Token): ${t4.error === 'Token has expired' ? 'PASS' : 'FAIL'}`);
}

runTests();