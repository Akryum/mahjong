package com.gamekit.text;

/**
 * ...
 * @author Guillaume CHAU
 */
class LatexParser
{
	static public var baseFontSize:Int = 14;
	
	static public var standardColors:Map<String, String>;
	
	static public function toHtml(latex:String):String 
	{
		var reg:EReg;
		
		// Return
		latex = StringTools.replace(latex, "\\n", "<br/>");
		
		// Size
		reg = ~/\\size\(([0-9]+)\)\{(.*)\}/i;
		reg.match(latex);
		latex = reg.map(latex, _replaceSize);
		
		// Color
		reg = ~/\\color\((#[0-9a-f]{6}|[a-z]+)\)\{(.*)\}/i;
		reg.match(latex);
		latex = reg.map(latex, _replaceColor);
		
		// Sub
		reg = ~/_\((#[0-9a-f]{6}|[a-z]+)\)\{(.*)\}/i;
		reg.match(latex);
		latex = reg.map(latex, _replaceSub);
		
		// Sup
		reg = ~/\^\((#[0-9a-f]{6}|[a-z]+)\)\{(.*)\}/i;
		reg.match(latex);
		latex = reg.map(latex, _replaceSup);
		
		
		return latex;
	}
	
	static private function _replaceSize(reg:EReg):String
	{
		return '<font size="' + Math.round(baseFontSize * Std.parseInt(reg.matched(1)) / 100) + '">' + reg.matched(2) + '</font>';
	}
	
	static private function _replaceColor(reg:EReg):String
	{
		var color:String = reg.matched(1).toLowerCase();
		
		if (standardColors != null && standardColors.exists(color))
		{
			color = standardColors.get(color);
		}
		else
		{
			var reg2:EReg = ~/#[0-9a-f]{6}/i;
			if (!reg2.match(color))
			{
				return reg.matched(2);
			}
		}
		
		return '<font color="' + color + '">' + reg.matched(2) + '</font>';
	}
	
	static private function _replaceSub(reg:EReg):String
	{
		return reg.matched(2);
	}
	
	static private function _replaceSup(reg:EReg):String
	{
		return reg.matched(2);
	}
	
}