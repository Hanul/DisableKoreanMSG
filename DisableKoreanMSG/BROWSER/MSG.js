/*
 * 게임 심의를 받지 않아 한국에서 게임을 서비스 하지 않을 때, 한국어를 제거
 */
OVERRIDE(MSG, (origin) => {
	
	global.MSG = METHOD((m) => {
		
		let msgData = {};
		let isKoreanDisabled = true;
		
		let addData = m.addData = (data) => {
			EXTEND({
				origin : msgData,
				extend : data
			});
		};
		
		let enableKorean = m.enableKorean = () => {
			isKoreanDisabled = false;
		};
		
		let checkIsDisableKorean = m.checkIsDisableKorean = () => {
			return isKoreanDisabled;
		};
		
		return {
			
			run : (keyOrMsgs) => {
				//REQUIRED: keyOrMsgs
				
				let key;
				let msgs;
				
				if (CHECK_IS_DATA(keyOrMsgs) !== true) {
					key = keyOrMsgs;
				} else {
					msgs = keyOrMsgs;
				}
				
				if (key !== undefined) {
					msgs = msgData[key];
				}
				
				let msg = msgs[isKoreanDisabled === true && INFO.getLang() === 'ko' ? 'en' : INFO.getLang()];
		
				if (msg === undefined) {
					
					let lang;
					let locale;
					
					if (INFO.getLang().length == 2) {
						lang = INFO.getLang().toLowerCase();
					} else {
						lang = INFO.getLang().substring(0, 2).toLowerCase();
						locale = INFO.getLang().substring(3).toLowerCase();
					}
					
					msg = msgs[isKoreanDisabled === true && lang === 'ko' ? 'en' : lang];
					
					if (msg !== undefined) {
						
						if (CHECK_IS_DATA(msg) === true) {
							if (msg[locale] !== undefined) {
								msg = msg[locale];
							} else {
								// get first msg.
								EACH(msg, (_msg) => {
									msg = _msg;
									return false;
								});
							}
						}
					}
				}
				
				if (msg === undefined) {
					
					// get first msg.
					EACH(msgs, (_msg) => {
						msg = _msg;
						return false;
					});
				}
				
				if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
					
					// get first msg.
					EACH(msg, (_msg) => {
						msg = _msg;
						return false;
					});
				}
		
				return msg;
			}
		};
	});
});
