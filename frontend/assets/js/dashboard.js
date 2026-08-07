
// /* ---------- Global chart defaults ---------- */
//     Chart.defaults.color = '#8A94A6';
//     Chart.defaults.font.family = "'IBM Plex Mono', monospace";
//     Chart.defaults.font.size = 11;
//     Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
//     const GRID = {color:'rgba(120,132,150,0.10)', drawTicks:false};
//     const AMBER = '#E8A33D', TEAL = '#4FD1C5', RED='#E8555C', MUTED='#525d70';

//     /* Shared modern tooltip styling applied to every chart */
//     const TOOLTIP_STYLE = {
//         enabled:true,
//     backgroundColor:'rgba(16,21,29,0.96)',
//     titleColor:'#EDF1F6',
//     bodyColor:'#8A94A6',
//     borderColor:'rgba(255,255,255,0.10)',
//     borderWidth:1,
//     padding:10,
//     cornerRadius:10,
//     displayColors:true,
//     boxPadding:4,
//     titleFont:{family:"'Space Grotesk', sans-serif", weight:'600', size:12},
//     bodyFont:{family:"'IBM Plex Mono', monospace", size:11.5},
//     caretSize:5,
// };

//     function fmtAxis(scaleOpts){ return Object.assign({grid:GRID, border:{display:false}, ticks:{color:'#8A94A6', padding:6}}, scaleOpts||{ }); }

//     /* Soft vertical fade gradient used for line-chart fills */
//     function fadeGradient(ctx, colorHex){
//   const chartArea = ctx.chart.chartArea;
//     if(!chartArea) return colorHex+'22';
//     const g = ctx.chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//     g.addColorStop(0, colorHex+'55');
//     g.addColorStop(1, colorHex+'02');
//     return g;
// }
//     /* Subtle top-to-bottom gradient used for bar fills */
//     function barGradient(ctx, colorHex){
//   const chartArea = ctx.chart.chartArea;
//     if(!chartArea) return colorHex;
//     const g = ctx.chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//     g.addColorStop(0, colorHex);
//     g.addColorStop(1, colorHex+'99');
//     return g;
// }

//     /* ---------- Clock ---------- */
//     function tickClock(){
//   const el = document.getElementById('clockVal');
//     const dEl = document.getElementById('clockDate');
//     const d = new Date();
//     el.textContent = d.toLocaleTimeString('en-IN',{hour12:false});
//     if(dEl) dEl.textContent = d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replace(/ /g,' ');
// }
//     tickClock(); setInterval(tickClock,1000);

//     /* ---------- Nav switching ---------- */
//     const titles = {
//         exec:['Executive Summary','Morning brief · consolidated across all states & channels'],
//     mlhub:['AI & Machine Learning Intelligence Center','The predictive core of InsightIQ Analytics'],
//     risk:['Fraud Detection','Real-time transaction risk scoring'],
//     scam:['Scam Detection','Refund fraud, seller scams & account takeovers'],
//     fakenews:['Fake News Detection','Misinformation screening for brand-related content'],
//     forecast:['Demand Forecasting','Model-projected revenue and demand, festival-aware'],
//     segment:['Customer Segmentation','Automatic clustering by value and risk'],
//     recommend:['Recommendation Engine','Actions ranked by estimated impact'],
//     xai:['Explainable AI (XAI)','Reasoning behind every prediction'],
//     revenue:['Revenue Intelligence','Growth, targets, and where every rupee comes from'],
//     customer:['Customer Intelligence','Lifetime value, cohorts, and churn risk'],
//     sales:['Sales Intelligence','Trend, timing, and team performance'],
//     marketing:['Marketing Intelligence','Spend efficiency across every channel'],
//     product:['Product Analytics','What sells, what sits, what to discount'],
//     inventory:['Inventory Intelligence','Stock health across the network'],
//     supply:['Supply Chain Analytics','Supplier reliability and delivery performance'],
//     finance:['Financial Intelligence','Margin, cash flow, working capital & GST'],
//     ops:['Operations Analytics','Click-to-doorstep performance'],
//     support:['Customer Support Analytics','Ticket volume and resolution speed'],
//     geo:['Geographic Intelligence','Where the business is growing, state by state'],
//     sustain:['Sustainability Dashboard','Emissions, packaging, and ESG'],
//     alerts:['Alerts Center','Everything needing attention right now'],
//     reports:['Report Center','Schedule, export, and share'],
//     settings:['Settings','Console configuration and access']
// };
//     /* nav click handling now lives in goToPage(), wired further below */

