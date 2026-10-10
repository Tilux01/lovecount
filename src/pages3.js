
export const MORE_SCREENS = `
<section id="screen-timeline" class="lt-screen">
<header class="fixed top-0 inset-x-0 z-50 pt-safe bg-[#FFFBF8]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-20 px-space-lg flex items-center justify-between"><div class="flex flex-col"><div class="flex items-center gap-space-2xs"><span class="font-label-sm text-label-sm text-bubble-rose uppercase tracking-wider">Every Chapter</span><span class="inline-block w-1.5 h-1.5 rounded-full bg-bubble-pink animate-pulse"></span></div><h1 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Our Timeline</h1></div><div data-goto="settings" class="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-bubble-pink via-bubble-yellow to-bubble-blue"><span class="material-symbols-outlined text-[18px] text-white">person</span></div></div></header>
<main class="flex-1 flex flex-col relative w-full pt-20 pb-28 px-margin-mobile bg-transparent"><div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between px-space-xs pt-1"><button data-goto="moments" aria-label="Go back" class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-on-surface shadow-[0_4px_16px_-2px_rgba(30,34,51,0.06)] active:scale-95 transition-transform" type="button"><span class="material-symbols-outlined text-[20px]">arrow_back_ios_new</span></button><div class="flex items-center gap-1.5 px-space-md py-1 bg-subtle-lavender rounded-full shadow-sm"><span class="material-symbols-outlined text-bubble-rose text-[16px]" style="font-variation-settings:'FILL' 1;">timeline</span><span class="font-label-md text-label-md text-secondary">Timeline</span></div><div class="w-11"></div></div>
<div class="flex items-center justify-between px-space-xs"><h3 class="font-headline-md text-headline-md text-on-surface">Your Story</h3><span class="font-label-md text-label-md text-text-subtle" id="tl-count">0 entries</span></div>
<div class="flex flex-col space-y-space-md" id="timeline-list"></div>
</div></main></section>

<section id="screen-care_log" class="lt-screen">
<header class="fixed top-0 inset-x-0 z-50 pt-safe bg-[#FFFBF8]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-20 px-space-lg flex items-center justify-between"><div class="flex flex-col"><div class="flex items-center gap-space-2xs"><span class="font-label-sm text-label-sm text-bubble-rose uppercase tracking-wider">Gentle Tracking</span><span class="inline-block w-1.5 h-1.5 rounded-full bg-bubble-pink animate-pulse"></span></div><h1 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Care Log</h1></div><div data-goto="settings" class="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-bubble-pink via-bubble-yellow to-bubble-blue"><span class="material-symbols-outlined text-[18px] text-white">person</span></div></div></header>
<main class="flex-1 flex flex-col relative w-full pt-20 pb-28 px-margin-mobile bg-transparent"><div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between px-space-xs pt-1"><button data-goto="care" aria-label="Go back" class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-on-surface shadow-[0_4px_16px_-2px_rgba(30,34,51,0.06)] active:scale-95 transition-transform" type="button"><span class="material-symbols-outlined text-[20px]">arrow_back_ios_new</span></button><div class="flex items-center gap-1.5 px-space-md py-1 bg-subtle-lavender rounded-full shadow-sm"><span class="material-symbols-outlined text-bubble-rose text-[16px]" style="font-variation-settings:'FILL' 1;">spa</span><span class="font-label-md text-label-md text-secondary">New Entry</span></div><div class="w-11"></div></div>
<div class="p-space-lg rounded-3xl bg-card-surface shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05)] flex flex-col gap-space-sm">
<span class="font-headline-md text-headline-md text-on-surface" id="cl-title">How are you feeling?</span>
<div class="lc-field"><label>Date</label><input class="lc-input" id="cl-date" type="date"/></div>
<div class="lc-field"><label>Mood</label><div class="lc-chips" id="cl-mood"><button type="button" class="lc-chip" data-v="Radiant">Radiant</button><button type="button" class="lc-chip" data-v="Calm">Calm</button><button type="button" class="lc-chip" data-v="Tired">Tired</button><button type="button" class="lc-chip" data-v="Tender">Tender</button><button type="button" class="lc-chip" data-v="Low">Low</button></div></div>
<div class="lc-field"><label>Flow</label><div class="lc-chips" id="cl-flow"><button type="button" class="lc-chip" data-v="None">None</button><button type="button" class="lc-chip" data-v="Light">Light</button><button type="button" class="lc-chip" data-v="Medium">Medium</button><button type="button" class="lc-chip" data-v="Heavy">Heavy</button></div></div>
<div class="lc-field"><label>Symptoms</label><div class="lc-chips" id="cl-sym"><button type="button" class="lc-chip" data-v="Cramps">Cramps</button><button type="button" class="lc-chip" data-v="Headache">Headache</button><button type="button" class="lc-chip" data-v="Bloating">Bloating</button><button type="button" class="lc-chip" data-v="Back pain">Back pain</button><button type="button" class="lc-chip" data-v="Fatigue">Fatigue</button></div></div>
<div class="lc-field"><label>Notes</label><textarea class="lc-area" id="cl-note" rows="2" placeholder="Anything you want to remember"></textarea></div>
</div>
<button class="lc-btn ghost" id="cl-start" type="button"><span class="material-symbols-outlined">water_drop</span>Period started this day</button>
<button class="lc-btn primary" id="cl-save" type="button"><span class="material-symbols-outlined">save</span>Save entry</button>
</div></main></section>

<section id="screen-privacy" class="lt-screen">
<header class="fixed top-0 inset-x-0 z-50 pt-safe bg-[#FFFBF8]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-20 px-space-lg flex items-center justify-between"><div class="flex flex-col"><div class="flex items-center gap-space-2xs"><span class="font-label-sm text-label-sm text-bubble-rose uppercase tracking-wider">Your Data</span><span class="inline-block w-1.5 h-1.5 rounded-full bg-bubble-pink animate-pulse"></span></div><h1 class="font-headline-sm text-headline-sm text-on-surface leading-tight">Privacy</h1></div><div data-goto="settings" class="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-bubble-pink via-bubble-yellow to-bubble-blue"><span class="material-symbols-outlined text-[18px] text-white">person</span></div></div></header>
<main class="flex-1 flex flex-col relative w-full pt-20 pb-28 px-margin-mobile bg-transparent"><div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between px-space-xs pt-1"><button data-goto="settings" aria-label="Go back" class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-on-surface shadow-[0_4px_16px_-2px_rgba(30,34,51,0.06)] active:scale-95 transition-transform" type="button"><span class="material-symbols-outlined text-[20px]">arrow_back_ios_new</span></button><div class="flex items-center gap-1.5 px-space-md py-1 bg-subtle-lavender rounded-full shadow-sm"><span class="material-symbols-outlined text-bubble-rose text-[16px]" style="font-variation-settings:'FILL' 1;">shield_lock</span><span class="font-label-md text-label-md text-secondary">Privacy</span></div><div class="w-11"></div></div>
<div id="privacy-body" class="flex flex-col gap-space-md"></div>
</div></main></section>
`;

