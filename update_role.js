const fs = require('fs');
let content = fs.readFileSync('src/newscreens.js', 'utf8');

const roleScreen = `  // -------------------------------------------------- ROLE SELECT
  screen("role", "Who is using this device?", "Setup",
    \`<div class="flex flex-col gap-space-md p-space-xl text-center h-full justify-center">
      <span class="material-symbols-outlined text-[64px] text-primary mb-4" style="font-variation-settings:'FILL' 1;">favorite</span>
      <h2 class="font-headline-lg text-headline-lg text-on-surface">Welcome to LoveCount</h2>
      <p class="font-body-lg text-text-muted mb-space-xl">Please select who is using this device so we can personalize your experience.</p>
      
      <div class="flex gap-space-md">
        <button type="button" class="flex-1 bg-bubble-blue/10 border-2 border-bubble-blue/20 rounded-3xl p-space-lg flex flex-col items-center gap-space-sm active:scale-95 transition-transform" id="btn-role-israel">
          <span class="material-symbols-outlined text-[40px] text-bubble-blue">face</span>
          <span class="font-headline-sm text-on-surface">Israel</span>
        </button>
        
        <button type="button" class="flex-1 bg-bubble-pink/10 border-2 border-bubble-pink/20 rounded-3xl p-space-lg flex flex-col items-center gap-space-sm active:scale-95 transition-transform" id="btn-role-esther">
          <span class="material-symbols-outlined text-[40px] text-bubble-pink">face_3</span>
          <span class="font-headline-sm text-on-surface">Esther</span>
        </button>
      </div>
    </div>\`),
`;

content = content.replace('  // -------------------------------------------------- AUTH', roleScreen + '\n  // -------------------------------------------------- AUTH');
fs.writeFileSync('src/newscreens.js', content);