//     /* ---------- Ticker ---------- */
//     const tickerData = [
//     ['REV TODAY','₹1,84,920','up'],['ORDERS','2,041','up'],['AOV','₹96.40','up'],
//     ['CONV RATE','3.42%','up'],['CANCELLATIONS','142','down'],['FRAUD BLOCKS','2','down'],
//     ['INVENTORY HEALTH','88/100',''],['CSAT','4.6/5','up'],['SLA','96.4%','up'],
//     ['CHARGEBACKS','0.34%','up'],['FORECAST ACC.','94.2%','up'],['ACTIVE SESSIONS','14,208','up']
//     ];
//     function buildTicker(){
//   const track = document.getElementById('tickerTrack');
//     let html='';
//     for(let r=0;r<2;r++){
//         tickerData.forEach(([lbl, val, dir]) => {
//             const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '▬';
//             const cls = dir === 'up' ? 'up' : dir === 'down' ? 'down' : '';
//             html += `<span class="ticker-item"><span class="lbl">${lbl}</span><span class="val ${cls}">${arrow} ${val}</span></span>`;
//         });
//   }
//     track.innerHTML = html;
// }
//     buildTicker();

//     /* ---------- Chart helpers ---------- */
//     function lineChart(ctx,labels,data,color,fill=true){
//   return new Chart(ctx,{type:'line',data:{labels, datasets:[{data, borderColor:color,
//     backgroundColor:fill ? (c)=>fadeGradient(c,color) : 'transparent',
//     fill,tension:.4,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:color,pointHoverBorderColor:'#0A0E13',pointHoverBorderWidth:2,borderWidth:2.25,borderCapStyle:'round'}]},
//     options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
//     plugins:{legend:{display:false},tooltip:TOOLTIP_STYLE},scales:{x:fmtAxis(),y:fmtAxis()}}});
// }
//     function barChart(ctx,labels,data,color){
//   return new Chart(ctx,{type:'bar',data:{labels, datasets:[{data, backgroundColor:(c)=>barGradient(c,color),borderRadius:6,maxBarThickness:34,hoverBackgroundColor:color}]},
//     options:{responsive:true,maintainAspectRatio:false,
//     plugins:{legend:{display:false},tooltip:TOOLTIP_STYLE},scales:{x:fmtAxis(),y:fmtAxis()}}});
// }
//     function doughnut(ctx,labels,data,colors){
//   return new Chart(ctx,{type:'doughnut',data:{labels, datasets:[{data, backgroundColor:colors,borderColor:'#10151d',borderWidth:3,hoverOffset:6,borderRadius:4}]},
//     options:{responsive:true,maintainAspectRatio:false,cutout:'66%',
//     plugins:{legend:{position:'bottom',labels:{boxWidth:9,boxHeight:9,padding:14,color:'#8A94A6',usePointStyle:true,pointStyle:'circle'}},tooltip:TOOLTIP_STYLE}}});
// }
//     function horizBar(ctx,labels,data,color){
//   return new Chart(ctx,{type:'bar',data:{labels, datasets:[{data, backgroundColor:(c)=>barGradient(c,color),borderRadius:6,hoverBackgroundColor:color}]},
//     options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
//     plugins:{legend:{display:false},tooltip:TOOLTIP_STYLE},scales:{x:fmtAxis(),y:fmtAxis()}}});
// }


//     const days30 = Array.from({length:30},(_,i)=>'D'+(i+1));
//     const months12 = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];

//     /* Executive */
//     lineChart(document.getElementById('chartExecRevenue'), days30,
//   days30.map((_,i)=>120000+Math.sin(i/3)*15000+i*2200+Math.random()*8000), AMBER);

