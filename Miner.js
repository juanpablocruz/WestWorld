var ComfortLevel = 5;
var MaxNuggets = 3;
var ThirstLevel = 5;
var TirednessThreshold = 5;

function Miner (id) {
    this.m_Location = location_type.shack;
    this.m_iGoldCarried = 0;
    this.m_iMoneyInBank = 0;
    this.m_iThirst = 0;
    this.m_iFatigue = 0;
    this.m_pStateMachine = new StateMachine(this);
    this.m_pStateMachine.SetCurrentState(goHomeAndSleepTilRested);
    this.m_iTimeDrinking = 0;
    this.m_bDriking = false;
    
    BaseGameEntity.call(this,id);
    
}

Miner.prototype = Object.create(BaseGameEntity.prototype);


Miner.prototype.GetFSM = function(){ return this.m_pStateMachine;}

Miner.prototype.Location = function(){ return this.m_Location;}
Miner.prototype.ChangeLocation = function(loc){ this.m_Location = loc;}
Miner.prototype.GoldCarried = function(){ return this.m_iGoldCarried;}
Miner.prototype.SetGoldCarried = function(val){ this.m_iGoldCarried = val;}

Miner.prototype.AddToGoldCarried = function(val){ 
    this.m_iGoldCarried += val; 
    if (this.m_iGoldCarried < 0) this.m_iGoldCarried = 0;
};
Miner.prototype.PocketsFull = function(){ return this.m_iGoldCarried >= MaxNuggets;}

Miner.prototype.Fatigued = function(){ if(this.m_iFatigue > TirednessThreshold) return true; return false;}

Miner.prototype.DecreaseFatigue = function(){ this.m_iFatigue--;}
Miner.prototype.IncreaseFatigue = function(){ this.m_iFatigue++;}

Miner.prototype.Wealth = function(){ return this.m_iMoneyInBank;}
Miner.prototype.AddToWealth = function(val){ 
    this.m_iMoneyInBank += val; 
    if (this.m_iMoneyInBank < 0) this.m_iMoneyInBank = 0;
};
Miner.prototype.SetWealth = function(val){ console.log(this.m_iMoneyInBank);this.m_iMoneyInBank = val;}
Miner.prototype.Thirsty = function(){ if ( this.m_iThirst >= ThirstLevel) return true; return false;}
Miner.prototype.BuyAndDrinkWhiskey = function(){
    this.m_iMoneyInBank = this.m_iMoneyInBank-2;
    this.m_iTimeDrinking = 0;
    this.m_bDriking = true;
}
Miner.prototype.DrinkWhiskey = function(){ if(this.m_iTimeDrinking){this.m_iThirst = 0;this.m_bDriking=false;}else{this.m_iTimeDrinking++}}
Miner.prototype.Drinking = function() { return this.m_bDriking;}

Miner.prototype.update = function(){ 
    this.m_iThirst++;
    this.m_pStateMachine.update();
}

Miner.prototype.HandleMessage = function(msg) {
    return this.m_pStateMachine.HandleMessage(msg);
}
