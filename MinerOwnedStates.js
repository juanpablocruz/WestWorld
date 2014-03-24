function EnterMineAndDigForNugget() {
    State.call(this);
}

EnterMineAndDigForNugget.prototype = new State();
EnterMineAndDigForNugget.prototype.constructor = EnterMineAndDigForNugget;

EnterMineAndDigForNugget.prototype.Instance = function(){
    return this;
}
EnterMineAndDigForNugget.prototype.Enter = function(pMiner){
    if ( pMiner.Location() != location_type.goldmine ) {
        console.log(GetNameOfEntity(pMiner.ID()),":","Walkin' to the goldmine");
    }
}
EnterMineAndDigForNugget.prototype.Execute = function(pMiner){
    pMiner.AddToGoldCarried(1);
    pMiner.IncreaseFatigue();
    
    console.log(GetNameOfEntity(pMiner.ID()), ": ", "Pickin' up a nugget");
    if(pMiner.PocketsFull()) {
        pMiner.GetFSM().ChangeState(visitBankAndDepositGold);
    }
    
    if (pMiner.Thirsty()) {
        pMiner.GetFSM().ChangeState(quenchThirst);
    }
}

EnterMineAndDigForNugget.prototype.Exit = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ","Ah'm leavin' the goldmine with mah pockets full o' sweet gold");
}


function VisitBankAndDepositGold() {
    State.call(this);
}

VisitBankAndDepositGold.prototype = new State();
VisitBankAndDepositGold.prototype.constructor = VisitBankAndDepositGold;

VisitBankAndDepositGold.prototype.Instance = function(){ return this;}

VisitBankAndDepositGold.prototype.Enter = function(pMiner){
    if(pMiner.Location() != location_type.bank) {
        console.log(GetNameOfEntity(pMiner.ID()),": ", "Goin' to the bank. Yes siree");
        pMiner.ChangeLocation(location_type.bank);
    }
}
VisitBankAndDepositGold.prototype.Execute = function(pMiner){
    pMiner.AddToWealth(pMiner.GoldCarried());
    pMiner.SetGoldCarried(0);
    
    console.log(GetNameOfEntity(pMiner.ID()), ": ", "Depositing gold. Total savings now:",pMiner.Wealth());
    
    if (pMiner.Wealth() >= ComfortLevel) {
        console.log(GetNameOfEntity(pMiner.ID()), ": ", "WooHoo! Rich enough for now. Back home to mah li'lle lady");
        pMiner.GetFSM().ChangeState(goHomeAndSleepTilRested);   
    } else {
        pMiner.GetFSM().ChangeState(enterMineAndDigForNugget);
    }
}
VisitBankAndDepositGold.prototype.Exit = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()), ": ", "Leavin' the bank");
}

function GoHomeAndSleepTilRested() {
    State.call(this);
}

GoHomeAndSleepTilRested.prototype = new State();
GoHomeAndSleepTilRested.prototype.constructor = GoHomeAndSleepTilRested;

GoHomeAndSleepTilRested.prototype.Instance = function(){
    return this;
}
GoHomeAndSleepTilRested.prototype.Enter = function(pMiner){
    if(pMiner.Location() != location_type.shack) {
        console.log(GetNameOfEntity(pMiner.ID()),": ", "Walkin' home");
        pMiner.ChangeLocation(location_type.shack);

        messageDispatcher.DispatchMessage(SEND_MSG_IMMEDIATELY,
                                          pMiner.ID(),
                                          names.ent_Elsa,
                                          message_type.Msg_HiHoneyImHome,
                                          NO_ADDITIONAL_INFO);
    }
}
GoHomeAndSleepTilRested.prototype.Execute = function(pMiner){
    if(!pMiner.Fatigued()) {
        console.log(GetNameOfEntity(pMiner.ID()),": ", "What a God darn fantastic nap! Time to find more gold");
        pMiner.GetFSM().ChangeState(enterMineAndDigForNugget);
    } else {
        pMiner.DecreaseFatigue();
        console.log(GetNameOfEntity(pMiner.ID()),": ", "ZZZZ...");
    }
}
GoHomeAndSleepTilRested.prototype.Exit = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ", "Leaving the house");
}
GoHomeAndSleepTilRested.prototype.OnMessage = function(pMiner,msg){
    switch(msg.Msg) {
        case message_type.Msg_StewReady:
            console.log(GetNameOfEntity(pMiner.ID()),": ", "Okay Hun, ahm a comin'!");
            pMiner.GetFSM().ChangeState(eatStew);
            return true;
    }
    return false;
    
}

function QuenchThirst() {
    
}

QuenchThirst.prototype = new State();
QuenchThirst.prototype.constructor = QuenchThirst;

QuenchThirst.prototype.Instance = function(){ return this;}
QuenchThirst.prototype.Enter = function(pMiner){
    if(pMiner.Location() != location_type.saloon) {
        console.log(GetNameOfEntity(pMiner.ID()),": ", "Boy, ah sure is thusty! Walking to the saloon");
        pMiner.ChangeLocation(location_type.saloon);
    }
}
QuenchThirst.prototype.Execute = function(pMiner){
    if(pMiner.Thirsty()) {
        pMiner.BuyAndDrinkWhiskey();
        console.log(GetNameOfEntity(pMiner.ID()),": ", "That's mighty fine sippin' liquer");
        pMiner.GetFSM().ChangeState(enterMineAndDigForNugget);
    } else {
        console.log("ERROR!");
    }
}
QuenchThirst.prototype.Exit = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ", "Leaving the saloon, feelin' good");
}

function EatStew() {
    
}

EatStew.prototype = new State();
EatStew.prototype.constructor = EatStew;

EatStew.prototype.Instance = function(){ return this;}
EatStew.prototype.Enter = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ", "Smells Reaaal goood Elsa!");
}
EatStew.prototype.Execute = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ", "Tastes real good too!");
    pMiner.GetFSM().RevertToPreviousState();
}
EatStew.prototype.Exit = function(pMiner){
    console.log(GetNameOfEntity(pMiner.ID()),": ", "Thankya li'lle lady. Ah better get back to whatever ah wuz doin'");
}

EatStew.prototype.OnMessage = function(agent, msg){
    return false;
}

var enterMineAndDigForNugget = new EnterMineAndDigForNugget();
var visitBankAndDepositGold = new VisitBankAndDepositGold();
var goHomeAndSleepTilRested = new GoHomeAndSleepTilRested();
var quenchThirst = new QuenchThirst();
var eatStew = new EatStew();