//     /* Revenue Intelligence */
//     doughnut(document.getElementById('chartRevByCategory'),
//     ['Electronics','Home','Apparel','Outdoor','Beauty'],[34,22,19,14,11],[AMBER,TEAL,'#6b7cff','#c47a1f','#3a4658']);
//     doughnut(document.getElementById('chartRevByPayment'),
//     ['Card','Digital Wallet','BNPL','Bank Transfer'],[48,29,15,8],[AMBER,TEAL,'#6b7cff','#3a4658']);
//     barChart(document.getElementById('chartRevMonthly'), months12,
//     [2.8,3.0,3.3,3.6,4.4,3.1,2.9,3.2,3.5,3.7,3.8,3.92], AMBER);
//     new Chart(document.getElementById('chartRevWaterfall'),{
//         type:'bar',
//     data:{labels:['Start','New','Upsell','Churn','Refunds','End'],
//     datasets:[{data:[[0,3.6],[3.6,3.9],[3.9,4.15],[3.75,3.9],[3.62,3.75],[0,3.62]],
//       backgroundColor:[MUTED,TEAL,TEAL,RED,RED,AMBER],borderRadius:4}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:fmtAxis(),y:fmtAxis({title:{display:true,text:'₹ Cr'}})}}});

//     /* Customer */
//     new Chart(document.getElementById('chartRFM'),{type:'polarArea',
//     data:{labels:['Champions','Loyal','At Risk','New','Hibernating'],datasets:[{data:[28,24,14,20,14],
//     backgroundColor:[AMBER+'cc',TEAL+'cc','#6b7cffcc','#c47a1fcc','#3a4658cc']}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,color:'#8A94A6'}}},scales:{r:{grid:GRID,ticks:{display:false}}}}});
//     lineChart(document.getElementById('chartCohort'), ['M0','M1','M2','M3','M4','M5'], [100,64,48,39,33,29], TEAL,false);
//     horizBar(document.getElementById('chartCustFunnel'), ['Visited','Added to Cart','Checkout Started','Purchased'], [100000,38000,21000,14200], AMBER);

//     /* Sales */
//     barChart(document.getElementById('chartHourly'), ['6a','8a','10a','12p','2p','4p','6p','8p','10p'],
//     [12,28,44,61,58,52,71,84,49], AMBER);
//     horizBar(document.getElementById('chartSalesFunnel'), ['Leads','Qualified','Proposal','Closed Won'], [4200,2600,1400,860], TEAL);

//     /* Marketing */
//     doughnut(document.getElementById('chartTraffic'), ['Organic','Paid','Referral','Direct','Email'], [36,27,14,15,8],
//     [TEAL,AMBER,'#6b7cff','#c47a1f','#3a4658']);
//     barChart(document.getElementById('chartCampaign'), ['Google Ads','Meta','Email','TikTok'], [5.2,3.8,7.4,2.9], TEAL);

//     /* Product */
//     new Chart(document.getElementById('chartABC'),{type:'bar',
//     data:{labels:['A — Top 20%','B — Mid 30%','C — Bottom 50%'],datasets:[{data:[68,24,8],backgroundColor:[AMBER,TEAL,MUTED],borderRadius:4}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:fmtAxis(),y:fmtAxis({title:{display:true,text:'% of revenue'}})}}});
//     horizBar(document.getElementById('chartCategoryPerf'), ['Electronics','Home','Apparel','Outdoor','Beauty'], [612,398,341,208,177], AMBER);

//     /* Inventory */
//     new Chart(document.getElementById('chartStockAge'),{type:'bar',
//     data:{labels:['0-30d','31-60d','61-90d','90d+'],datasets:[{data:[52,28,12,8],backgroundColor:[TEAL,AMBER,'#c47a1f',RED],borderRadius:4}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:fmtAxis(),y:fmtAxis({title:{display:true,text:'% of SKUs'}})}}});

//     /* Supply chain */
//     horizBar(document.getElementById('chartSupplier'), ['Delhivery Logistics','Blue Dart Express','Ecom Express','XpressBees'], [97,92,88,81], TEAL);

//     /* Finance */
//     new Chart(document.getElementById('chartCashFlow'),{type:'bar',
//     data:{labels:months12,datasets:[
//     {label:'Inflow',data:months12.map(()=>3+Math.random()*1.5),backgroundColor:TEAL,borderRadius:3},
//     {label:'Outflow',data:months12.map(()=>-(2+Math.random()*1.2)),backgroundColor:RED,borderRadius:3}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'#8A94A6',boxWidth:10}}},scales:{x:fmtAxis(),y:fmtAxis({title:{display:true,text:'₹ Cr'}})}}});

