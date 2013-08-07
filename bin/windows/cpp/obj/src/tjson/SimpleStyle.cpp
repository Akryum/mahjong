#include <hxcpp.h>

#ifndef INCLUDED_tjson_EncodeStyle
#include <tjson/EncodeStyle.h>
#endif
#ifndef INCLUDED_tjson_SimpleStyle
#include <tjson/SimpleStyle.h>
#endif
namespace tjson{

Void SimpleStyle_obj::__construct()
{
HX_STACK_PUSH("SimpleStyle::new","tjson/TJSON.hx",356);
{
}
;
	return null();
}

SimpleStyle_obj::~SimpleStyle_obj() { }

Dynamic SimpleStyle_obj::__CreateEmpty() { return  new SimpleStyle_obj; }
hx::ObjectPtr< SimpleStyle_obj > SimpleStyle_obj::__new()
{  hx::ObjectPtr< SimpleStyle_obj > result = new SimpleStyle_obj();
	result->__construct();
	return result;}

Dynamic SimpleStyle_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< SimpleStyle_obj > result = new SimpleStyle_obj();
	result->__construct();
	return result;}

hx::Object *SimpleStyle_obj::__ToInterface(const hx::type_info &inType) {
	if (inType==typeid( ::tjson::EncodeStyle_obj)) return operator ::tjson::EncodeStyle_obj *();
	return super::__ToInterface(inType);
}

::String SimpleStyle_obj::keyValueSeperator( int depth){
	HX_STACK_PUSH("SimpleStyle::keyValueSeperator","tjson/TJSON.hx",377);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(377)
	return HX_CSTRING(":");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,keyValueSeperator,return )

::String SimpleStyle_obj::entrySeperator( int depth){
	HX_STACK_PUSH("SimpleStyle::entrySeperator","tjson/TJSON.hx",374);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(374)
	return HX_CSTRING(",");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,entrySeperator,return )

::String SimpleStyle_obj::firstEntry( int depth){
	HX_STACK_PUSH("SimpleStyle::firstEntry","tjson/TJSON.hx",371);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(371)
	return HX_CSTRING("");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,firstEntry,return )

::String SimpleStyle_obj::endArray( int depth){
	HX_STACK_PUSH("SimpleStyle::endArray","tjson/TJSON.hx",368);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(368)
	return HX_CSTRING("]");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,endArray,return )

::String SimpleStyle_obj::beginArray( int depth){
	HX_STACK_PUSH("SimpleStyle::beginArray","tjson/TJSON.hx",365);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(365)
	return HX_CSTRING("[");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,beginArray,return )

::String SimpleStyle_obj::endObject( int depth){
	HX_STACK_PUSH("SimpleStyle::endObject","tjson/TJSON.hx",362);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(362)
	return HX_CSTRING("}");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,endObject,return )

::String SimpleStyle_obj::beginObject( int depth){
	HX_STACK_PUSH("SimpleStyle::beginObject","tjson/TJSON.hx",359);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(359)
	return HX_CSTRING("{");
}


HX_DEFINE_DYNAMIC_FUNC1(SimpleStyle_obj,beginObject,return )


SimpleStyle_obj::SimpleStyle_obj()
{
}

void SimpleStyle_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(SimpleStyle);
	HX_MARK_END_CLASS();
}

void SimpleStyle_obj::__Visit(HX_VISIT_PARAMS)
{
}

Dynamic SimpleStyle_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 8:
		if (HX_FIELD_EQ(inName,"endArray") ) { return endArray_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"endObject") ) { return endObject_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"firstEntry") ) { return firstEntry_dyn(); }
		if (HX_FIELD_EQ(inName,"beginArray") ) { return beginArray_dyn(); }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"beginObject") ) { return beginObject_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"entrySeperator") ) { return entrySeperator_dyn(); }
		break;
	case 17:
		if (HX_FIELD_EQ(inName,"keyValueSeperator") ) { return keyValueSeperator_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic SimpleStyle_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	return super::__SetField(inName,inValue,inCallProp);
}

void SimpleStyle_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("keyValueSeperator"),
	HX_CSTRING("entrySeperator"),
	HX_CSTRING("firstEntry"),
	HX_CSTRING("endArray"),
	HX_CSTRING("beginArray"),
	HX_CSTRING("endObject"),
	HX_CSTRING("beginObject"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(SimpleStyle_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(SimpleStyle_obj::__mClass,"__mClass");
};

Class SimpleStyle_obj::__mClass;

void SimpleStyle_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("tjson.SimpleStyle"), hx::TCanCast< SimpleStyle_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void SimpleStyle_obj::__boot()
{
}

} // end namespace tjson