export const MORE_JS = `
(function(){
  if(window.__LC_MORE__) return; window.__LC_MORE__=true;
  var D=window.__LC_DATA__||{};
  var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DOW=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function $(s,r){ return (r||document).querySelector(s); }
  function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
  function esc(s){ s=String(s==null?'':s); var o=''; for(var i=0;i<s.length;i++){ var c=s.charAt(i); if(c==='&'){o+='&amp;';} else if(c==='<'){o+='&lt;';} else if(c==='>'){o+='&gt;';} else if(c==='"'){o+='&quot;';} else {o+=c;} } return o; }
  function st(){ return (window.LC&&window.LC.state)?window.LC.state():null; }
  function toast(m,i){ if(window.LC&&window.LC.toast) window.LC.toast(m,i); }
  function go(s){ if(window.__ltGo) window.__ltGo(s); }
  function save(){ if(window.LC&&window.LC.save) window.LC.save(); }
  function renderAll(){ if(window.LC&&window.LC.renderAll) window.LC.renderAll(); }
  function native(a,p){ if(window.LC&&window.LC.native) window.LC.native(a,p); }
  function partner(){ return D.partner||{name:'Esther',birthdayMonth:10,birthdayDay:7,birthYear:2007}; }
  function role(){ var s=st(); return (s&&s.myRole)||((D.me&&D.me.name)||'Israel'); }
  function owner(){ if(role()==='Esther') return 'Your'; return partner().name+String.fromCharCode(8217)+'s'; }
  function me(){ return (D.me&&D.me.name)||'Israel'; }
  function today(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
  function diff(a,b){ return Math.round((b-a)/86400000); }
  function nextOn(m,d){ var t=today(),y=t.getFullYear(); var x=new Date(y,((m||1)-1),(d||1)); if(x<t) x=new Date(y+1,((m||1)-1),(d||1)); return x; }
  function bdayNext(){ var p=partner(); return nextOn(p.birthdayMonth,p.birthdayDay); }
  function daysToBday(){ return diff(today(),bdayNext()); }
  function turningAge(){ return bdayNext().getFullYear()-(partner().birthYear||2007); }
  function currentAge(){ return Math.max(0,turningAge()-1); }
  function startDate(){ return new Date(((D.relationship&&D.relationship.startISO)||'2025-08-10')+'T00:00:00'); }
  function daysTogether(){ var n=diff(startDate(),today()); return n>0?n:0; }
  function ordinal(n){ n=Number(n); var s=['th','st','nd','rd'],v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }
  function parseMD(md){ var p=String(md||'').split('-'); return {m:parseInt(p[0],10)||1,d:parseInt(p[1],10)||1}; }
  function setText(sel,val){ var el=$(sel); if(el) el.textContent=val; }
  function streak(){ var S=st(); return (S&&S.streak&&S.streak.count)||1; }
  function nextEvent(){ var S=st(); if(!S||!S.events||!S.events.length) return null; var best=null,bd=1e9; S.events.forEach(function(e){ var p=parseMD(e.date); var dt=nextOn(p.m,p.d); var d=diff(today(),dt); if(d<bd){bd=d;best={e:e,dt:dt,d:d};} }); return best; }
  function pretty(dt){ return dt.getDate()+' '+MON[dt.getMonth()]+' '+dt.getFullYear(); }

  function empty(icon,title,sub){ return '<div class="lc-empty"><span class="material-symbols-outlined">'+esc(icon)+'</span><strong>'+esc(title)+'</strong><p>'+esc(sub)+'</p></div>'; }

  /* ------------------------------------------------ clear leftover dummy */
  function clearBento(){
    var box=$('#mm-bento'); if(!box) return;
    var S=st(); if(!S) return;
    var recent=S.moments.slice(-2).reverse();
    if(!recent.length){ box.innerHTML=empty('photo_library','No moments yet','Tap Add Memory to fill your gallery'); return; }
    var tones=['bubble-amber','bubble-blue','bubble-rose','bubble-emerald'];
    box.innerHTML=recent.map(function(m,i){ var t=tones[i%4];
      return '<div data-goto="moment_detail" data-id="'+esc(m.id)+'" class="relative flex flex-col justify-between h-44 p-3.5 rounded-2xl bg-'+t+'/15 shadow-[0_10px_24px_-4px_rgba(30,34,51,0.18)] overflow-hidden cursor-pointer active:scale-[0.98] transition-all">'+
        '<div class="relative w-full flex-1 flex items-center justify-center">'+(m.photo?'<img class="w-24 h-24 rounded-2xl object-cover" src="'+esc(m.photo)+'"/>':'<span class="material-symbols-outlined text-[48px] text-'+t+'">'+(m.icon||'photo_camera')+'</span>')+'</div>'+
        '<div class="relative z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-xl"><span class="font-label-sm text-label-sm text-on-surface font-bold truncate">'+esc(m.title)+'</span><span class="font-label-sm text-label-sm text-text-muted">'+esc(m.when||'')+'</span></div></div>';
    }).join('');
  }

  /* ------------------------------------------------ hydrate real content */
  function hydrateTiles(){
    var g=$('#wl-tiles'); if(!g) return;
    var S=st(); if(!S) return;
    var p=partner(), db=daysToBday(), dt=daysTogether();
    var ne=nextEvent();
    var lastM=S.moments&&S.moments.length?S.moments[S.moments.length-1]:null;
    var start=S.care&&S.care.lastStart?new Date(S.care.lastStart+'T00:00:00'):null;
    var cyc=start?(diff(start,today())+1):0;
    var defs=[
      {label:'Birthday', val:(db===0?'Today!':db+' days'), act:'birthday'},
      {label:'Together', val:dt+' days', act:'home'},
      {label:'Next Event', val:(ne?ne.e.title:'Add one'), act:'events'},
      {label:'Quick Call', val:'Call '+p.name, act:'call'},
      {label:'Last Memory', val:(lastM?lastM.title:'Add one'), act:'moments'},
      {label:'Care', val:(cyc?('Day '+cyc):'Stay gentle'), act:'care'}
    ];
    Array.prototype.slice.call(g.children).forEach(function(tile,i){
      var ps=$$('p',tile);
      if(ps[0]) ps[0].textContent=defs[i].label;
      if(ps[1]) ps[1].textContent=defs[i].val;
      var badge=$$('span.font-label-sm',tile);
      if(i===1 && badge.length) badge[badge.length-1].textContent='Day '+dt;
      tile.setAttribute('data-more', defs[i].act);
      tile.style.cursor='pointer';
    });
  }

  function hydrate(){
    var S=st(); if(!S) return;
    var p=partner(), db=daysToBday(), dt=daysTogether(), ta=turningAge(), ca=currentAge();
    var ne=nextEvent();
    setText('#hm-hero-title', p.name+'\\u2019s Birthday');
    setText('#hm-hero-sub', db===0 ? ('Today is '+owner()+' Special '+ordinal(ta)+' Birthday!') : (db+' Days Until '+owner()+' Special '+ordinal(ta)+' Birthday!'));
    setText('#hm-streak', streak()+' Day Love Streak');
    setText('#nt-count', S.notes.length+' notes');
    setText('#ev-count', S.events.length+' total');
    if(ne){
      setText('#ev-hero-title', ne.e.title);
      setText('#ev-hero-sub', ne.dt.getDate()+' '+MON[ne.dt.getMonth()]+' \\u2022 '+DOW[ne.dt.getDay()]);
      $$('#screen-events .font-countdown-numeral').forEach(function(e){ e.textContent=String(ne.d); });
    }
    var start=S.care&&S.care.lastStart?new Date(S.care.lastStart+'T00:00:00'):null;
    var cyc=start?(diff(start,today())+1):0;
    var nextP=start?new Date(start.getTime()+(S.care.cycleLength||28)*86400000):null;
    setText('#care-day', cyc?('Day '+cyc):'Not started');
    setText('#care-next', nextP?('Next '+nextP.getDate()+' '+MON[nextP.getMonth()]):'Log a period to predict');
    setText('#care-count', (S.care&&S.care.log?S.care.log.length:0)+' logged');
    setText('#nd-days', String(dt));
    setText('#nd-streak', String(streak()));
    setText('#tl-count', (S.moments.length+S.notes.length)+' entries');
    hydrateNoteDetail(S);
    hydrateBirthday(S);
    hydrateSettings(S);
    hydrateTiles();
    clearBento();
    renderCareReminders(S);
    renderTimeline(S);
  }

  function hydrateNoteDetail(S){
    if(!S.notes.length){ setText('#nd-quote','\\u201CWrite your first note and it will live here.\\u201D'); setText('#nd-author',me()); return; }
    var n=S.notes[0];
    setText('#nd-quote','\\u201C'+n.body+'\\u201D');
    setText('#nd-author', n.from);
  }

  function hydrateBirthday(S){
    var root=$('#screen-birthday'); if(!root) return;
    var p=partner(), db=daysToBday();
    var h2=$('h2',root); if(h2) h2.textContent=p.name;
    $$('span, p', root).forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t==='23 Years Old') el.textContent=currentAge()+' Years Old';
      else if(t==='Turning 24') el.textContent='Turning '+turningAge();
      else if(t==='24th') el.textContent=ordinal(turningAge());
      else if(t==='12d 14h') el.textContent=db+'d';
      else if(t==='842 Days') el.textContent=daysTogether()+' Days';
      else if(t==='24 October, 2001') el.textContent=p.birthdayDay+' '+MON[(p.birthdayMonth||1)-1]+', '+(p.birthYear||2007);
    });
  }

  function hydrateSettings(S){
    var root=$('#screen-settings'); if(!root) return;
    $$('span', root).forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t==='Tilux & Sarah' || t==='Tilux & Girlfriend' || t==='Israel & Esther') el.textContent=me()+' & '+partner().name;
      else if(t.indexOf('Together 842 days')===0) el.textContent='Together '+daysTogether()+' days \\u2022 Since 10 August 2025';
      else if(t==='Loverly Pastel Play theme') el.textContent=(S.settings.appearance||'Loverly Pastel Play')+' theme';
      else if(t==='Every morning at 8:30 AM') el.textContent='Every morning at '+(S.settings.reminder||'08:30');
    });
  }

  /* ------------------------------------------------ care reminders */
  function renderCareReminders(S){
    var box=$('#care-reminders'); if(!box) return;
    var rems=[];
    var p=partner(), db=daysToBday();
    if(db<=30) rems.push({icon:'cake',tone:'bubble-pink',title:p.name+'\\u2019s Birthday',sub:'in '+db+' days \\u2022 Plan something lovely',when:(db===0?'Today':'in '+db+' days')});
    var start=S.care&&S.care.lastStart?new Date(S.care.lastStart+'T00:00:00'):null;
    if(start){
      var nextP=new Date(start.getTime()+(S.care.cycleLength||28)*86400000);
      var d=diff(today(),nextP);
      rems.push({icon:'water_drop',tone:'bubble-rose',title:'Next period expected',sub:pretty(nextP),when:(d<=0?'Due':'in '+d+' days')});
    } else {
      rems.push({icon:'water_drop',tone:'bubble-rose',title:'Log a cycle start',sub:'Tap Log an entry to begin gentle tracking',when:'Setup'});
    }
    rems.push({icon:'chat_bubble',tone:'bubble-purple',title:'Write a note',sub:'One sentence is enough, it counts',when:(S.settings.reminder||'20:00')});
    box.innerHTML=rems.map(function(r){
      return '<div class="bg-surface-container-lowest p-space-lg rounded-3xl shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05),0_2px_6px_-1px_rgba(30,34,51,0.02)] flex items-center justify-between active:scale-[0.99] transition-transform">'+
        '<div class="flex items-center gap-space-md min-w-0"><div class="relative w-14 h-14 rounded-2xl bg-'+r.tone+'/15 flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-[28px] text-'+r.tone+'" style="font-variation-settings:\\'FILL\\' 1;">'+r.icon+'</span></div>'+
        '<div class="flex flex-col min-w-0"><h4 class="font-headline-sm text-headline-sm text-on-surface truncate">'+esc(r.title)+'</h4><span class="font-body-sm text-body-sm text-text-muted mt-0.5">'+esc(r.sub)+'</span>'+
        '<div class="mt-1.5 inline-flex items-center gap-1 w-max px-2 py-0.5 rounded-full bg-'+r.tone+'/15 text-'+r.tone+' font-label-sm text-label-sm"><span class="material-symbols-outlined text-[12px]" style="font-variation-settings:\\'FILL\\' 1;">hourglass_top</span><span>'+esc(r.when)+'</span></div></div></div>'+
        '<button aria-label="Care reminder options" data-more="care-reminder" class="w-9 h-9 rounded-full flex items-center justify-center text-text-subtle" type="button"><span class="material-symbols-outlined text-[20px]">more_horiz</span></button></div>';
    }).join('');
  }

  /* ------------------------------------------------ timeline */
  function renderTimeline(S){
    var box=$('#timeline-list'); if(!box) return;
    var items=[];
    S.events.forEach(function(e){ var p=parseMD(e.date); var dt=nextOn(p.m,p.d); items.push({at:dt,icon:(e.kind==='birthday'?'cake':'event'),tone:'bubble-pink',title:e.title,sub:'Upcoming \\u2022 '+dt.getDate()+' '+MON[dt.getMonth()],goto:'event_detail',id:e.id}); });
    S.moments.forEach(function(m){ items.push({at:new Date(),icon:'photo_library',tone:'bubble-blue',title:m.title,sub:(m.place||'A moment')+' \\u2022 '+(m.when||''),goto:'moment_detail',id:m.id}); });
    S.notes.forEach(function(n){ items.push({at:new Date(n.at||Date.now()),icon:'chat_bubble',tone:'bubble-purple',title:(n.body||'').slice(0,48),sub:'Note from '+(n.from||me()),goto:'note_detail',id:n.id}); });
    if(!items.length){ box.innerHTML=empty('timeline','Nothing here yet','Add events, moments and notes to build your story'); return; }
    items.sort(function(a,b){ return b.at-a.at; });
    box.innerHTML=items.map(function(it){
      return '<div data-goto="'+it.goto+'" data-id="'+esc(it.id)+'" class="bg-card-surface rounded-3xl p-space-lg shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05),0_2px_6px_-1px_rgba(30,34,51,0.02)] flex items-center gap-space-md active:scale-[0.99] transition-transform">'+
        '<div class="flex items-center justify-center w-11 h-11 rounded-2xl bg-'+it.tone+'/15 text-'+it.tone+' shrink-0"><span class="material-symbols-outlined text-[22px]" style="font-variation-settings:\\'FILL\\' 1;">'+it.icon+'</span></div>'+
        '<div class="flex flex-col min-w-0"><span class="font-headline-sm text-headline-sm text-on-surface truncate">'+esc(it.title)+'</span><span class="font-body-sm text-body-sm text-text-muted truncate">'+esc(it.sub)+'</span></div></div>';
    }).join('');
  }

  /* ------------------------------------------------ privacy page */
  function renderPrivacy(){
    var box=$('#privacy-body'); if(!box) return;
    box.innerHTML=
      '<div class="p-space-lg rounded-3xl bg-card-surface shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05)] flex flex-col gap-2">'+
      '<span class="font-headline-md text-headline-md text-on-surface">Your privacy matters</span>'+
      '<p class="font-body-md text-body-md text-text-muted leading-relaxed">Everything you add to LoveCount is stored on this device first. If cloud sync is on, your entries are also written to your private paired room so '+esc(partner().name)+' can see them. Nobody else has access.</p></div>'+
      '<div class="p-space-lg rounded-3xl bg-card-surface shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05)] flex flex-col gap-2">'+
      '<span class="font-headline-sm text-headline-sm text-on-surface">Care data stays private</span>'+
      '<p class="font-body-sm text-body-sm text-text-muted">Cycle tracking is hidden behind '+esc(partner().name)+'\\u2019s password when the privacy lock is on.</p></div>'+
      '<button class="lc-row" id="pr-export" type="button"><span class="material-symbols-outlined">download</span><span>Export my data</span></button>'+
      '<button class="lc-row danger" id="pr-wipe" type="button"><span class="material-symbols-outlined">delete_forever</span><span>Erase all local data</span></button>';
    var ex=$('#pr-export'); if(ex) ex.addEventListener('click', function(){ var S=st(); native('exportData',{json:JSON.stringify(S)}); toast('Preparing export','download'); });
    var wp=$('#pr-wipe'); if(wp) wp.addEventListener('click', function(){ LC.confirmSheet('Erase everything?','All events, notes and memories on this phone will be deleted.','Erase', function(){ window.LC.state(); native('wipe',{}); try{ localStorage.removeItem('lc.state.v1'); }catch(e){} location.reload(); }); });
  }

  /* ------------------------------------------------ care log page */
  function setupCareLogPage(){
    var root=$('#screen-care_log'); if(!root) return;
    function pick(sel){ var on=$('#'+sel+' .lc-chip.on'); return on?on.getAttribute('data-v'):''; }
    var S0=st(); var owner=!S0||!S0.myRole||S0.myRole==='Esther';
    var sig=owner?'o':'v';
    if(root.__sig!==sig){
      root.__sig=sig;
      var t0=$('#cl-title'); if(t0) t0.textContent = owner ? 'How are you feeling?' : 'How is '+partner().name+' feeling?';
      var sv0=$('#cl-save'); if(sv0){ sv0.disabled=!owner; sv0.style.opacity=owner?'1':'.45'; }
      var st0b=$('#cl-start'); if(st0b){ st0b.disabled=!owner; st0b.style.opacity=owner?'1':'.45'; }
      $$('#screen-care_log .lc-chip').forEach(function(b){ b.disabled=!owner; });
      var nb=$('#cl-wnote');
      if(!owner && !nb){
        nb=document.createElement('button');
        nb.type='button'; nb.className='lc-btn pink'; nb.id='cl-wnote';
        nb.innerHTML='<span class="material-symbols-outlined">edit_note</span>Write a note';
        nb.addEventListener('click', function(){ if(window.LC&&window.LC.openCareNote) window.LC.openCareNote(); });
        var host0=root.querySelector('main > div'); if(host0) host0.appendChild(nb);
      }
      if(owner && nb && nb.parentNode) nb.parentNode.removeChild(nb);
    }
    if(root.__wired) return; root.__wired=true;
    $$('#screen-care_log .lc-chips').forEach(function(g){ $$('.lc-chip',g).forEach(function(b){ b.addEventListener('click', function(){ if(!requireEsther()) return; $$('.lc-chip',g).forEach(function(x){ x.className='lc-chip'; }); b.className='lc-chip on'; }); }); });
    var dEl=$('#cl-date'); if(dEl){ var t=new Date(); dEl.value=t.getFullYear()+'-'+('0'+(t.getMonth()+1)).slice(-2)+'-'+('0'+t.getDate()).slice(-2); }
    var st1=$('#cl-start'); if(st1) st1.addEventListener('click', function(){
      if(!requireEsther()) return;
      var S=st(), d=$('#cl-date').value||new Date().toISOString().slice(0,10);
      S.care.lastStart=d; S.care.log.push({label:'Period started', at:pretty(new Date(d+'T00:00:00'))}); save(); hydrate();
      toast('Cycle start logged','water_drop'); go('care');
    });
    var sv=$('#cl-save'); if(sv) sv.addEventListener('click', function(){
      if(!requireEsther()) return;
      var S=st(); var mood=pick('cl-mood'), flow=pick('cl-flow'), sym=pick('cl-sym'), note=($('#cl-note').value||'').trim();
      var bits=[]; if(mood) bits.push('Mood: '+mood); if(flow) bits.push('Flow: '+flow); if(sym) bits.push('Symptom: '+sym); if(note) bits.push(note);
      if(!bits.length){ toast('Pick at least one','spa'); return; }
      if(mood) S.care.mood=mood;
      var d=$('#cl-date').value||new Date().toISOString().slice(0,10);
      S.care.log.push({label:bits.join(' \\u2022 '), at:pretty(new Date(d+'T00:00:00'))});
      save(); hydrate(); toast('Care entry saved','spa'); go('care');
    });
  }
  function requireEsther(){ var S=st(); if(S && S.myRole && S.myRole!=='Esther'){ toast('Only '+partner().name+' can log care data','lock'); return false; } return true; }

  /* ------------------------------------------------ wiring */
  function wire(){
    if(window.__LC_WIRED__) return; window.__LC_WIRED__=true;
    document.addEventListener('click', function(e){
      var t=e.target; if(!t||!t.closest) return;

      var tile=t.closest('#wl-tiles [data-more]');
      if(tile){ var act=tile.getAttribute('data-more'); if(act==='call'){ native('dial',{name:partner().name}); toast('Calling '+partner().name+'...','call'); } else { go(act); } return; }

      if(t.closest('#st-signout') || (t.closest('button') && (t.closest('button').textContent||'').trim()==='Sign Out')){
        LC.confirmSheet('Sign out?','You can pick your profile again next time.','Sign out', function(){ go('role'); toast('Signed out','logout'); }); return;
      }

      // care quick log tiles + Log an entry
      var careKey=t.closest('#screen-care .flex-col.items-center') ;
      if(careKey && !t.closest('[data-more]')){ var lbl=(careKey.textContent||'').trim(); if(/Mood|Flow|Symptoms/.test(lbl)){ go('care_log'); return; } }

      var vtl=t.closest('button'); 
      if(vtl && (vtl.textContent||'').trim().indexOf('View Timeline')===0){ go('timeline'); return; }

      var timelineLink=t.closest('#screen-moments a, #screen-birthday a');
      if(timelineLink && (timelineLink.textContent||'').indexOf('View All')===0){ go('timeline'); return; }

      var capsule=t.closest('#screen-moments .flex.items-center.justify-between.p-space-md');
      if(capsule && (capsule.textContent||'').indexOf('Time Capsule')!==-1){ openCapsule(); return; }

      var bm=t.closest('[aria-label="Bookmark note"]');
      if(bm){ toast('Note bookmarked','bookmark_added'); return; }

      var sync=t.closest('button');
      if(sync && (sync.textContent||'').trim()==='Sync Data'){ go('auth'); return; }

      var pr=t.closest('[data-more="privacy"]');
      if(pr){ go('privacy'); return; }

      var more=t.closest('[data-more="care-reminder"]');
      if(more){ LC.actionSheet('Care reminder',[ {icon:'notifications',label:'Remind me',run:function(){ toast('Reminder set','notifications'); }}, {icon:'edit',label:'Write a note',run:function(){ if(LC.openNoteForm) LC.openNoteForm(); }} ]); return; }
    }, false);

    // note detail emoji + hearts
    var reply=$('#note-reply-text');
    $$('#screen-note_detail .text-xl button').forEach(function(b){ b.addEventListener('click', function(){ if(reply){ reply.value+=b.textContent; } }); });
    var hearts=$('#nd-hearts');
    if(hearts) hearts.addEventListener('click', function(){ var S=st(); var n=S.notes[0]; if(n){ n.hearts=(n.hearts||0)+1; save(); var sp=$('span',hearts); if(sp) sp.textContent=String(n.hearts); toast('Heart sent','favorite'); } });

    // moments composer save
    var sv=$('#save-composer');
    if(sv) sv.addEventListener('click', function(){
      var modal=$('#composer-content'); if(!modal) return;
      var inp=$('input',modal), ta=$('textarea',modal);
      var title=(inp&&inp.value||'').trim(), body=(ta&&ta.value||'').trim();
      var whisper=$('#composer-content .bg-primary');
      var S=st();
      if(!title && !body){ toast('Add a title or a few words','edit_note'); return; }
      var d=new Date();
      S.moments.push({id:'m'+Date.now(),title:title||'A lovely moment',body:body,place:'',photo:'',when:d.getDate()+' '+MON[d.getMonth()].slice(0,3),photos:1,icon:'photo_camera'});
      save(); if(inp) inp.value=''; if(ta) ta.value=''; renderAll(); hydrate(); toast('Saved to your timeline','photo_library');
    });
    $$('#composer-content .text-xl button').forEach(function(b){ b.addEventListener('click', function(){ var ta=$('#composer-content textarea'); if(ta) ta.value=(ta.value||'')+' '+b.textContent; }); });
    // composer type pills
    $$('#composer-content .flex.gap-space-xs .flex-1').forEach(function(b){ b.addEventListener('click', function(){ var sib=b.parentElement.children; Array.prototype.forEach.call(sib,function(x){ x.className='flex-1 py-1 rounded-full text-on-surface-variant font-label-sm text-label-sm'; }); b.className='flex-1 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm'; }); });

    // settings rows
    wireSettings();
    // privacy row inject
    var prefs=$('#screen-settings .flex.flex-col.space-y-space-md');
    if(prefs && !$('#row-privacy')){
      var row=document.createElement('div');
      row.id='row-privacy';
      row.className='flex items-center justify-between p-3.5 px-4 rounded-2xl bg-card-surface shadow-[0_8px_24px_-4px_rgba(30,34,51,0.05),0_2px_6px_-1px_rgba(30,34,51,0.02)] active:scale-[0.99] transition-transform';
      row.innerHTML='<div class="flex items-center gap-3.5 min-w-0"><div class="flex items-center justify-center w-11 h-11 rounded-2xl bg-bubble-blue/15 text-bubble-blue shrink-0"><span class="material-symbols-outlined text-[22px]" style="font-variation-settings:\\'FILL\\' 1;">shield_lock</span></div><div class="flex flex-col min-w-0"><span class="font-headline-sm text-headline-sm text-on-surface truncate">Privacy</span><span class="font-body-sm text-body-sm text-text-muted truncate">How your data is kept safe</span></div></div><span class="material-symbols-outlined text-[20px] text-text-subtle">chevron_right</span>';
      row.setAttribute('data-more','privacy'); row.style.cursor='pointer';
      prefs.appendChild(row);
    }
  }

  function wireSettings(){
    $$('#screen-settings .flex.items-center.justify-between.p-3\\\\.5').forEach(function(row){
      if(row.__w) return; row.__w=true;
      var label=(row.querySelector('.font-headline-sm')||{}).textContent||'';
      if(label.indexOf('Daily Reminder')===0){
        row.style.cursor='pointer';
        row.addEventListener('click', function(){ LC.actionSheet('Reminder time',['06:30','07:30','08:00','08:30','09:00','20:00'].map(function(v){ return {icon:'schedule',label:v,run:function(){ var S=st(); S.settings.reminder=v; save(); hydrate(); toast('Reminder set to '+v,'schedule'); }}; })); });
      } else if(label.indexOf('Appearance')===0){
        row.style.cursor='pointer';
        row.addEventListener('click', function(){ LC.actionSheet('Appearance',['Loverly Pastel Play','Soft Rose','Midnight Lavender','Classic Lovely'].map(function(v){ return {icon:'palette',label:v,run:function(){ var S=st(); S.settings.appearance=v; save(); hydrate(); toast('Theme: '+v,'palette'); }}; })); });
      } else if(label.indexOf('Language')===0){
        row.style.cursor='pointer';
        row.addEventListener('click', function(){ LC.actionSheet('Language',['English (United States)','English (United Kingdom)','Fran\\u00e7ais','Espa\\u00f1ol'].map(function(v){ return {icon:'language',label:v,run:function(){ var S=st(); S.settings.language=v; save(); hydrate(); toast('Language: '+v,'language'); }}; })); });
      } else if(label.indexOf('Care Privacy')===0){
        row.style.cursor='pointer';
        row.addEventListener('click', function(){ if(LC.openCareSettings) LC.openCareSettings(); });
      } else if(label.indexOf('About')===0){
        row.style.cursor='pointer';
        row.addEventListener('click', function(){ go('about'); });
      }
    });
  }

  function openCapsule(){
    LC.openSheet('Time capsule','<div class="lc-field"><label>Seal a note for the future</label><textarea class="lc-area" id="cap-body" rows="3" placeholder="Words to open on a special day"></textarea></div><button class="lc-btn primary" id="cap-save" type="button"><span class="material-symbols-outlined">lock</span>Seal capsule</button>', function(sh){
      var b=$('#cap-save',sh); if(b) b.addEventListener('click', function(){ var v=($('#cap-body',sh).value||'').trim(); if(!v){ toast('Write something first','edit_note'); return; } var S=st(); S.notes.unshift({id:'n'+Date.now(),from:me(),body:v,mood:'Time Capsule',hearts:0,replies:[],at:new Date().toISOString()}); save(); renderAll(); hydrate(); LC.closeSheet(); toast('Capsule sealed','lock'); });
    });
  }

  function onEnter(screen){
    if(screen==='timeline'){ renderTimeline(st()); }
    if(screen==='privacy'){ renderPrivacy(); }
    if(screen==='care_log'){ setupCareLogPage(); }
    if(screen==='settings'){ wireSettings(); hydrateSettings(st()); }
  }

  function run(){
    if(!st()){ setTimeout(run,250); return; }
    // wrap navigation so hydration follows every screen change
    if(!window.__ltGoWrapped && window.__ltGo){
      var orig=window.__ltGo;
      window.__ltGo=function(s){ orig(s); try{ onEnter(s); hydrate(); }catch(e){} };
      window.__ltGoWrapped=true;
    }
    // wrap renderAll so lists refresh heroes too
    if(window.LC && !window.LC.__wrappedRA){ var ora=window.LC.renderAll; window.LC.renderAll=function(){ try{ora();}catch(e){} try{hydrate();}catch(e){} }; window.LC.__wrappedRA=true; }
    wire();
    hydrate();
    setupCareLogPage();
    renderPrivacy();
  }
  setTimeout(run, 1200);
  window.addEventListener('load', function(){ setTimeout(run, 600); });
})();
`;
