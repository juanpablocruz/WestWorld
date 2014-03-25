function BjoeGlobalState() {
    State.call(this);
}

BjoeGlobalState.prototype = new State();
BjoeGlobalState.prototype.constructor = BjoeGlobalState;

BjoeGlobalState.prototype.Enter = function(bjoe) {
    console.log(GetNameOfEntity(bjoe.ID()),":","Need more Ale!");
};
BjoeGlobalState.prototype.Execute = function(bjoe) {
    if ( Math.random() < 0.1 && Bob.Location() == location_type.saloon) {
        bjoe.GetFSM().ChangeState(fightingStance);
    }
}
BjoeGlobalState.prototype.Exit = function(bjoe) {}
BjoeGlobalState.prototype.OnMessage = function(bjoe,msg) {  return false;}

function FightingStance() {
    State.call(this);
}

FightingStance.prototype = new State();
FightingStance.prototype.constructor = FightingStance;

FightingStance.prototype.Enter = function(bjoe) {
    console.log(GetNameOfEntity(bjoe.ID()),":","Im gonna punch dat dragon in da face!");
    messageDispatcher.DispatchMessage(SEND_MSG_IMMEDIATELY, bjoe.ID(), names.ent_Miner_Bob,
                                      message_type.Msg_FightStart, NO_ADDITIONAL_INFO);
    bjoe.SetTaunted(true);
};

FightingStance.prototype.Execute = function(bjoe) {
    }
FightingStance.prototype.Exit = function(bjoe) {
        bjoe.SetHP(5);
}

FightingStance.prototype.OnMessage = function(bjoe,msg) {
    switch(msg.Msg) {
        case message_type.Msg_punchThrow: {
            bjoe.DecreaseHP(1);
            if ( bjoe.HP() <= 0) {
                bjoe.SetTaunted(false);
                messageDispatcher.DispatchMessage(SEND_MSG_IMMEDIATELY, bjoe.ID(), names.ent_Miner_Bob,
                                      message_type.Msg_FightEnd, NO_ADDITIONAL_INFO);
                console.log(GetNameOfEntity(bjoe.ID()),":","You win this time, ", names.ent_Miner_Bob);
                bjoe.GetFSM().ChangeState(bjoeGlobalState);
            }
            else {
                console.log(GetNameOfEntity(bjoe.ID()),":","You punch like an old woman!",bjoe.HP());
            }
        }
        return true;
    }
    return false;
}

var bjoeGlobalState = new BjoeGlobalState();
var fightingStance = new FightingStance();
