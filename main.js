/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 2000);
          };
})();


$(function() {

    var Bob = new Miner(names.ent_Miner_Bob);
    var Elsa = new MinersWife(names.ent_Elsa);
    var BigJoe = new Bjoe(names.ent_Big_Joe);

    entityManager.RegisterEntity(Bob);
    entityManager.RegisterEntity(Elsa);
    entityManager.RegisterEntity(BigJoe);

    
    (function animloop(){
        BigJoe.update();
        Bob.update();
        Elsa.update();

        messageDispatcher.DispatchDelayedMessage();
        sleep(800);
        requestAnimFrame(animloop);
    })();
});
