package com.mahjong.view;

import com.gamekit.display.BitmapLoader;
import com.gamekit.mvc.view.View;
import com.mahjong.model.TileModel;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.LineScaleMode;
import flash.display.Shape;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;

/**
 * ...
 * @author Guillaume CHAU
 */
class TileView extends View
{
	// Model
	private var _tileModel:TileModel;
	
	// Display
	private var _background:Shape;
	private var _label:TextField;
	private var _image:Bitmap;
	
	// Loading
	private var _imageLoader:BitmapLoader;

	public function new() 
	{
		super();
		
		_background = new Shape();
		#if cpp
		_background.cacheAsBitmap = true;
		#end
		addChild(_background);
		
		_label = new TextField();
		_label.selectable = false;
		_label.mouseEnabled = false;
		_label.autoSize = TextFieldAutoSize.LEFT;
		_label.embedFonts = true;
		addChild(_label);
		
		var format:TextFormat = new TextFormat("Aller", 12, 0x000000);
		_label.defaultTextFormat = format;
		
		_image = new Bitmap();
		addChild(_image);
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		if (_imageLoader != null)
		{
			_imageLoader.destroy();
		}
		
		_background = null;
		_label = null;
		_image = null;
		_imageLoader = null;
	}
	
	/* PRIVATE */
	
	override private function _applyModel():Void 
	{
		super._applyModel();
		
		_tileModel = cast _model;
		
		if (_tileModel != null)
		{
			
			if (_tileModel.type == "text")
			{
				_label.visible = true;
				#if html5
				var reg:EReg = ~/<[a-z]+ ([a-z]+=".*")*>/gi;
				var t = reg.replace(_tileModel.value, "");
				reg = ~/<\/[a-z]+>/gi;
				t = reg.replace(t, "");
				_label.text = t;
				_label.width = _label.textWidth;
				#else
				_label.htmlText = _tileModel.value;
				#end
				
				_image.visible = false;
			}
			else if (_tileModel.type == "image")
			{
				_label.visible = false;
				
				_image.visible = true;
				
				if (_imageLoader != null)
				{
					_imageLoader.destroy();
				}
				
				// Load the image
				_imageLoader = new BitmapLoader(_tileModel.value, _showImage);
			}
			
			_resize();
		}
	}
	
	override private function _resize():Void 
	{
		super._resize();
		
		// Background
		_drawBackground();
		
		if (_tileModel == null)
		{
			return;
		}
		
		// Text label
		if (_tileModel.rotated)
		{
			_label.rotation = 45;
		}
		else
		{
			_label.rotation = 0;
		}
		_label.x = (_sizeWidth - _label.width) * 0.5;
		_label.y = (_sizeHeight - _label.height) * 0.5;
		
		// Image
		_updateImagePosition();
	}
	
	private function _drawBackground():Void
	{
		_background.graphics.clear();
		
		var roundDiameter:Float = 20;
		var depth:Float = 5;
		var depthAngle:Float = Math.PI / 4; // 45°
		
		// Back Style
		_background.graphics.lineStyle(1, 0, 1, true, LineScaleMode.NONE);
		_background.graphics.beginFill(0xaaaaaa, 1);
		
		// Back drawing
		_background.graphics.drawRoundRect(Math.cos(depthAngle) * depth, Math.sin(depthAngle) * depth, _sizeWidth, _sizeHeight, roundDiameter, roundDiameter);
		
		// Front Style
		_background.graphics.lineStyle(1, 0, 1, true, LineScaleMode.NONE);
		_background.graphics.beginFill(0xffffff, 1);
		
		// Front drawing
		_background.graphics.drawRoundRect(0, 0, _sizeWidth, _sizeHeight, roundDiameter, roundDiameter);
	}
	
	private function _showImage(data:BitmapData):Void
	{
		_image.bitmapData = data;
		
		_updateImagePosition();
	}
	
	private function _updateImagePosition():Void
	{
		_image.x = (_sizeWidth - _image.width) * 0.5;
		_image.y = (_sizeHeight - _image.height) * 0.5;
	}
	
	/* GETTERS */
	
	function get_tileModel():TileModel 
	{
		return _tileModel;
	}
	
	public var tileModel(get_tileModel, null):TileModel;
}