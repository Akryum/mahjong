#include <hxcpp.h>

#ifndef INCLUDED_com_gamekit_core_IDestroyable
#include <com/gamekit/core/IDestroyable.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#include <com/gamekit/core/IJsonParsable.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_model_Model
#include <com/gamekit/mvc/model/Model.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_view_View
#include <com/gamekit/mvc/view/View.h>
#endif
#ifndef INCLUDED_com_mahjong_Mahjong
#include <com/mahjong/Mahjong.h>
#endif
#ifndef INCLUDED_com_mahjong_model_TileModel
#include <com/mahjong/model/TileModel.h>
#endif
#ifndef INCLUDED_com_mahjong_view_TileView
#include <com/mahjong/view/TileView.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObject
#include <flash/display/DisplayObject.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObjectContainer
#include <flash/display/DisplayObjectContainer.h>
#endif
#ifndef INCLUDED_flash_display_IBitmapDrawable
#include <flash/display/IBitmapDrawable.h>
#endif
#ifndef INCLUDED_flash_display_InteractiveObject
#include <flash/display/InteractiveObject.h>
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
#ifndef INCLUDED_tjson_TJSON
#include <tjson/TJSON.h>
#endif
namespace com{
namespace mahjong{

Void Mahjong_obj::__construct()
{
HX_STACK_PUSH("Mahjong::new","com/mahjong/Mahjong.hx",18);
{
	HX_STACK_LINE(19)
	super::__construct();
	HX_STACK_LINE(21)
	this->_tileModels = Array_obj< ::Dynamic >::__new();
	HX_STACK_LINE(22)
	this->_tileViews = Array_obj< ::Dynamic >::__new();
	HX_STACK_LINE(27)
	::String tileData = HX_CSTRING("{\r\n            \"name\": \"H_s\",\r\n            \"type\": \"text\",\r\n            \"value\": \"\\\\size(150){\\\\color(blue){H}}\",\r\n            \"context\": \"s\",\r\n            \"information\": \"Son num\xc3""\xa9""ro atomique est le 1.\"\r\n        }");		HX_STACK_VAR(tileData,"tileData");
	HX_STACK_LINE(34)
	::com::mahjong::model::TileModel tileModel = ::com::mahjong::model::TileModel_obj::__new();		HX_STACK_VAR(tileModel,"tileModel");
	HX_STACK_LINE(35)
	tileModel->parseJson(::tjson::TJSON_obj::parse(tileData,null()));
	HX_STACK_LINE(37)
	::com::mahjong::view::TileView tileView = ::com::mahjong::view::TileView_obj::__new();		HX_STACK_VAR(tileView,"tileView");
	HX_STACK_LINE(38)
	tileView->setSize((int)48,(int)72);
	HX_STACK_LINE(39)
	tileView->set_model(tileModel);
	HX_STACK_LINE(40)
	tileView->set_x((int)100);
	HX_STACK_LINE(41)
	tileView->set_y((int)100);
	HX_STACK_LINE(42)
	this->addChild(tileView);
}
;
	return null();
}

Mahjong_obj::~Mahjong_obj() { }

Dynamic Mahjong_obj::__CreateEmpty() { return  new Mahjong_obj; }
hx::ObjectPtr< Mahjong_obj > Mahjong_obj::__new()
{  hx::ObjectPtr< Mahjong_obj > result = new Mahjong_obj();
	result->__construct();
	return result;}

Dynamic Mahjong_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< Mahjong_obj > result = new Mahjong_obj();
	result->__construct();
	return result;}


Mahjong_obj::Mahjong_obj()
{
}

void Mahjong_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(Mahjong);
	HX_MARK_MEMBER_NAME(_tileViews,"_tileViews");
	HX_MARK_MEMBER_NAME(_tileModels,"_tileModels");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void Mahjong_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(_tileViews,"_tileViews");
	HX_VISIT_MEMBER_NAME(_tileModels,"_tileModels");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic Mahjong_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 10:
		if (HX_FIELD_EQ(inName,"_tileViews") ) { return _tileViews; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_tileModels") ) { return _tileModels; }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic Mahjong_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 10:
		if (HX_FIELD_EQ(inName,"_tileViews") ) { _tileViews=inValue.Cast< Array< ::Dynamic > >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_tileModels") ) { _tileModels=inValue.Cast< Array< ::Dynamic > >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void Mahjong_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("_tileViews"));
	outFields->push(HX_CSTRING("_tileModels"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("_tileViews"),
	HX_CSTRING("_tileModels"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(Mahjong_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(Mahjong_obj::__mClass,"__mClass");
};

Class Mahjong_obj::__mClass;

void Mahjong_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.mahjong.Mahjong"), hx::TCanCast< Mahjong_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void Mahjong_obj::__boot()
{
}

} // end namespace com
} // end namespace mahjong
