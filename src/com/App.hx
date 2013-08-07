package com;

import com.gamekit.text.LatexParser;
import com.mahjong.Mahjong;
import flash.display.Sprite;
import flash.text.Font;


@:font("Aller_Rg.ttf") class DefaultFont extends Font { }

/**
 * ...
 * @author Guillaume CHAU
 */
class App extends Sprite
{

	public function new() 
	{
		super();
		
		// Fonts
		Font.registerFont(DefaultFont);
		
		// Latex colors
		LatexParser.standardColors = new Map();
		LatexParser.standardColors.set("apricot", "#fbb982");
		LatexParser.standardColors.set("aquamarine", "#fbb982");
		LatexParser.standardColors.set("bittersweet", "#c04f16");
		LatexParser.standardColors.set("black", "#000000");
		LatexParser.standardColors.set("blue", "#2c2f92");
		LatexParser.standardColors.set("bluegreen", "#00b3b8");
		LatexParser.standardColors.set("blueviolet", "#463892");
		LatexParser.standardColors.set("brickred", "#b6311b");
		LatexParser.standardColors.set("brown", "#792400");
		LatexParser.standardColors.set("burntorange", "#f7921d");
		LatexParser.standardColors.set("cadetblue", "#74729a");
		LatexParser.standardColors.set("carnationpink", "#f282b3");
		LatexParser.standardColors.set("cerulean", "#00a1e3");
		LatexParser.standardColors.set("cornflowerblue", "#40b0e4");
		LatexParser.standardColors.set("cyan", "#00adef");
		LatexParser.standardColors.set("dandelion", "#fdbb41");
		LatexParser.standardColors.set("darkorchid", "#a4528a");
		LatexParser.standardColors.set("emerald", "#00a99d");
		LatexParser.standardColors.set("forestgreen", "#009b55");
		LatexParser.standardColors.set("fuchsia", "#8c358c");
		LatexParser.standardColors.set("goldenrod", "#ffde41");
		LatexParser.standardColors.set("gray", "#949698");
		LatexParser.standardColors.set("green", "#00a64e");
		LatexParser.standardColors.set("greenyellow", "#dfe674");
		LatexParser.standardColors.set("junlegreen", "#00a99a");
		LatexParser.standardColors.set("lavender", "#f49ec4");
		LatexParser.standardColors.set("limegreen", "#8dc73d");
		LatexParser.standardColors.set("magenta", "#ec008c");
		LatexParser.standardColors.set("mahogany", "#a9341e");
		LatexParser.standardColors.set("maroon", "#af3135");
		LatexParser.standardColors.set("melon", "#f89d7a");
		LatexParser.standardColors.set("midnightblue", "#006695");
		LatexParser.standardColors.set("mulberry", "#a93b92");
		LatexParser.standardColors.set("navyblue", "#006eb8");
		LatexParser.standardColors.set("olivegreen", "#3c8030");
		LatexParser.standardColors.set("orange", "#f58137");
		LatexParser.standardColors.set("orangered", "#ed135a");
		LatexParser.standardColors.set("orchid", "#af72b0");
		LatexParser.standardColors.set("peach", "#f79659");
		LatexParser.standardColors.set("periwinkle", "#7976b8");
		LatexParser.standardColors.set("pinegreen", "#008b72");
		LatexParser.standardColors.set("plum", "#92258e");
		LatexParser.standardColors.set("processblue", "#00b0f0");
		LatexParser.standardColors.set("purple", "#99479b");
		LatexParser.standardColors.set("rawsienna", "#974005");
		LatexParser.standardColors.set("red", "#ed1b22");
		LatexParser.standardColors.set("redorange", "#f26034");
		LatexParser.standardColors.set("redviolet", "#a1236a");
		LatexParser.standardColors.set("rhodamine", "#ef559f");
		LatexParser.standardColors.set("royalblue", "#0070bc");
		LatexParser.standardColors.set("royalpurple", "#603e99");
		LatexParser.standardColors.set("rubinered", "#ed007c");
		LatexParser.standardColors.set("salmon", "#f69188");
		LatexParser.standardColors.set("seagreen", "#3ebc9c");
		LatexParser.standardColors.set("sepia", "#671700");
		LatexParser.standardColors.set("skyblue", "#45c5dd");
		LatexParser.standardColors.set("springgreen", "#c6dc66");
		LatexParser.standardColors.set("tan", "#da9d76");
		LatexParser.standardColors.set("tealblue", "#00aeb3");
		LatexParser.standardColors.set("thistle", "#d882b6");
		LatexParser.standardColors.set("turquoise", "#00b4ce");
		LatexParser.standardColors.set("violet", "#57419b");
		LatexParser.standardColors.set("violetred", "#ef57a0");
		LatexParser.standardColors.set("white", "#ffffff");
		LatexParser.standardColors.set("wildstrawberry", "#ee2866");
		LatexParser.standardColors.set("yellow", "#fff200");
		LatexParser.standardColors.set("yellowgreen", "#98cc70");
		LatexParser.standardColors.set("yelloworange", "#faa21a");
		
		var mahjong:Mahjong = new Mahjong();
		addChild(mahjong);
	}
	
}