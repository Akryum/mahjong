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
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
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
#ifndef INCLUDED_hxMath
#include <hxMath.h>
#endif
namespace com{
namespace mahjong{
namespace view{

Void TileView_obj::__construct()
{
HX_STACK_PUSH("TileView::new","com/mahjong/view/TileView.hx",32);
{
	HX_STACK_LINE(33)
	super::__construct();
	HX_STACK_LINE(35)
	this->_background = ::flash::display::Shape_obj::__new();
	HX_STACK_LINE(37)
	this->_background->set_cacheAsBitmap(true);
	HX_STACK_LINE(39)
	this->addChild(this->_background);
	HX_STACK_LINE(41)
	this->_label = ::flash::text::TextField_obj::__new();
	HX_STACK_LINE(42)
	this->_label->set_selectable(false);
	HX_STACK_LINE(43)
	this->_label->set_mouseEnabled(false);
	HX_STACK_LINE(44)
	this->_label->set_autoSize(::flash::text::TextFieldAutoSize_obj::LEFT);
	HX_STACK_LINE(45)
	this->_label->set_embedFonts(true);
	HX_STACK_LINE(46)
	this->addChild(this->_label);
	HX_STACK_LINE(48)
	::flash::text::TextFormat format = ::flash::text::TextFormat_obj::__new(HX_CSTRING("Aller"),(int)12,(int)0,null(),null(),null(),null(),null(),null(),null(),null(),null(),null());		HX_STACK_VAR(format,"format");
	HX_STACK_LINE(49)
	this->_label->set_defaultTextFormat(format);
	HX_STACK_LINE(51)
	this->_image = ::flash::display::Bitmap_obj::__new(null(),null(),null());
	HX_STACK_LINE(52)
	this->addChild(this->_image);
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

::com::mahjong::model::TileModel TileView_obj::get_tileModel( ){
	HX_STACK_PUSH("TileView::get_tileModel","com/mahjong/view/TileView.hx",174);
	HX_STACK_THIS(this);
	HX_STACK_LINE(174)
	return this->_tileModel;
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,get_tileModel,return )

Void TileView_obj::_updateImagePosition( ){
{
		HX_STACK_PUSH("TileView::_updateImagePosition","com/mahjong/view/TileView.hx",166);
		HX_STACK_THIS(this);
		HX_STACK_LINE(167)
		this->_image->set_x((((this->_sizeWidth - this->_image->get_width())) * 0.5));
		HX_STACK_LINE(168)
		this->_image->set_y((((this->_sizeHeight - this->_image->get_height())) * 0.5));
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,_updateImagePosition,(void))

Void TileView_obj::_showImage( ::flash::display::BitmapData data){
{
		HX_STACK_PUSH("TileView::_showImage","com/mahjong/view/TileView.hx",159);
		HX_STACK_THIS(this);
		HX_STACK_ARG(data,"data");
		HX_STACK_LINE(160)
		this->_image->set_bitmapData(data);
		HX_STACK_LINE(162)
		this->_updateImagePosition();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(TileView_obj,_showImage,(void))

Void TileView_obj::_drawBackground( ){
{
		HX_STACK_PUSH("TileView::_drawBackground","com/mahjong/view/TileView.hx",136);
		HX_STACK_THIS(this);
		HX_STACK_LINE(137)
		this->_background->get_graphics()->clear();
		HX_STACK_LINE(139)
		Float roundDiameter = (int)20;		HX_STACK_VAR(roundDiameter,"roundDiameter");
		HX_STACK_LINE(140)
		Float depth = (int)5;		HX_STACK_VAR(depth,"depth");
		HX_STACK_LINE(141)
		Float depthAngle = (Float(::Math_obj::PI) / Float((int)4));		HX_STACK_VAR(depthAngle,"depthAngle");
		HX_STACK_LINE(144)
		this->_background->get_graphics()->lineStyle((int)1,(int)0,(int)1,true,::flash::display::LineScaleMode_obj::NONE,null(),null(),null());
		HX_STACK_LINE(145)
		this->_background->get_graphics()->beginFill((int)11184810,(int)1);
		HX_STACK_LINE(148)
		this->_background->get_graphics()->drawRoundRect((::Math_obj::cos(depthAngle) * depth),(::Math_obj::sin(depthAngle) * depth),this->_sizeWidth,this->_sizeHeight,roundDiameter,roundDiameter);
		HX_STACK_LINE(151)
		this->_background->get_graphics()->lineStyle((int)1,(int)0,(int)1,true,::flash::display::LineScaleMode_obj::NONE,null(),null(),null());
		HX_STACK_LINE(152)
		this->_background->get_graphics()->beginFill((int)16777215,(int)1);
		HX_STACK_LINE(155)
		this->_background->get_graphics()->drawRoundRect((int)0,(int)0,this->_sizeWidth,this->_sizeHeight,roundDiameter,roundDiameter);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(TileView_obj,_drawBackground,(void))

Void TileView_obj::_resize( ){
{
		HX_STACK_PUSH("TileView::_resize","com/mahjong/view/TileView.hx",108);
		HX_STACK_THIS(this);
		HX_STACK_LINE(109)
		this->super::_resize();
		HX_STACK_LINE(112)
		this->_drawBackground();
		HX_STACK_LINE(114)
		if (((this->_tileModel == null()))){
			HX_STACK_LINE(115)
			return null();
		}
		HX_STACK_LINE(120)
		if ((this->_tileModel->get_rotated())){
			HX_STACK_LINE(121)
			this->_label->set_rotation((int)45);
		}
		else{
			HX_STACK_LINE(125)
			this->_label->set_rotation((int)0);
		}
		HX_STACK_LINE(128)
		this->_label->set_x((((this->_sizeWidth - this->_label->get_width())) * 0.5));
		HX_STACK_LINE(129)
		this->_label->set_y((((this->_sizeHeight - this->_label->get_height())) * 0.5));
		HX_STACK_LINE(132)
		this->_updateImagePosition();
	}
return null();
}


Void TileView_obj::_applyModel( ){
{
		HX_STACK_PUSH("TileView::_applyModel","com/mahjong/view/TileView.hx",73);
		HX_STACK_THIS(this);
		HX_STACK_LINE(74)
		this->super::_applyModel();
		HX_STACK_LINE(76)
		this->_tileModel = this->_model;
		HX_STACK_LINE(78)
		if (((this->_tileModel != null()))){
			HX_STACK_LINE(81)
			if (((this->_tileModel->get_type() == HX_CSTRING("text")))){
				HX_STACK_LINE(83)
				this->_label->set_visible(true);
				HX_STACK_LINE(84)
				this->_label->set_htmlText(this->_tileModel->get_value());
				HX_STACK_LINE(86)
				this->_image->set_visible(false);
			}
			else{
				HX_STACK_LINE(88)
				if (((this->_tileModel->get_type() == HX_CSTRING("image")))){
					HX_STACK_LINE(90)
					this->_label->set_visible(false);
					HX_STACK_LINE(92)
					this->_image->set_visible(true);
					HX_STACK_LINE(94)
					if (((this->_imageLoader != null()))){
						HX_STACK_LINE(95)
						this->_imageLoader->destroy();
					}
					HX_STACK_LINE(100)
					this->_imageLoader = ::com::gamekit::display::BitmapLoader_obj::__new(this->_tileModel->get_value(),this->_showImage_dyn());
				}
			}
			HX_STACK_LINE(103)
			this->_resize();
		}
	}
return null();
}


Void TileView_obj::destroy( ){
{
		HX_STACK_PUSH("TileView::destroy","com/mahjong/view/TileView.hx",56);
		HX_STACK_THIS(this);
		HX_STACK_LINE(57)
		this->super::destroy();
		HX_STACK_LINE(59)
		if (((this->_imageLoader != null()))){
			HX_STACK_LINE(60)
			this->_imageLoader->destroy();
		}
		HX_STACK_LINE(64)
		this->_background = null();
		HX_STACK_LINE(65)
		this->_label = null();
		HX_STACK_LINE(66)
		this->_image = null();
		HX_STACK_LINE(67)
		this->_imageLoader = null();
	}
return null();
}



TileView_obj::TileView_obj()
{
}

void TileView_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(TileView);
	HX_MARK_MEMBER_NAME(tileModel,"tileModel");
	HX_MARK_MEMBER_NAME(_imageLoader,"_imageLoader");
	HX_MARK_MEMBER_NAME(_image,"_image");
	HX_MARK_MEMBER_NAME(_label,"_label");
	HX_MARK_MEMBER_NAME(_background,"_background");
	HX_MARK_MEMBER_NAME(_tileModel,"_tileModel");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void TileView_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(tileModel,"tileModel");
	HX_VISIT_MEMBER_NAME(_imageLoader,"_imageLoader");
	HX_VISIT_MEMBER_NAME(_image,"_image");
	HX_VISIT_MEMBER_NAME(_label,"_label");
	HX_VISIT_MEMBER_NAME(_background,"_background");
	HX_VISIT_MEMBER_NAME(_tileModel,"_tileModel");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic TileView_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 6:
		if (HX_FIELD_EQ(inName,"_image") ) { return _image; }
		if (HX_FIELD_EQ(inName,"_label") ) { return _label; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"_resize") ) { return _resize_dyn(); }
		if (HX_FIELD_EQ(inName,"destroy") ) { return destroy_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"tileModel") ) { return inCallProp ? get_tileModel() : tileModel; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_showImage") ) { return _showImage_dyn(); }
		if (HX_FIELD_EQ(inName,"_tileModel") ) { return _tileModel; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_applyModel") ) { return _applyModel_dyn(); }
		if (HX_FIELD_EQ(inName,"_background") ) { return _background; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"_imageLoader") ) { return _imageLoader; }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"get_tileModel") ) { return get_tileModel_dyn(); }
		break;
	case 15:
		if (HX_FIELD_EQ(inName,"_drawBackground") ) { return _drawBackground_dyn(); }
		break;
	case 20:
		if (HX_FIELD_EQ(inName,"_updateImagePosition") ) { return _updateImagePosition_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic TileView_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 6:
		if (HX_FIELD_EQ(inName,"_image") ) { _image=inValue.Cast< ::flash::display::Bitmap >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_label") ) { _label=inValue.Cast< ::flash::text::TextField >(); return inValue; }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"tileModel") ) { tileModel=inValue.Cast< ::com::mahjong::model::TileModel >(); return inValue; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_tileModel") ) { _tileModel=inValue.Cast< ::com::mahjong::model::TileModel >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_background") ) { _background=inValue.Cast< ::flash::display::Shape >(); return inValue; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"_imageLoader") ) { _imageLoader=inValue.Cast< ::com::gamekit::display::BitmapLoader >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void TileView_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("tileModel"));
	outFields->push(HX_CSTRING("_imageLoader"));
	outFields->push(HX_CSTRING("_image"));
	outFields->push(HX_CSTRING("_label"));
	outFields->push(HX_CSTRING("_background"));
	outFields->push(HX_CSTRING("_tileModel"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("tileModel"),
	HX_CSTRING("get_tileModel"),
	HX_CSTRING("_updateImagePosition"),
	HX_CSTRING("_showImage"),
	HX_CSTRING("_drawBackground"),
	HX_CSTRING("_resize"),
	HX_CSTRING("_applyModel"),
	HX_CSTRING("destroy"),
	HX_CSTRING("_imageLoader"),
	HX_CSTRING("_image"),
	HX_CSTRING("_label"),
	HX_CSTRING("_background"),
	HX_CSTRING("_tileModel"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(TileView_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(TileView_obj::__mClass,"__mClass");
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
}

} // end namespace com
} // end namespace mahjong
} // end namespace view
