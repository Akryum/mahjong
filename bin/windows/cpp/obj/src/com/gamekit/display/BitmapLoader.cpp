#include <hxcpp.h>

#ifndef INCLUDED_IMap
#include <IMap.h>
#endif
#ifndef INCLUDED_Reflect
#include <Reflect.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IDestroyable
#include <com/gamekit/core/IDestroyable.h>
#endif
#ifndef INCLUDED_com_gamekit_display_BitmapLoader
#include <com/gamekit/display/BitmapLoader.h>
#endif
#ifndef INCLUDED_flash_display_Bitmap
#include <flash/display/Bitmap.h>
#endif
#ifndef INCLUDED_flash_display_BitmapData
#include <flash/display/BitmapData.h>
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
#ifndef INCLUDED_flash_display_Loader
#include <flash/display/Loader.h>
#endif
#ifndef INCLUDED_flash_display_LoaderInfo
#include <flash/display/LoaderInfo.h>
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
#ifndef INCLUDED_flash_net_URLLoader
#include <flash/net/URLLoader.h>
#endif
#ifndef INCLUDED_haxe_ds_StringMap
#include <haxe/ds/StringMap.h>
#endif
namespace com{
namespace gamekit{
namespace display{

Void BitmapLoader_obj::__construct(::String url,Dynamic callback)
{
HX_STACK_PUSH("BitmapLoader::new","com/gamekit/display/BitmapLoader.hx",25);
{
	HX_STACK_LINE(26)
	this->_url = url;
	HX_STACK_LINE(27)
	this->_callback = callback;
	HX_STACK_LINE(29)
	if (((::com::gamekit::display::BitmapLoader_obj::_cache == null()))){
		HX_STACK_LINE(30)
		::com::gamekit::display::BitmapLoader_obj::_cache = ::haxe::ds::StringMap_obj::__new();
	}
	HX_STACK_LINE(34)
	if ((::com::gamekit::display::BitmapLoader_obj::_cache->exists(this->_url))){
		HX_STACK_LINE(36)
		this->_bitmapData = ::com::gamekit::display::BitmapLoader_obj::_cache->get(this->_url);
		HX_STACK_LINE(37)
		this->_applyCallback();
	}
	HX_STACK_LINE(40)
	this->_load();
}
;
	return null();
}

BitmapLoader_obj::~BitmapLoader_obj() { }

Dynamic BitmapLoader_obj::__CreateEmpty() { return  new BitmapLoader_obj; }
hx::ObjectPtr< BitmapLoader_obj > BitmapLoader_obj::__new(::String url,Dynamic callback)
{  hx::ObjectPtr< BitmapLoader_obj > result = new BitmapLoader_obj();
	result->__construct(url,callback);
	return result;}

Dynamic BitmapLoader_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< BitmapLoader_obj > result = new BitmapLoader_obj();
	result->__construct(inArgs[0],inArgs[1]);
	return result;}

hx::Object *BitmapLoader_obj::__ToInterface(const hx::type_info &inType) {
	if (inType==typeid( ::com::gamekit::core::IDestroyable_obj)) return operator ::com::gamekit::core::IDestroyable_obj *();
	return super::__ToInterface(inType);
}

::flash::display::BitmapData BitmapLoader_obj::get_bitmapData( ){
	HX_STACK_PUSH("BitmapLoader::get_bitmapData","com/gamekit/display/BitmapLoader.hx",116);
	HX_STACK_THIS(this);
	HX_STACK_LINE(116)
	return this->_bitmapData;
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,get_bitmapData,return )

Dynamic BitmapLoader_obj::get_callback( ){
	HX_STACK_PUSH("BitmapLoader::get_callback","com/gamekit/display/BitmapLoader.hx",109);
	HX_STACK_THIS(this);
	HX_STACK_LINE(109)
	return this->_callback_dyn();
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,get_callback,return )

::String BitmapLoader_obj::get_url( ){
	HX_STACK_PUSH("BitmapLoader::get_url","com/gamekit/display/BitmapLoader.hx",102);
	HX_STACK_THIS(this);
	HX_STACK_LINE(102)
	return this->_url;
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,get_url,return )

Void BitmapLoader_obj::_onLoadComplete( ::flash::events::Event e){
{
		HX_STACK_PUSH("BitmapLoader::_onLoadComplete","com/gamekit/display/BitmapLoader.hx",84);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(86)
		::flash::display::Bitmap bitmap = this->_loader->content;		HX_STACK_VAR(bitmap,"bitmap");
		HX_STACK_LINE(88)
		if (((bitmap != null()))){
			HX_STACK_LINE(89)
			this->_bitmapData = bitmap->bitmapData;
		}
		HX_STACK_LINE(93)
		::com::gamekit::display::BitmapLoader_obj::_cache->set(this->_url,this->_bitmapData);
		HX_STACK_LINE(96)
		this->_applyCallback();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(BitmapLoader_obj,_onLoadComplete,(void))

Void BitmapLoader_obj::_applyCallback( ){
{
		HX_STACK_PUSH("BitmapLoader::_applyCallback","com/gamekit/display/BitmapLoader.hx",74);
		HX_STACK_THIS(this);
		HX_STACK_LINE(74)
		if (((this->_callback_dyn() != null()))){
			HX_STACK_LINE(76)
			::Reflect_obj::callMethod(hx::ObjectPtr<OBJ_>(this),this->_callback_dyn(),Dynamic( Array_obj<Dynamic>::__new().Add(this->_bitmapData)));
		}
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,_applyCallback,(void))

Void BitmapLoader_obj::_load( ){
{
		HX_STACK_PUSH("BitmapLoader::_load","com/gamekit/display/BitmapLoader.hx",68);
		HX_STACK_THIS(this);
		HX_STACK_LINE(69)
		this->_loader = ::flash::display::Loader_obj::__new();
		HX_STACK_LINE(70)
		this->_loader->loaderInfo->addEventListener(::flash::events::Event_obj::COMPLETE,this->_onLoadComplete_dyn(),null(),null(),null());
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,_load,(void))

Void BitmapLoader_obj::destroy( ){
{
		HX_STACK_PUSH("BitmapLoader::destroy","com/gamekit/display/BitmapLoader.hx",46);
		HX_STACK_THIS(this);
		HX_STACK_LINE(47)
		if (((this->_loader != null()))){
			HX_STACK_LINE(48)
			this->_loader->loaderInfo->removeEventListener(::flash::events::Event_obj::COMPLETE,this->_onLoadComplete_dyn(),null());
		}
		HX_STACK_LINE(55)
		this->_loader = null();
		HX_STACK_LINE(56)
		this->_callback = null();
		HX_STACK_LINE(57)
		this->_bitmapData = null();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,destroy,(void))

::haxe::ds::StringMap BitmapLoader_obj::_cache;

Void BitmapLoader_obj::clearCache( ){
{
		HX_STACK_PUSH("BitmapLoader::clearCache","com/gamekit/display/BitmapLoader.hx",61);
		HX_STACK_LINE(61)
		::com::gamekit::display::BitmapLoader_obj::_cache = null();
	}
return null();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC0(BitmapLoader_obj,clearCache,(void))


BitmapLoader_obj::BitmapLoader_obj()
{
}

void BitmapLoader_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(BitmapLoader);
	HX_MARK_MEMBER_NAME(bitmapData,"bitmapData");
	HX_MARK_MEMBER_NAME(callback,"callback");
	HX_MARK_MEMBER_NAME(url,"url");
	HX_MARK_MEMBER_NAME(_loader,"_loader");
	HX_MARK_MEMBER_NAME(_bitmapData,"_bitmapData");
	HX_MARK_MEMBER_NAME(_callback,"_callback");
	HX_MARK_MEMBER_NAME(_url,"_url");
	HX_MARK_END_CLASS();
}

void BitmapLoader_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(bitmapData,"bitmapData");
	HX_VISIT_MEMBER_NAME(callback,"callback");
	HX_VISIT_MEMBER_NAME(url,"url");
	HX_VISIT_MEMBER_NAME(_loader,"_loader");
	HX_VISIT_MEMBER_NAME(_bitmapData,"_bitmapData");
	HX_VISIT_MEMBER_NAME(_callback,"_callback");
	HX_VISIT_MEMBER_NAME(_url,"_url");
}

Dynamic BitmapLoader_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 3:
		if (HX_FIELD_EQ(inName,"url") ) { return inCallProp ? get_url() : url; }
		break;
	case 4:
		if (HX_FIELD_EQ(inName,"_url") ) { return _url; }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"_load") ) { return _load_dyn(); }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_cache") ) { return _cache; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"get_url") ) { return get_url_dyn(); }
		if (HX_FIELD_EQ(inName,"destroy") ) { return destroy_dyn(); }
		if (HX_FIELD_EQ(inName,"_loader") ) { return _loader; }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"callback") ) { return inCallProp ? get_callback() : callback; }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"_callback") ) { return _callback; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"clearCache") ) { return clearCache_dyn(); }
		if (HX_FIELD_EQ(inName,"bitmapData") ) { return inCallProp ? get_bitmapData() : bitmapData; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_bitmapData") ) { return _bitmapData; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"get_callback") ) { return get_callback_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"get_bitmapData") ) { return get_bitmapData_dyn(); }
		if (HX_FIELD_EQ(inName,"_applyCallback") ) { return _applyCallback_dyn(); }
		break;
	case 15:
		if (HX_FIELD_EQ(inName,"_onLoadComplete") ) { return _onLoadComplete_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic BitmapLoader_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 3:
		if (HX_FIELD_EQ(inName,"url") ) { url=inValue.Cast< ::String >(); return inValue; }
		break;
	case 4:
		if (HX_FIELD_EQ(inName,"_url") ) { _url=inValue.Cast< ::String >(); return inValue; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_cache") ) { _cache=inValue.Cast< ::haxe::ds::StringMap >(); return inValue; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"_loader") ) { _loader=inValue.Cast< ::flash::display::Loader >(); return inValue; }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"callback") ) { callback=inValue.Cast< Dynamic >(); return inValue; }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"_callback") ) { _callback=inValue.Cast< Dynamic >(); return inValue; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"bitmapData") ) { bitmapData=inValue.Cast< ::flash::display::BitmapData >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_bitmapData") ) { _bitmapData=inValue.Cast< ::flash::display::BitmapData >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void BitmapLoader_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("bitmapData"));
	outFields->push(HX_CSTRING("url"));
	outFields->push(HX_CSTRING("_loader"));
	outFields->push(HX_CSTRING("_bitmapData"));
	outFields->push(HX_CSTRING("_url"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("_cache"),
	HX_CSTRING("clearCache"),
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("bitmapData"),
	HX_CSTRING("get_bitmapData"),
	HX_CSTRING("callback"),
	HX_CSTRING("get_callback"),
	HX_CSTRING("url"),
	HX_CSTRING("get_url"),
	HX_CSTRING("_onLoadComplete"),
	HX_CSTRING("_applyCallback"),
	HX_CSTRING("_load"),
	HX_CSTRING("destroy"),
	HX_CSTRING("_loader"),
	HX_CSTRING("_bitmapData"),
	HX_CSTRING("_callback"),
	HX_CSTRING("_url"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(BitmapLoader_obj::__mClass,"__mClass");
	HX_MARK_MEMBER_NAME(BitmapLoader_obj::_cache,"_cache");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(BitmapLoader_obj::__mClass,"__mClass");
	HX_VISIT_MEMBER_NAME(BitmapLoader_obj::_cache,"_cache");
};

Class BitmapLoader_obj::__mClass;

void BitmapLoader_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.gamekit.display.BitmapLoader"), hx::TCanCast< BitmapLoader_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void BitmapLoader_obj::__boot()
{
}

} // end namespace com
} // end namespace gamekit
} // end namespace display
