package com.mahjong;

import com.mahjong.model.TileModel;
import com.mahjong.view.TileView;
import flash.display.Sprite;
import tjson.TJSON;

/**
 * ...
 * @author Guillaume CHAU
 */
class Mahjong extends Sprite
{
	private var _tileModels:Array<TileModel>;
	private var _tileViews:Array<TileView>;

	public function new() 
	{
		super();
		
		_tileModels = new Array();
		_tileViews = new Array();
		
		
		
		// TESTS
		var tileData:String = '{
            "name": "H_s",
            "type": "text",
            "value": "\\\\size(150){\\\\color(blue){H}}",
            "context": "s",
            "information": "Son numéro atomique est le 1."
        }';
		var tileModel:TileModel = new TileModel();
		tileModel.parseJson(TJSON.parse(tileData));
		
		var tileView:TileView = new TileView();
		tileView.setSize(48, 72);
		tileView.model = tileModel;
		tileView.x = 100;
		tileView.y = 100;
		addChild(tileView);
		
	}
	
}