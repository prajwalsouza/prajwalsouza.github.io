const status=document.getElementById('status');
import('./app.mjs').catch(error=>{status.textContent='Could not start: '+error.message;status.title=status.textContent;status.style.color='#b24734';console.error(error)});
