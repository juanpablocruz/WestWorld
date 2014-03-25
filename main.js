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

var Bob = new Miner(names.ent_Miner_Bob);
var Elsa = new MinersWife(names.ent_Elsa);
var BigJoe = new Bjoe(names.ent_Big_Joe);

entityManager.RegisterEntity(Bob);
entityManager.RegisterEntity(Elsa);
entityManager.RegisterEntity(BigJoe);

for(var i = 0; i < 50; ++i) {
    BigJoe.update();
    Bob.update();
    Elsa.update();
    
    messageDispatcher.DispatchDelayedMessage();
    sleep(800);
}
