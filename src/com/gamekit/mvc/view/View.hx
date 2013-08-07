package com.gamekit.mvc.view;

import com.gamekit.core.IDestroyable;
import com.gamekit.mvc.model.Model;
import flash.display.Sprite;
import flash.events.Event;

/**
 * ...
 * @author Guillaume CHAU
 */
class View extends Sprite implements IDestroyable
{
	private var _model:Model;
	
	private var _sizeWidth:Float;
	private var _sizeHeight:Float;

	public function new() 
	{
		super();
		
	}
	
	/* INTERFACE com.gamekit.core.IDestroyable */
	
	public function destroy():Void 
	{
		// Display tree
		if (parent != null)
		{
			parent.removeChild(this);
		}
		while (numChildren > 0)
		{
			removeChildAt(0);
		}
		
		// Model
		_dismissModel();
		
		// References
		_model = null;
	}
	
	/**
	 * Change the virtual size of the view (one update).
	 * @param	width
	 * @param	height
	 */
	public function setSize(width:Float, height:Float):Void
	{
		_sizeWidth = width;
		_sizeHeight = height;
		
		_resize();
	}
	
	/* PRIVATE */
	
	/**
	 * Called when the size of the view needs to be updated.
	 */
	private function _resize():Void
	{
		
	}
	
	/**
	 * Remove display related to the model.
	 */
	private function _clear():Void
	{
		
	}
	
	/**
	 * When the model is updated, applies the necessary changes.
	 */
	private function _applyModel():Void
	{
		
	}
	
	/**
	 * Remove listeners and references to the current model if any.
	 */
	public function _dismissModel():Void
	{
		if (_model != null)
		{
			_model.removeEventListener(Event.CHANGE, _onModelChange);
		}
		
		_model = null;
	}
	
	/* EVENTS */
	
	private function _onModelChange(e:Event):Void
	{
		_applyModel();
	}
	
	/* GETTERS */
	
	function get_model():Model 
	{
		return _model;
	}
	
	function set_model(value:Model):Model 
	{
		if (_model != value)
		{
			_dismissModel();
			
			_model = value;
			
			if (_model != null)
			{
				// New model
				_model.addEventListener(Event.CHANGE, _onModelChange);
				
				_applyModel();
			}
			else
			{
				_clear();
			}
		}
		
		return _model;
	}
	
	/**
	 * Model providing data to the view.
	 */
	public var model(get_model, set_model):Model;
	
	function get_sizeWidth():Float 
	{
		return _sizeWidth;
	}
	
	function set_sizeWidth(value:Float):Float 
	{
		_sizeWidth = value;
		
		_resize();
		
		return _sizeWidth;
	}
	
	/**
	 * Virtual size width.
	 */
	public var sizeWidth(get_sizeWidth, set_sizeWidth):Float;
	
	function get_sizeHeight():Float 
	{
		return _sizeHeight;
	}
	
	function set_sizeHeight(value:Float):Float 
	{
		_sizeHeight = value;
		
		_resize();
		
		return _sizeHeight;
	}
	
	/**
	 * Virtual size height.
	 */
	public var sizeHeight(get_sizeHeight, set_sizeHeight):Float;
	
}