//     /* Forecast */
//     new Chart(document.getElementById('chartForecast'),{type:'line',
//     data:{labels:['-30','-20','-10','Now','+10','+20','+30','+60','+90'],
//     datasets:[
//     {label:'Actual',data:[3.2,3.4,3.7,3.92,null,null,null,null,null],borderColor:AMBER,backgroundColor:AMBER+'22',fill:true,tension:.3,pointRadius:0,borderWidth:2},
//     {label:'Forecast',data:[null,null,null,3.92,4.1,4.3,4.4,5.6,6.9],borderColor:TEAL,borderDash:[6,4],fill:false,tension:.3,pointRadius:0,borderWidth:2}
//     ]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'#8A94A6',boxWidth:10}}},scales:{x:fmtAxis(),y:fmtAxis({title:{display:true,text:'₹ Cr'}})}}});

//     /* Customer Segmentation */
//     new Chart(document.getElementById('chartSegment'),{type:'polarArea',
//     data:{labels:['VIP','Premium','Regular','Inactive','High Risk'],datasets:[{data:[4.2,13.8,48.6,28.1,5.3],
//     backgroundColor:[AMBER+'cc',TEAL+'cc','#6b7cffcc','#3a4658cc',RED+'cc']}]},
//     options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,color:'#8A94A6'}}},scales:{r:{grid:GRID,ticks:{display:false}}}}});

//     /* Explainable AI — feature contribution */
//     horizBar(document.getElementById('chartXAI'), ['Amount deviation','Location anomaly','New device','Payment history'], [95,78,64,52], AMBER);

//     /* Support */
//     horizBar(document.getElementById('chartComplaints'), ['Late Delivery','Item Damaged','Wrong Item','Refund Delay','Sizing Issue'], [214,168,132,101,84], RED);

//     /* Geo */
//     doughnut(document.getElementById('chartGeo'), ['Maharashtra','Karnataka','Delhi NCR','Tamil Nadu','Gujarat'], [34,28,21,11,6],
//     [AMBER,TEAL,'#6b7cff','#c47a1f','#3a4658']);

//     /* Operations */
//     lineChart(document.getElementById('chartOps'), months12, [2.9,2.8,2.7,2.6,2.8,2.5,2.4,2.3,2.2,2.2,2.15,2.1], TEAL, false);

//     /* ================= NEW FEATURES ================= */

//     /* -- helper: switch to a page by key (reused by nav, cards, command palette) -- */
//     function goToPage(key){
//         document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
//     const navEl = document.querySelector('.nav-item[data-page="'+key+'"]');
//     if(navEl) navEl.classList.add('active');
//   document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
//     const pg = document.getElementById('page-'+key);
//     if(pg) pg.classList.add('active');
//     if(titles[key]){
//         document.getElementById('pageTitle').textContent = titles[key][0];
//     document.getElementById('pageSub').textContent = titles[key][1];
//   }
//     window.scrollTo({top:0,behavior:'smooth'});
//     document.getElementById('sidebar')?.classList.remove('open');
//     document.getElementById('sidebarBackdrop')?.classList.remove('open');
// }
// document.querySelectorAll('.nav-item').forEach(item=>{
//         item.addEventListener('click', () => goToPage(item.dataset.page));
// });

//     /* -- loading skeleton -- */
//     const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// window.addEventListener('load',()=>{
//   const sk = document.getElementById('skeletonOverlay');
//     const delay = reduceMotion ? 0 : 900;
//   setTimeout(()=>{
//         sk.style.opacity = '0';
//     setTimeout(()=>sk.style.display='none', 350);
//   }, delay);
// });

// /* -- mobile hamburger -- */
// document.getElementById('hamburgerBtn')?.addEventListener('click',()=>{
//         document.querySelector('.sidebar').classList.toggle('open');
//     document.getElementById('sidebarBackdrop').classList.toggle('open');
// });
// document.getElementById('sidebarBackdrop')?.addEventListener('click',()=>{
//         document.querySelector('.sidebar').classList.remove('open');
//     document.getElementById('sidebarBackdrop').classList.remove('open');
// });
//     document.querySelector('.sidebar').id = 'sidebar';

//     /* -- dropdowns (bell / avatar) -- */
//     function toggleDropdown(btnId, ddId){
//         document.getElementById(btnId).addEventListener('click', (e) => {
//             e.stopPropagation();
//             const dd = document.getElementById(ddId);
//             const wasOpen = dd.classList.contains('open');
//             document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
//             if (!wasOpen) dd.classList.add('open');
//         });
// }
//     toggleDropdown('bellBtn','bellDropdown');
//     toggleDropdown('avatarBtn','avatarDropdown');
// document.addEventListener('click',()=>document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open')));

