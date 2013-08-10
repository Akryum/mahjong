package com.mahjong.view;

import com.gamekit.display.BitmapLoader;
import com.gamekit.mvc.view.View;
import com.mahjong.model.TileModel;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.BlendMode;
import flash.display.LineScaleMode;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.filters.DropShadowFilter;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;
import flash.text.TextFormatAlign;
import motion.Actuate;

/**
 * ...
 * @author Guillaume CHAU
 */
class TileView extends View
{
	// Config
	static public var roundDiameter:Float = 16;
	static public var depth:Float = 5;
	static public var defaultSizeWidth:Float = 48;
	static public var defaultSizeHeight:Float = 72;
	
	
	// Model
	private var _tileModel:TileModel;
	
	// Properties
	private var _enableFX:Bool = false;
	
	// Display
	private var _background:Shape;
	private var _labelContainer:Sprite;
	private var _label:TextField;
	private var _image:Bitmap;
	
	// Loading
	private var _imageLoader:BitmapLoader;
	
	// Display depth correction
	private var _displayDepth:Float;

	public function new() 
	{
		super();
		
		buttonMode = true;
		
		_background = new Shape();
		addChild(_background);
		
		_labelContainer = new Sprite();
		addChild(_labelContainer);
		
		_label = new TextField();
		_label.selectable = false;
		_label.mouseEnabled = false;
		_label.autoSize = TextFieldAutoSize.LEFT;
		_label.multiline = true;
		_label.embedFonts = true;
		_labelContainer.addChild(_label);
		
		var format:TextFormat = new TextFormat("Aller", 12, 0x000000, false, false, false, null, null, TextFormatAlign.CENTER);
		_label.defaultTextFormat = format;
		
		_image = new Bitmap();
		addChild(_image);
		
		_updateFX();
		
		addEventListener(MouseEvent.ROLL_OVER, _onMouseOver);
		addEventListener(MouseEvent.ROLL_OUT, _onMouseOut);
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		removeEventListener(MouseEvent.ROLL_OVER, _onMouseOver);
		removeEventListener(MouseEvent.ROLL_OUT, _onMouseOut);
		
		if (_imageLoader != null)
		{
			_imageLoader.destroy();
		}
		
		_background = null;
		_label = null;
		_image = null;
		_imageLoader = null;
		_tileModel = null;
		_labelContainer = null;
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
			_labelContainer.rotation = 90;
		}
		else
		{
			_labelContainer.rotation = 0;
		}
		_label.x = - _label.width * 0.5;
		_label.y = - _label.height * 0.5;
		_labelContainer.x = _sizeWidth * 0.5;
		_labelContainer.y = _sizeHeight * 0.5;
		
		// Image
		_updateImagePosition();
	}
	
	private function _drawBackground():Void
	{
		_background.graphics.clear();
		
		// Back Style
		_background.graphics.lineStyle(1, 0, 1, true, LineScaleMode.NONE);
		_background.graphics.beginFill(0xaaaaaa, 1);
		
		// Back drawing
		_background.graphics.drawRoundRect(depth, depth, _sizeWidth, _sizeHeight, roundDiameter, roundDiameter);
		
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
	
	private function _updateFX():Void
	{
		#if !html5
		if (_enableFX)
		{
			// Main Shadow
			_background.filters = [new DropShadowFilter(4, 45, 0, 0.3, 8, 8, 1, 1)];
		}
		else
		{
			// Main Shadow
			_background.filters = [];
		}
		#end
	}
	
	/* EVENTS */
	
	private function _onMouseOver(e:MouseEvent):Void
	{
		Actuate.stop(_label);
		Actuate.tween(_label, 0.3, { alpha:0.7 } );
	}
	
	private function _onMouseOut(e:MouseEvent):Void
	{
		Actuate.stop(_label);
		Actuate.tween(_label, 0.3, { alpha:1 } );
	}
	
	/* GETTERS */
	
	function get_tileModel():TileModel 
	{
		return _tileModel;
	}
	
	public var tileModel(get_tileModel, null):TileModel;
	
	function get_displayDepth():Float 
	{
		return _displayDepth;
	}
	
	function set_displayDepth(value:Float):Float 
	{
		return _displayDepth = value;
	}
	
	/**
	 * Display depth correction number.
	 */
	public var displayDepth(get_displayDepth, set_displayDepth):Float;
	
	function get_enableFX():Bool 
	{
		return _enableFX;
	}
	
	function set_enableFX(value:Bool):Bool 
	{
		_enableFX = value;
		
		_updateFX();
		
		return _enableFX;
	}
	
	/**
	 * Indicates if special effects (like shadows) are activated or not.
	 */
	public var enableFX(get_enableFX, set_enableFX):Bool;
}