var SEND_MSG_IMMEDIATELY = 0.0;
var NO_ADDITIONAL_INFO = 0;

var setItem = function(obj,prev,next) {
    this.data = obj;
    this.next = next;
    this.prev = prev;
}
var set = function() {
    this.first = null;
    this.current = null;
    this.last = null;
}

set.prototype.begin = function() {
    return this.first;
}

set.prototype.insert = function(obj) {
    if ( this.first == null) {
        this.first = this.current = this.last = new setItem(obj,null,null);
    } else {
        var tmp = new setItem(obj,this.last,null);
        this.last.next = tmp;
        this.last = tmp;
    }
}

set.prototype.erase = function(obj) {
    var it = this.first;
    while(it.next != null) {
        if(it.data == obj) {
            it.next.prev = it.prev;
            it.prev.next = it.next;
        }
    }
}

set.prototype.empty = function() {
    if(this.first == null) return true;
    else return false;
}

var message_type = {
    Msg_HiHoneyImHome : 1,
    Msg_StewReady : 2,
}
    
function MsgToStr(msg) {
    switch (msg)
      {
      case Msg_HiHoneyImHome:

        return "HiHoneyImHome"; 

      case Msg_StewReady:

        return "StewReady";

      default:

        return "Not recognized!";
      }
}

MessageDispatcher = function() {
    this.PriorityQ = new set();
}

MessageDispatcher.prototype.Discharge = function (pReceiver, telegram){
    if (!pReceiver.HandleMessage(telegram)) {
        console.log("Message not handled");
    }
}

MessageDispatcher.prototype.DispatchMessage = function (delay, 
                                                        sender,
                                                        receiver,
                                                        msg,
                                                        ExtraInfo){
    var pSender = null;
    var pReceiver = null;
    pSender = entityManager.GetEntityFromId(sender);
    pReceiver = entityManager.GetEntityFromId(receiver);
    
    if(pReceiver == null) {
        console.log("Warning! No Receiver with ID of ", receiver, " found");
        return;
    }
    
    var telegram = new Telegram(0,sender,receiver,msg,ExtraInfo);
    
    if ( delay <= 0.0) {
        this.Discharge(pReceiver,telegram);
    }
    else {
        var d = new Date();
        var CurrentTime = d.getTime();
        
        telegram.DispatchTime = CurrentTime + delay;
        this.PriorityQ.insert(telegram);
        
    }
}
MessageDispatcher.prototype.DispatchDelayedMessage = function(){
    var d = new Date();
    var CurrentTime = d.getTime();
    while ( !this.PriorityQ.empty() &&
           (this.PriorityQ.begin().DispatchTime < CurrentTime) &&
           (this.PriorityQ.begin().DispatchTime > 0) ) {
        var telegram = this.PriorityQ.begin();
        var pReceiver = entityManager.GetEntityFromId(telegram.Receiver);
        this.Discharge(pReceiver,telegram);
        this.PriorityQ.erase(this.PriorityQ.begin());
    }
}

var messageDispatcher = new MessageDispatcher();