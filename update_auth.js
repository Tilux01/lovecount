const fs = require('fs');
let content = fs.readFileSync('src/newscreens.js', 'utf8');

const authScreen = `  // -------------------------------------------------- AUTH
  screen("auth", "Sync with Partner", "Pair Devices",
    \`<div class="flex flex-col gap-space-md">\${back("welcome", "Welcome", "login")}
      <div class="p-space-lg flex flex-col gap-space-md">
        <p class="font-body-md text-text-muted">Enter your email and password to sync your LoveCount data with your partner.</p>
        <div class="lc-field">
          <label>Email</label>
          <input type="email" id="auth-email" class="lc-input" placeholder="you@example.com"/>
        </div>
        <div class="lc-field">
          <label>Password</label>
          <input type="password" id="auth-password" class="lc-input" placeholder="Min 6 characters"/>
        </div>
        <div class="flex gap-space-sm mt-2">
          <button type="button" class="lc-btn ghost flex-1" id="btn-signup">Sign Up</button>
          <button type="button" class="lc-btn primary flex-1" id="btn-login">Login</button>
        </div>
      </div>
    </div>\`),
`;

content = content.replace('  // -------------------------------------------------- ABOUT', authScreen + '\n  // -------------------------------------------------- ABOUT');

fs.writeFileSync('src/newscreens.js', content);
