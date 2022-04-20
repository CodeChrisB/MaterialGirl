
Window_SavefileList.prototype.drawGameTime = function(info, x, y, width) {
	if(info.gameTimeDay){
		var lineHeight = this.lineHeight();
		
		if(!info.gameTimeWeek) info.gameTimeWeek = 0;
		
		var day_text = ""
		this.drawText(day_text, x, y, width);
		this.drawText(info.gameTimeMin, x, y + lineHeight, width);
	}
};