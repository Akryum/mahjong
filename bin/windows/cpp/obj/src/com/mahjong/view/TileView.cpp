#include <hxcpp.h>

#ifndef INCLUDED_com_gamekit_core_IDestroyable
#include <com/gamekit/core/IDestroyable.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#include <com/gamekit/core/IJsonParsable.h>
#endif
#ifndef INCLUDED_com_gamekit_display_BitmapLoader
#include <com/gamekit/display/BitmapLoader.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_model_Model
#include <com/gamekit/mvc/model/Model.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_view_View
#include <com/gamekit/mvc/view/View.h>
#endif
#ifndef INCLUDED_com_mahjong_model_TileModel
#include <com/mahjong/model/TileModel.h>
#endif
#ifndef INCLUDED_com_mahjong_view_TileView
#include <com/mahjong/view/TileView.h>
#endif
#ifndef INCLUDED_flash_display_Bitmap
#include <flash/display/Bitmap.h>
#endif
#ifndef INCLUDED_flash_display_BitmapData
#include <flash/display/BitmapData.h>
#endif
#ifndef INCLUDED_flash_display_CapsStyle
#include <flash/display/CapsStyle.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObject
#include <flash/display/DisplayObject.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObjectContainer
#include <flash/display/DisplayObjectContainer.h>
#endif
#ifndef INCLUDED_flash_display_Graphics
#include <flash/display/Graphics.h>
#endif
#ifndef INCLUDED_flash_display_IBitmapDrawable
#include <flash/display/IBitmapDrawable.h>
#endif
#ifndef INCLUDED_flash_display_InteractiveObject
#include <flash/display/InteractiveObject.h>
#endif
#ifndef INCLUDED_flash_display_JointStyle
#include <flash/display/JointStyle.h>
#endif
#ifndef INCLUDED_flash_display_LineScaleMode
#include <flash/display/LineScaleMode.h>
#endif
#ifndef INCLUDED_flash_display_PixelSnapping
#include <flash/display/PixelSnapping.h>
#endif
#ifndef INCLUDED_flash_display_Shape
#include <flash/display/Shape.h>
#endif
#ifndef INCLUDED_flash_display_Sprite
#include <flash/display/Sprite.h>
#endif
#ifndef INCLUDED_flash_events_Event
#include <flash/events/Event.h>
#endif
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_MouseEvent
#include <flash/events/MouseEvent.h>
#endif
#ifndef INCLUDED_flash_filters_BitmapFilter
#include <flash/filters/BitmapFilter.h>
#endif
#ifndef INCLUDED_flash_filters_DropShadowFilter
#include <flash/filters/DropShadowFilter.h>
#endif
#ifndef INCLUDED_flash_text_TextField
#include <flash/text/TextField.h>
#endif
#ifndef INCLUDED_flash_text_TextFieldAutoSize
#include <flash/text/TextFieldAutoSize.h>
#endif
#ifndef INCLUDED_flash_text_TextFormat
#include <flash/text/TextFormat.h>
#endif
#ifndef INCLUDED_flash_text_TextFormatAlign
#include <flash/text/TextFormatAlign.h>
#endif
#ifndef INCLUDED_motion_Actuate
#include <motion/Actuate.h>
#endif
#ifndef INCLUDED_motion_actuators_IGenericActuator
#include <motion/actuators/IGenericActuator.h>
#endif
namespace com{
namespace mahjong{
namespace view{

Void TileView_obj::__construct()
{
HX_STACK_PUSH("TileView::new","com/mahjong/view/TileView.hx",24);
{
	HX_STACK_LINE(37)
	this->_enableFX = false;
	HX_STACK_LINE(53)
	super::__construct();
	HX_STACK_LINE(55)
	this->buttonMode = true;
	HX_STACK_LINE(57)
	this->_background = ::flash::display::Shape_obj::__new();
	HX_STACK_LINE(58)
	this->addChild(this->_background);
	HX_STACK_LINE(60)
	this->_labelContainer = ::flash::display::Sprite_obj::__new();
	HX_STACK_LINE(61)
	this->addChild(this->_labelContainer);
	HX_STACK_LINE(63)
	this->_label = ::flash::text::TextField_obj::__new();
	HX_STACK_LINE(64)
	this->_label->set_selectable(false);
	HX_STACK_LINE(65)
	this->_label->set_mouseEnabled(false);
	HX_STACK_LINE(66)
	this->_label->set_autoSize(::flash::text::TextFieldAutoSize_obj::LEFT);
	HX_STACK_LINE(67)
	this->_label->set_multiline(true);
	HX_STACK_LINE(68)
	this->_label->set_embedFonts(true);
	HX_STACK_LINE(69)
	this->_labelContainer->addChild(this->_label);
	HX_STACK_LINE(71)
	::flash::text::TextFormat format = ::flash::text::TextFormat_obj::__new(HX_CSTRING("Aller"),(int)12,(int)0,false,false,false,null(),null(),::flash::text::TextFormatAlign_obj::CENTER,null(),null(),null(),null());		HX_STACK_VAR(format,"format");
	HX_STACK_LINE(72)
	this->_label->set_defaultTextFormat(format);
	HX_STACK_LINE(74)
	this->_image = ::flash::display::Bitmap_obj::__new(null(),null(),null());
	HX_STACK_LINE(75)
	this->addChild(this->_image);
	HX_STACK_LINE(77)
	this->_updateFX();
	HX_STACK_LINE(79)
	this->addEventListener(::flash::events::MouseEvent_obj::ROLL_OVER,this->_onMouseOver_dyn(),null(),null(),null());
	HX_STACK_LINE(80)
	this->addEventListener(::flash::events::MouseEvent_obj::ROLL_OUT,this->_onMouseOut_dyn(),null(),null(),null());
}
;
	return null();
}

TileView_obj::~TileView_obj() { }

Dynamic TileView_obj::__CreateEmpty() { return  new TileView_obj; }
hx::ObjectPtr< TileView_obj > TileView_obj::__new()
{  hx::ObjectPtr< TileView_obj > result = new TileView_obj();
	result->__construct();
	return result;}

Dynamic TileView_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< TileView_obj > result = new TileView_obj();
	result->__construct();
	return result;}

bool TileView_obj::set_enableFX( bool value){
	HX_STACK_PUSH("TileView::set_enableFX","com/mahjong/view/TileView.hx",271);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(272)
	this->_enableFX = value;
	HX_STACK_LINE(274)
	this->_updateFX();
	HX_STACK_LINE(276)
	return this->_enableFX;
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,set_enableFX,return )

bool TileView_obj::get_enableFX( ){
	HX_STACK_PUSH("TileView::get_enableFX","com/mahjong/view/TileView.hx",266);
	HX_STACK_THIS(this);
	HX_STACK_LINE(266)
	return this->_enableFX;
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,get_enableFX,return )

Float TileView_obj::set_displayDepth( Float value){
	HX_STACK_PUSH("TileView::set_displayDepth","com/mahjong/view/TileView.hx",256);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(256)
	return this->_displayDepth = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,set_displayDepth,return )

Float TileView_obj::get_displayDepth( ){
	HX_STACK_PUSH("TileView::get_displayDepth","com/mahjong/view/TileView.hx",251);
	HX_STACK_THIS(this);
	HX_STACK_LINE(251)
	return this->_displayDepth;
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,get_displayDepth,return )

::com::mahjong::model::TileModel TileView_obj::get_tileModel( ){
	HX_STACK_PUSH("TileView::get_tileModel","com/mahjong/view/TileView.hx",244);
	HX_STACK_THIS(this);
	HX_STACK_LINE(244)
	return this->_tileModel;
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,get_tileModel,return )

Void TileView_obj::_onMouseOut( ::flash::events::MouseEvent e){
{
		HX_STACK_PUSH("TileView::_onMouseOut","com/mahjong/view/TileView.hx",236);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(237)
		::motion::Actuate_obj::stop(this->_label,null(),null(),null());
		struct _Function_1_1{
			inline static Dynamic Block( ){
				HX_STACK_PUSH("*::closure","com/mahjong/view/TileView.hx",238);
				{
					hx::Anon __result = hx::Anon_obj::Create();
					__result->Add(HX_CSTRING("alpha") , (int)1,false);
					return __result;
				}
				return null();
			}
		};
		HX_STACK_LINE(238)
		::motion::Actuate_obj::tween(this->_label,0.3,_Function_1_1::Block(),null(),null());
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,_onMouseOut,(void))

Void TileView_obj::_onMouseOver( ::flash::events::MouseEvent e){
{
		HX_STACK_PUSH("TileView::_onMouseOver","com/mahjong/view/TileView.hx",230);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(231)
		::motion::Actuate_obj::stop(this->_label,null(),null(),null());
		struct _Function_1_1{
			inline static Dynamic Block( ){
				HX_STACK_PUSH("*::closure","com/mahjong/view/TileView.hx",232);
				{
					hx::Anon __result = hx::Anon_obj::Create();
					__result->Add(HX_CSTRING("alpha") , 0.7,false);
					return __result;
				}
				return null();
			}
		};
		HX_STACK_LINE(232)
		::motion::Actuate_obj::tween(this->_label,0.3,_Function_1_1::Block(),null(),null());
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,_onMouseOver,(void))

Void TileView_obj::_updateFX( ){
{
		HX_STACK_PUSH("TileView::_updateFX","com/mahjong/view/TileView.hx",212);
		HX_STACK_THIS(this);
		HX_STACK_LINE(212)
		if ((this->_enableFX)){
			HX_STACK_LINE(215)
			this->_background->set_filters(Dynamic( Array_obj<Dynamic>::__new().Add(::flash::filters::DropShadowFilter_obj::__new((int)4,(int)45,(int)0,0.3,(int)8,(int)8,(int)1,(int)1,null(),null(),null()))));
		}
		else{
			HX_STACK_LINE(220)
			this->_background->set_filters(Dynamic( Array_obj<Dynamic>::__new()));
		}
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,_updateFX,(void))

Void TileView_obj::_updateImagePosition( ){
{
		HX_STACK_PUSH("TileView::_updateImagePosition","com/mahjong/view/TileView.hx",206);
		HX_STACK_THIS(this);
		HX_STACK_LINE(207)
		this->_image->set_x((((this->_sizeWidth - this->_image->get_width())) * 0.5));
		HX_STACK_LINE(208)
		this->_image->set_y((((this->_sizeHeight - this->_image->get_height())) * 0.5));
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,_updateImagePosition,(void))

Void TileView_obj::_showImage( ::flash::display::BitmapData data){
{
		HX_STACK_PUSH("TileView::_showImage","com/mahjong/view/TileView.hx",199);
		HX_STACK_THIS(this);
		HX_STACK_ARG(data,"data");
		HX_STACK_LINE(200)
		this->_image->set_bitmapData(data);
		HX_STACK_LINE(202)
		this->_updateImagePosition();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,_showImage,(void))

Void TileView_obj::_drawBackground( ){
{
		HX_STACK_PUSH("TileView::_drawBackground","com/mahjong/view/TileView.hx",180);
		HX_STACK_THIS(this);
		HX_STACK_LINE(181)
		this->_background->get_graphics()->clear();
		HX_STACK_LINE(184)
		this->_background->get_graphics()->lineStyle((int)1,(int)0,(int)1,true,::flash::display::LineScaleMode_obj::NONE,null(),null(),null());
		HX_STACK_LINE(185)
		this->_background->get_graphics()->beginFill((int)11184810,(int)1);
		HX_STACK_LINE(188)
		this->_background->get_graphics()->drawRoundRect(::com::mahjong::view::TileView_obj::depth,::com::mahjong::view::TileView_obj::depth,this->_sizeWidth,this->_sizeHeight,::com::mahjong::view::TileView_obj::roundDiameter,::com::mahjong::view::TileView_obj::roundDiameter);
		HX_STACK_LINE(191)
		this->_background->get_graphics()->lineStyle((int)1,(int)0,(int)1,true,::flash::display::LineScaleMode_obj::NONE,null(),null(),null());
		HX_STACK_LINE(192)
		this->_background->get_graphics()->beginFill((int)16777215,(int)1);
		HX_STACK_LINE(195)
		this->_background->get_graphics()->drawRoundRect((int)0,(int)0,this->_sizeWidth,this->_sizeHeight,::com::mahjong::view::TileView_obj::roundDiameter,::com::mahjong::view::TileView_obj::roundDiameter);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,_drawBackground,(void))

Void TileView_obj::_resize( ){
{
		HX_STACK_PUSH("TileView::_resize","com/mahjong/view/TileView.hx",150);
		HX_STACK_THIS(this);
		HX_STACK_LINE(151)
		this->super::_resize();
		HX_STACK_LINE(154)
		this->_drawBackground();
		HX_STACK_LINE(156)
		if (((this->_tileModel == null()))){
			HX_STACK_LINE(157)
			return null();
		}
		HX_STACK_LINE(162)
		if ((this->_tileModel->get_rotated())){
			HX_STACK_LINE(163)
			this->_labelContainer->set_rotation((int)90);
		}
		else{
			HX_STACK_LINE(167)
			this->_labelContainer->set_rotation((int)0);
		}
		HX_STACK_LINE(170)
		this->_label->set_x((-(this->_label->get_width()) * 0.5));
		HX_STACK_LINE(171)
		this->_label->set_y((-(this->_label->get_height()) * 0.5));
		HX_STACK_LINE(172)
		this->_labelContainer->set_x((this->_sizeWidth * 0.5));
		HX_STACK_LINE(173)
		this->_labelContainer->set_y((this->_sizeHeight * 0.5));
		HX_STACK_LINE(176)
		this->_updateImagePosition();
	}
return null();
}


Void TileView_obj::_applyModel( ){
{
		HX_STACK_PUSH("TileView::_applyModel","com/mahjong/view/TileView.hx",106);
		HX_STACK_THIS(this);
		HX_STACK_LINE(107)
		this->super::_applyModel();
		HX_STACK_LINE(109)
		this->_tileModel = this->_model;
		HX_STACK_LINE(111)
		if (((this->_tileModel != null()))){
			HX_STACK_LINE(114)
			if (((this->_tileModel->get_type() == HX_CSTRING("text")))){
				HX_STACK_LINE(116)
				this->_label->set_visible(true);
				HX_STACK_LINE(125)
				this->_label->set_htmlText(this->_tileModel->get_value());
				HX_STACK_LINE(128)
				this->_image->set_visible(false);
			}
			else{
				HX_STACK_LINE(130)
				if (((this->_tileModel->get_type() == HX_CSTRING("image")))){
					HX_STACK_LINE(132)
					this->_label->set_visible(false);
					HX_STACK_LINE(134)
					this->_image->set_visible(true);
					HX_STACK_LINE(136)
					if (((this->_imageLoader != null()))){
						HX_STACK_LINE(137)
						this->_imageLoader->destroy();
					}
					HX_STACK_LINE(142)
					this->_imageLoader = ::com::gamekit::display::BitmapLoader_obj::__new(this->_tileModel->get_value(),this->_showImage_dyn());
				}
			}
			HX_STACK_LINE(145)
			this->_resize();
		}
	}
return null();
}


Void TileView_obj::destroy( ){
{
		HX_STACK_PUSH("TileView::destroy","com/mahjong/view/TileView.hx",84);
		HX_STACK_THIS(this);
		HX_STACK_LINE(85)
		this->super::destroy();
		HX_STACK_LINE(87)
		this->removeEventListener(::flash::events::MouseEvent_obj::ROLL_OVER,this->_onMouseOver_dyn(),null());
		HX_STACK_LINE(88)
		this->removeEventListener(::flash::events::MouseEvent_obj::ROLL_OUT,this->_onMouseOut_dyn(),null());
		HX_STACK_LINE(90)
		if (((this->_imageLoader != null()))){
			HX_STACK_LINE(91)
			this->_imageLoader->destroy();
		}
		HX_STACK_LINE(95)
		this->_background = null();
		HX_STACK_LINE(96)
		this->_label = null();
		HX_STACK_LINE(97)
		this->_image = null();
		HX_STACK_LINE(98)
		this->_imageLoader = null();
		HX_STACK_LINE(99)
		this->_tileModel = null();
		HX_STACK_LINE(100)
		this->_labelContainer = null();
	}
return null();
}


Float TileView_obj::roundDiameter;

Float TileView_obj::depth;

Float TileView_obj::defaultSizeWidth;

Float TileView_obj::defaultSizeHeight;


TileView_obj::TileView_obj()
{
}

void TileView_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(TileView);
	HX_MARK_MEMBER_NAME(tileModel,"tileModel");
	HX_MARK_MEMBER_NAME(_displayDepth,"_displayDepth");
	HX_MARK_MEMBER_NAME(_imageLoader,"_imageLoader");
	HX_MARK_MEMBER_NAME(_image,"_image");
	HX_MARK_MEMBER_NAME(_label,"_label");
	HX_MARK_MEMBER_NAME(_labelContainer,"_labelContainer");
	HX_MARK_MEMBER_NAME(_background,"_background");
	HX_MARK_MEMBER_NAME(_enableFX,"_enableFX");
	HX_MARK_MEMBER_NAME(_tileModel,"_tileModel");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void TileView_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(tileModel,"tileModel");
	HX_VISIT_MEMBER_NAME(_displayDepth,"_displayDepth");
	HX_VISIT_MEMBER_NAME(_imageLoader,"_imageLoader");
	HX_VISIT_MEMBER_NAME(_image,"_image");
	HX_VISIT_MEMBER_NAME(_label,"_label");
	HX_VISIT_MEMBER_NAME(_labelContainer,"_labelContainer");
	HX_VISIT_MEMBER_NAME(_background,"_background");
	HX_VISIT_MEMBER_NAME(_enableFX,"_enableFX");
	HX_VISIT_MEMBER_NAME(_tileModel,"_tileModel");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic TileView_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 5:
		if (HX_FIELD_EQ(inName,"depth") ) { return depth; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_image") ) { return _image; }
		if (HX_FIELD_EQ(inName,"_label") ) { return _label; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"_resize") ) { return _resize_dyn(); }
		if (HX_FIELD_EQ(inName,"destroy") ) { return destroy_dyn(); }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"enableFX") ) { return get_enableFX(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"tileModel") ) { return inCallProp ? get_tileModel() : tileModel; }
		if (HX_FIELD_EQ(inName,"_updateFX") ) { return _updateFX_dyn(); }
		if (HX_FIELD_EQ(inName,"_enableFX") ) { return _enableFX; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_showImage") ) { return _showImage_dyn(); }
		if (HX_FIELD_EQ(inName,"_tileModel") ) { return _tileModel; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_onMouseOut") ) { return _onMouseOut_dyn(); }
		if (HX_FIELD_EQ(inName,"_applyModel") ) { return _applyModel_dyn(); }
		if (HX_FIELD_EQ(inName,"_background") ) { return _background; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"set_enableFX") ) { return set_enableFX_dyn(); }
		if (HX_FIELD_EQ(inName,"get_enableFX") ) { return get_enableFX_dyn(); }
		if (HX_FIELD_EQ(inName,"displayDepth") ) { return get_displayDepth(); }
		if (HX_FIELD_EQ(inName,"_onMouseOver") ) { return _onMouseOver_dyn(); }
		if (HX_FIELD_EQ(inName,"_imageLoader") ) { return _imageLoader; }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"roundDiameter") ) { return roundDiameter; }
		if (HX_FIELD_EQ(inName,"get_tileModel") ) { return get_tileModel_dyn(); }
		if (HX_FIELD_EQ(inName,"_displayDepth") ) { return _displayDepth; }
		break;
	case 15:
		if (HX_FIELD_EQ(inName,"_drawBackground") ) { return _drawBackground_dyn(); }
		if (HX_FIELD_EQ(inName,"_labelContainer") ) { return _labelContainer; }
		break;
	case 16:
		if (HX_FIELD_EQ(inName,"defaultSizeWidth") ) { return defaultSizeWidth; }
		if (HX_FIELD_EQ(inName,"set_displayDepth") ) { return set_displayDepth_dyn(); }
		if (HX_FIELD_EQ(inName,"get_displayDepth") ) { return get_displayDepth_dyn(); }
		break;
	case 17:
		if (HX_FIELD_EQ(inName,"defaultSizeHeight") ) { return defaultSizeHeight; }
		break;
	case 20:
		if (HX_FIELD_EQ(inName,"_updateImagePosition") ) { return _updateImagePosition_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic TileView_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 5:
		if (HX_FIELD_EQ(inName,"depth") ) { depth=inValue.Cast< Float >(); return inValue; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_image") ) { _image=inValue.Cast< ::flash::display::Bitmap >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_label") ) { _label=inValue.Cast< ::flash::text::TextField >(); return inValue; }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"enableFX") ) { return set_enableFX(inValue); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"tileModel") ) { tileModel=inValue.Cast< ::com::mahjong::model::TileModel >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_enableFX") ) { _enableFX=inValue.Cast< bool >(); return inValue; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_tileModel") ) { _tileModel=inValue.Cast< ::com::mahjong::model::TileModel >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_background") ) { _background=inValue.Cast< ::flash::display::Shape >(); return inValue; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"displayDepth") ) { return set_displayDepth(inValue); }
		if (HX_FIELD_EQ(inName,"_imageLoader") ) { _imageLoader=inValue.Cast< ::com::gamekit::display::BitmapLoader >(); return inValue; }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"roundDiameter") ) { roundDiameter=inValue.Cast< Float >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_displayDepth") ) { _displayDepth=inValue.Cast< Float >(); return inValue; }
		break;
	case 15:
		if (HX_FIELD_EQ(inName,"_labelContainer") ) { _labelContainer=inValue.Cast< ::flash::display::Sprite >(); return inValue; }
		break;
	case 16:
		if (HX_FIELD_EQ(inName,"defaultSizeWidth") ) { defaultSizeWidth=inValue.Cast< Float >(); return inValue; }
		break;
	case 17:
		if (HX_FIELD_EQ(inName,"defaultSizeHeight") ) { defaultSizeHeight=inValue.Cast< Float >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void TileView_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("enableFX"));
	outFields->push(HX_CSTRING("displayDepth"));
	outFields->push(HX_CSTRING("tileModel"));
	outFields->push(HX_CSTRING("_displayDepth"));
	outFields->push(HX_CSTRING("_imageLoader"));
	outFields->push(HX_CSTRING("_image"));
	outFields->push(HX_CSTRING("_label"));
	outFields->push(HX_CSTRING("_labelContainer"));
	outFields->push(HX_CSTRING("_background"));
	outFields->push(HX_CSTRING("_enableFX"));
	outFields->push(HX_CSTRING("_tileModel"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("roundDiameter"),
	HX_CSTRING("depth"),
	HX_CSTRING("defaultSizeWidth"),
	HX_CSTRING("defaultSizeHeight"),
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("set_enableFX"),
	HX_CSTRING("get_enableFX"),
	HX_CSTRING("set_displayDepth"),
	HX_CSTRING("get_displayDepth"),
	HX_CSTRING("tileModel"),
	HX_CSTRING("get_tileModel"),
	HX_CSTRING("_onMouseOut"),
	HX_CSTRING("_onMouseOver"),
	HX_CSTRING("_updateFX"),
	HX_CSTRING("_updateImagePosition"),
	HX_CSTRING("_showImage"),
	HX_CSTRING("_drawBackground"),
	HX_CSTRING("_resize"),
	HX_CSTRING("_applyModel"),
	HX_CSTRING("destroy"),
	HX_CSTRING("_displayDepth"),
	HX_CSTRING("_imageLoader"),
	HX_CSTRING("_image"),
	HX_CSTRING("_label"),
	HX_CSTRING("_labelContainer"),
	HX_CSTRING("_background"),
	HX_CSTRING("_enableFX"),
	HX_CSTRING("_tileModel"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(TileView_obj::__mClass,"__mClass");
	HX_MARK_MEMBER_NAME(TileView_obj::roundDiameter,"roundDiameter");
	HX_MARK_MEMBER_NAME(TileView_obj::depth,"depth");
	HX_MARK_MEMBER_NAME(TileView_obj::defaultSizeWidth,"defaultSizeWidth");
	HX_MARK_MEMBER_NAME(TileView_obj::defaultSizeHeight,"defaultSizeHeight");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(TileView_obj::__mClass,"__mClass");
	HX_VISIT_MEMBER_NAME(TileView_obj::roundDiameter,"roundDiameter");
	HX_VISIT_MEMBER_NAME(TileView_obj::depth,"depth");
	HX_VISIT_MEMBER_NAME(TileView_obj::defaultSizeWidth,"defaultSizeWidth");
	HX_VISIT_MEMBER_NAME(TileView_obj::defaultSizeHeight,"defaultSizeHeight");
};

Class TileView_obj::__mClass;

void TileView_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.mahjong.view.TileView"), hx::TCanCast< TileView_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void TileView_obj::__boot()
{
	roundDiameter= (int)16;
	depth= (int)5;
	defaultSizeWidth= (int)48;
	defaultSizeHeight= (int)72;
}

} // end namespace com
} // end namespace mahjong
} // end namespace view