// /* -- filters panel toggle -- */
// document.getElementById('filterToggleBtn').addEventListener('click',()=>{
//         document.getElementById('filtersPanel').classList.toggle('open');
// });

// /* -- date filter: lightly re-scales KPI values for demo realism -- */
// document.getElementById('dateFilter').addEventListener('change', (e)=>{
//   const scaleMap = {'Last 7 Days':0.24,'Last 30 Days':1,'This Quarter':2.9,'YTD':11.2,'Custom Range':1};
//     const scale = scaleMap[e.target.value] ?? 1;
//   document.querySelectorAll('.kpi-value[data-base]').forEach(el=>{
//     const base = parseFloat(el.dataset.base);
//     const scaled = base*scale;
//     el.textContent = formatLikeOriginal(el.dataset.template, scaled);
//   });
// });
//     function formatLikeOriginal(tpl, n){
//   if(tpl.includes('₹') && tpl.includes('Cr')) return '₹'+n.toFixed(2)+' Cr';
//     if(tpl.includes('₹') && tpl.includes(' L')) return '₹'+n.toFixed(2)+' L';
//     if(tpl.includes('₹')) return '₹'+Math.round(n).toLocaleString('en-IN');
//     if(tpl.includes('%')) return n.toFixed(1)+'%';
//     return Math.round(n).toLocaleString('en-IN');
// }

// /* -- theme switch (cycles dark -> light) -- */
// document.getElementById('themeBtn').addEventListener('click',()=>{
//   const body = document.body;
//     const isLight = body.getAttribute('data-theme')==='light';
//     body.setAttribute('data-theme', isLight ? '' : 'light');
//     document.getElementById('themeBtn').textContent = isLight ? '🌙 Dark' : '☀️ Light';
// });

//     /* -- command palette -- */
//     const cmdkOverlay = document.getElementById('cmdkOverlay');
//     const cmdkInput = document.getElementById('cmdkInput');
//     const cmdkList = document.getElementById('cmdkList');
//     const pageKeys = Object.keys(titles);
//     function renderCmdk(filter=''){
//   const f = filter.toLowerCase();
//     cmdkList.innerHTML = pageKeys
//     .filter(k=>titles[k][0].toLowerCase().includes(f))
//     .map(k=>`<div class="cmdk-item" data-key="${k}"><span>${titles[k][0]}</span><span class="code">↵</span></div>`)
//     .join('') || '<div class="cmdk-item">No matches</div>';
//   cmdkList.querySelectorAll('.cmdk-item[data-key]').forEach(el=>{
//         el.addEventListener('click', () => { goToPage(el.dataset.key); closeCmdk(); });
//   });
// }
//     function openCmdk(){cmdkOverlay.classList.add('open'); cmdkInput.value=''; renderCmdk(); cmdkInput.focus(); }
//     function closeCmdk(){cmdkOverlay.classList.remove('open'); }
// document.addEventListener('keydown',(e)=>{
//   if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){e.preventDefault(); openCmdk(); }
//     if(e.key==='Escape'){closeCmdk(); document.getElementById('aiPanel').classList.remove('open'); }
// });
// cmdkInput?.addEventListener('input',()=>renderCmdk(cmdkInput.value));
// cmdkOverlay.addEventListener('click',(e)=>{ if(e.target===cmdkOverlay) closeCmdk(); });
//     document.getElementById('searchBox').addEventListener('click', openCmdk);

// /* -- CSV / PDF export -- */
// document.getElementById('exportCsvBtn')?.addEventListener('click',()=>{
//   const rows = [['Metric','Value (INR)'],['Revenue Today','184920'],['Revenue MTD','3920000'],
//     ['Profit Margin','24.3%'],['New Customers','2184'],['AOV','96.40'],['Forecast Accuracy','94.2%']];
//   const csv = rows.map(r=>r.join(',')).join('\n');
//     const blob = new Blob([csv],{type:'text/csv'});
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'manifest_kpi_export.csv';
//     a.click();
// });


// document.getElementById('exportPdfBtn')?.addEventListener('click',()=>window.print());

