var area = require('./../area/area');
var api = require('../../util/dataApi');
var consts = require('../../consts/consts');
var messageService = require('./../messageService');

var exp = module.exports;

/**
 * Handler npc event
 */
exp.addEventForNPC = function (npc){
	/**
	 * Hanlde npc talk event
	 */
	npc.on('onNPCTalk', function(data){
		var npc = area.getEntity(data.npc);
		var player = area.getEntity(data.player);
		var talk = api.talk;
		var npcTalks = talk.findBy('npc', npc.kindId);
		var npcword = 'Welcome to see you!';
		var myword = 'Me too!';

		if(!!npcTalks && npcTalks.length > 0){
			npcword = npcTalks[0].npcword;
			myword = npcTalks[0].myword;
		}

		var msg = {
			npc : data.npc,
			npcword : npcword,
			myword: myword,
			player : data.player,
			kindId : npc.kindId
		};

		if (npc.kindType === consts.NpcType.TRAVERSE_NPC) {
			npc.traverse('onNPCTalk', msg);
			return;
		}

		messageService.pushMessageToPlayer({uid:player.userId, sid: player.serverId}, 'onNPCTalk', msg);
	});
};
