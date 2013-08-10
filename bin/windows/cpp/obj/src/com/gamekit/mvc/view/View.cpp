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
#ifndef INCLUDED_flash_events_Event
#include <flash/events/Event.h>
#endif
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
namespace com{
namespace gamekit{
namespace mvc{
namespace view{

Void View_obj::__construct()
{
HX_STACK_PUSH("View::new","com/gamekit/mvc/view/View.hx",20);
{
	HX_STACK_LINE(20)
	super::__construct();
}
;
	return null();
}

View_obj::~View_obj() { }

Dynamic View_obj::__CreateEmpty() { return  new View_obj; }
hx::ObjectPtr< View_obj > View_obj::__new()
{  hx::ObjectPtr< View_obj > result = new View_obj();
	result->__construct();
	return result;}

Dynamic View_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< View_obj > result = new View_obj();
	result->__construct();
	return result;}

hx::Object *View_obj::__ToInterface(const hx::type_info &inType) {
	if (inType==typeid( ::com::gamekit::core::IDestroyable_obj)) return operator ::com::gamekit::core::IDestroyable_obj *();
	return super::__ToInterface(inType);
}

Float View_obj::set_sizeHeight( Float value){
	HX_STACK_PUSH("View::set_sizeHeight","com/gamekit/mvc/view/View.hx",168);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(169)
	this->_sizeHeight = value;
	HX_STACK_LINE(171)
	this->_resize();
	HX_STACK_LINE(173)
	return this->_sizeHeight;
}


HX_DEFINE_DYNAMIC_FUNC1(View_obj,set_sizeHeight,return )

Float View_obj::get_sizeHeight( ){
	HX_STACK_PUSH("View::get_sizeHeight","com/gamekit/mvc/view/View.hx",163);
	HX_STACK_THIS(this);
	HX_STACK_LINE(163)
	return this->_sizeHeight;
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,get_sizeHeight,return )

Float View_obj::set_sizeWidth( Float value){
	HX_STACK_PUSH("View::set_sizeWidth","com/gamekit/mvc/view/View.hx",149);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(150)
	this->_sizeWidth = value;
	HX_STACK_LINE(152)
	this->_resize();
	HX_STACK_LINE(154)
	return this->_sizeWidth;
}


HX_DEFINE_DYNAMIC_FUNC1(View_obj,set_sizeWidth,return )

Float View_obj::get_sizeWidth( ){
	HX_STACK_PUSH("View::get_sizeWidth","com/gamekit/mvc/view/View.hx",144);
	HX_STACK_THIS(this);
	HX_STACK_LINE(144)
	return this->_sizeWidth;
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,get_sizeWidth,return )

::com::gamekit::mvc::model::Model View_obj::set_model( ::com::gamekit::mvc::model::Model value){
	HX_STACK_PUSH("View::set_model","com/gamekit/mvc/view/View.hx",115);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(116)
	if (((this->_model != value))){
		HX_STACK_LINE(118)
		this->_dismissModel();
		HX_STACK_LINE(120)
		this->_model = value;
		HX_STACK_LINE(122)
		if (((this->_model != null()))){
			HX_STACK_LINE(125)
			this->_model->addEventListener(::flash::events::Event_obj::CHANGE,this->_onModelChange_dyn(),null(),null(),null());
			HX_STACK_LINE(127)
			this->_applyModel();
		}
		else{
			HX_STACK_LINE(130)
			this->_clear();
		}
	}
	HX_STACK_LINE(135)
	return this->_model;
}


HX_DEFINE_DYNAMIC_FUNC1(View_obj,set_model,return )

::com::gamekit::mvc::model::Model View_obj::get_model( ){
	HX_STACK_PUSH("View::get_model","com/gamekit/mvc/view/View.hx",110);
	HX_STACK_THIS(this);
	HX_STACK_LINE(110)
	return this->_model;
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,get_model,return )

Void View_obj::_onModelChange( ::flash::events::Event e){
{
		HX_STACK_PUSH("View::_onModelChange","com/gamekit/mvc/view/View.hx",103);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(103)
		this->_applyModel();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(View_obj,_onModelChange,(void))

Void View_obj::_dismissModel( ){
{
		HX_STACK_PUSH("View::_dismissModel","com/gamekit/mvc/view/View.hx",91);
		HX_STACK_THIS(this);
		HX_STACK_LINE(92)
		if (((this->_model != null()))){
			HX_STACK_LINE(93)
			this->_model->removeEventListener(::flash::events::Event_obj::CHANGE,this->_onModelChange_dyn(),null());
		}
		HX_STACK_LINE(97)
		this->_model = null();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,_dismissModel,(void))

Void View_obj::_applyModel( ){
{
		HX_STACK_PUSH("View::_applyModel","com/gamekit/mvc/view/View.hx",83);
		HX_STACK_THIS(this);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,_applyModel,(void))

Void View_obj::_clear( ){
{
		HX_STACK_PUSH("View::_clear","com/gamekit/mvc/view/View.hx",75);
		HX_STACK_THIS(this);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,_clear,(void))

Void View_obj::_resize( ){
{
		HX_STACK_PUSH("View::_resize","com/gamekit/mvc/view/View.hx",67);
		HX_STACK_THIS(this);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,_resize,(void))

Void View_obj::setSize( Float width,Float height){
{
		HX_STACK_PUSH("View::setSize","com/gamekit/mvc/view/View.hx",54);
		HX_STACK_THIS(this);
		HX_STACK_ARG(width,"width");
		HX_STACK_ARG(height,"height");
		HX_STACK_LINE(55)
		this->_sizeWidth = width;
		HX_STACK_LINE(56)
		this->_sizeHeight = height;
		HX_STACK_LINE(58)
		this->_resize();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC2(View_obj,setSize,(void))

Void View_obj::destroy( ){
{
		HX_STACK_PUSH("View::destroy","com/gamekit/mvc/view/View.hx",28);
		HX_STACK_THIS(this);
		HX_STACK_LINE(30)
		if (((this->get_parent() != null()))){
			HX_STACK_LINE(31)
			this->get_parent()->removeChild(hx::ObjectPtr<OBJ_>(this));
		}
		HX_STACK_LINE(34)
		while(((this->get_numChildren() > (int)0))){
			HX_STACK_LINE(35)
			this->removeChildAt((int)0);
		}
		HX_STACK_LINE(39)
		this->_clear();
		HX_STACK_LINE(42)
		this->_dismissModel();
		HX_STACK_LINE(45)
		this->_model = null();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(View_obj,destroy,(void))


View_obj::View_obj()
{
}

void View_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(View);
	HX_MARK_MEMBER_NAME(_sizeHeight,"_sizeHeight");
	HX_MARK_MEMBER_NAME(_sizeWidth,"_sizeWidth");
	HX_MARK_MEMBER_NAME(_model,"_model");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void View_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(_sizeHeight,"_sizeHeight");
	HX_VISIT_MEMBER_NAME(_sizeWidth,"_sizeWidth");
	HX_VISIT_MEMBER_NAME(_model,"_model");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic View_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 5:
		if (HX_FIELD_EQ(inName,"model") ) { return get_model(); }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_clear") ) { return _clear_dyn(); }
		if (HX_FIELD_EQ(inName,"_model") ) { return _model; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"_resize") ) { return _resize_dyn(); }
		if (HX_FIELD_EQ(inName,"setSize") ) { return setSize_dyn(); }
		if (HX_FIELD_EQ(inName,"destroy") ) { return destroy_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"sizeWidth") ) { return get_sizeWidth(); }
		if (HX_FIELD_EQ(inName,"set_model") ) { return set_model_dyn(); }
		if (HX_FIELD_EQ(inName,"get_model") ) { return get_model_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"sizeHeight") ) { return get_sizeHeight(); }
		if (HX_FIELD_EQ(inName,"_sizeWidth") ) { return _sizeWidth; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_applyModel") ) { return _applyModel_dyn(); }
		if (HX_FIELD_EQ(inName,"_sizeHeight") ) { return _sizeHeight; }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"set_sizeWidth") ) { return set_sizeWidth_dyn(); }
		if (HX_FIELD_EQ(inName,"get_sizeWidth") ) { return get_sizeWidth_dyn(); }
		if (HX_FIELD_EQ(inName,"_dismissModel") ) { return _dismissModel_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"set_sizeHeight") ) { return set_sizeHeight_dyn(); }
		if (HX_FIELD_EQ(inName,"get_sizeHeight") ) { return get_sizeHeight_dyn(); }
		if (HX_FIELD_EQ(inName,"_onModelChange") ) { return _onModelChange_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic View_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 5:
		if (HX_FIELD_EQ(inName,"model") ) { return set_model(inValue); }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_model") ) { _model=inValue.Cast< ::com::gamekit::mvc::model::Model >(); return inValue; }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"sizeWidth") ) { return set_sizeWidth(inValue); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"sizeHeight") ) { return set_sizeHeight(inValue); }
		if (HX_FIELD_EQ(inName,"_sizeWidth") ) { _sizeWidth=inValue.Cast< Float >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_sizeHeight") ) { _sizeHeight=inValue.Cast< Float >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void View_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("sizeHeight"));
	outFields->push(HX_CSTRING("sizeWidth"));
	outFields->push(HX_CSTRING("model"));
	outFields->push(HX_CSTRING("_sizeHeight"));
	outFields->push(HX_CSTRING("_sizeWidth"));
	outFields->push(HX_CSTRING("_model"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("set_sizeHeight"),
	HX_CSTRING("get_sizeHeight"),
	HX_CSTRING("set_sizeWidth"),
	HX_CSTRING("get_sizeWidth"),
	HX_CSTRING("set_model"),
	HX_CSTRING("get_model"),
	HX_CSTRING("_onModelChange"),
	HX_CSTRING("_dismissModel"),
	HX_CSTRING("_applyModel"),
	HX_CSTRING("_clear"),
	HX_CSTRING("_resize"),
	HX_CSTRING("setSize"),
	HX_CSTRING("destroy"),
	HX_CSTRING("_sizeHeight"),
	HX_CSTRING("_sizeWidth"),
	HX_CSTRING("_model"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(View_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(View_obj::__mClass,"__mClass");
};

Class View_obj::__mClass;

void View_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.gamekit.mvc.view.View"), hx::TCanCast< View_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void View_obj::__boot()
{
}

} // end namespace com
} // end namespace gamekit
} // end namespace mvc
} // end namespace view
