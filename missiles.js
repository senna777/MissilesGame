function initCanvas(){
    var ctx = _('my_gamecanvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var enemies = [ {"id":"ship#1","x":100,"y":-20,"w":40,"h":20},
                    {"id":"ship#2","x":225,"y":-20,"w":40,"h":20},
                    {"id":"ship#3","x":350,"y":-20,"w":40,"h":20},
                    {"id":"ship#4","x":100,"y":-70,"w":40,"h":20},
                    {"id":"ship#5","x":225,"y":-70,"w":40,"h":20},
                    {"id":"ship#6","x":350,"y":-70,"w":40,"h":20},
                    {"id":"ship#7","x":350,"y":-120,"w":40,"h":20}
    ];
    function renderEnemies(){
        for(var i = 0; i < enemies.length; i++){
            ctx.fillStyle = "#984aba";
            ctx.fillRect(enemies[i].x, enemies[i].y+=.5, enemies[i].w, enemies[i].h);
        }
    }
    function Launcher(){
        this.y = 280, this.x = cW*.5-25, this.w = 50, this.h = 50, this.dir, this.bg="#25d55f", this.missiles = [];
        this.render = function(){
            if(this.dir == 'left'){
                this.x-=5;
            } else if(this.dir == 'right'){
                this.x+=5;
            }
            ctx.fillStyle = this.bg;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            for(var i=0; i < this.missiles.length; i++){
                var m = this.missiles[i];
                ctx.fillStyle = m.bg;
                ctx.fillRect(m.x, m.y-=5, m.w, m.h);
                this.hitDetect(this.missiles[i],i);
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.missiles.splice(i,1); // Splice that missile out of the missiles array
                }
            }
            if(enemies.length == 0){
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = '#25d55f';
                ctx.font = 'italic bold 36px sans-serif';
                ctx.fillText('Level Complete', cW*.5-130, 50, 300);
            }
        }
        this.hitDetect = function(m,mi){
            for(var i = 0; i < enemies.length; i++){
                var e = enemies[i];
                if(m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+e.h){
                    this.missiles.splice(this.missiles[mi],1); // Remove the missile
                    enemies.splice(i,1); // Remove the enemy that the missile hit
                    _('status').innerHTML = "You destroyed the <span class = 'highlight'>"+ e.id+"</span>";
                }
            }
        }
    }
    var launcher = new Launcher();
    function animate(){
        //ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies();
        //ctx.restore();
    }
    var animateInterval = setInterval(animate, 30);
    var left_btn = _('left_btn');
    var right_btn = _('right_btn');
    var fire_btn = _('fire_btn');
    left_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'left';
    });
    left_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    right_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'right';
    });
    right_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.missiles.push({"x":launcher.x+launcher.w*.5,"y":launcher.y,"w":3,"h":10,"bg":"#25d55f"});
    });
	}

	function missleGame() {
		p1.style = "display:none";
		_('my_gamecanvas').style = "display:inline-block";
		_('my_gamebtns').style = "display:inline-block";
		initCanvas();
	}