//     /* -- KPI cards: countup + sparkline + drill-down click -- */
//     function animateCount(el, targetNum, decimals, tpl){
//   const dur = reduceMotion ? 0 : 900;
//     const start = performance.now();
//     function frame(now){
//     const p = dur===0 ? 1 : Math.min(1,(now-start)/dur);
//     const eased = 1-Math.pow(1-p,3);
//     const val = targetNum*eased;
//     el.textContent = formatLikeOriginal(tpl, decimals ? val : Math.round(val));
//     if(p<1) requestAnimationFrame(frame);
//     else el.textContent = tpl; // restore exact original formatting at the end
//   }
//     requestAnimationFrame(frame);
// }
//     function buildSparkSVG(trend){
//   const pts = [];
//     let v = 50;
//     for(let i=0;i<14;i++){
//     if(trend==='up') v += (Math.random()*10-2);
//     else if(trend==='down') v -= (Math.random()*10-2);
//     else v += (Math.random()*6-3);
//     v = Math.max(8,Math.min(92,v));
//     pts.push(v);
//   }
//     const stepX = 100/(pts.length-1);
//   const path = pts.map((y,i)=>`${i * stepX},${100 - y}`).join(' ');
//     const color = trend==='up' ? '#4FD1C5' : trend==='down' ? '#E8555C' : '#8A94A6';
//     return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${path}" fill="none" stroke="${color}" stroke-width="4" vector-effect="non-scaling-stroke" /></svg>`;
// }
// document.querySelectorAll('.kpi').forEach(card=>{
//   const valEl = card.querySelector('.kpi-value');
//     if(valEl && !valEl.hasAttribute('data-nocount')){
//     const raw = valEl.textContent.trim();
//     const num = parseFloat(raw.replace(/[^0-9.\-]/g,''));
//     if(!isNaN(num)){
//         valEl.dataset.base = num;
//     valEl.dataset.template = raw;
//     animateCount(valEl, num, /\./.test(raw), raw);
//     }
//   }
//     const spark = card.querySelector('.spark-wrap');
//     if(spark) spark.innerHTML = buildSparkSVG(spark.dataset.spark);
//     if(card.dataset.nav){
//         card.addEventListener('click', () => goToPage(card.dataset.nav));
//   }
// });

//     /* -- AI Assistant -- */
//     const aiPanel = document.getElementById('aiPanel');
// document.getElementById('aiFab').addEventListener('click',()=>aiPanel.classList.add('open'));
// document.getElementById('aiClose').addEventListener('click',()=>aiPanel.classList.remove('open'));
//     const aiAnswers = {
//         "Why did revenue decrease?": "Revenue is actually up 14.2% week-over-week — but margin dipped 0.6 pts, driven by a higher mix of discounted Electronics orders and a rise in payment-gateway processing fees.",
//     "Predict next month revenue.": "The forecasting model projects ₹43 L next month (94.2% confidence), assuming current conversion and traffic trends hold. Festival seasonality could push this to +31% around Diwali.",
//     "Which warehouse needs attention?": "Mumbai — inventory is projected to run out in 5 days for top SKUs like Aria Wireless Earbuds. Recommend an expedited reorder today.",
//     "Generate weekly report.": "Weekly report ready: Revenue ₹39.2 L MTD (+11.2%), 2,184 new customers, CSAT 4.6/5, Mumbai inventory at risk, forecast accuracy holding at 94.2%. Full export available from Report Center."
// };
//     function aiAddMsg(text, who){
//   const div = document.createElement('div');
//     div.className = 'ai-msg '+who;
//     div.textContent = text;
//     document.getElementById('aiBody').appendChild(div);
//     div.scrollIntoView({behavior:'smooth'});
// }
//     function aiAsk(q){
//         aiAddMsg(q, 'user');
//     const ans = aiAnswers[q] || "Here's what the data shows right now: metrics are within normal range across most modules, with the exceptions flagged in the Alerts Center. Try asking about revenue, inventory, or forecasts.";
//   setTimeout(()=>aiAddMsg(ans,'bot'), reduceMotion?0:450);
// }
// document.querySelectorAll('.ai-quick button').forEach(b=>b.addEventListener('click',()=>aiAsk(b.dataset.q)));
// document.getElementById('aiSend').addEventListener('click',()=>{
//   const inp = document.getElementById('aiInput');
//     if(inp.value.trim()){aiAsk(inp.value.trim()); inp.value=''; }
// });
// document.getElementById('aiInput').addEventListener('keydown',(e)=>{
//   if(e.key==='Enter') document.getElementById('aiSend').click();
// });

