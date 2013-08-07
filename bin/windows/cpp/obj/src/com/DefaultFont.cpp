#include <hxcpp.h>

#ifndef INCLUDED_com_DefaultFont
#include <com/DefaultFont.h>
#endif
#ifndef INCLUDED_flash_text_Font
#include <flash/text/Font.h>
#endif
#ifndef INCLUDED_flash_text_FontStyle
#include <flash/text/FontStyle.h>
#endif
#ifndef INCLUDED_flash_text_FontType
#include <flash/text/FontType.h>
#endif
namespace com{

Void DefaultFont_obj::__construct(::String __o_filename,::flash::text::FontStyle style,::flash::text::FontType type)
{
HX_STACK_PUSH("DefaultFont::new","com/App.hx",9);
::String filename = __o_filename.Default(HX_CSTRING(""));
{
	HX_STACK_LINE(9)
	super::__construct(filename,style,type);
}
;
	return null();
}

DefaultFont_obj::~DefaultFont_obj() { }

Dynamic DefaultFont_obj::__CreateEmpty() { return  new DefaultFont_obj; }
hx::ObjectPtr< DefaultFont_obj > DefaultFont_obj::__new(::String __o_filename,::flash::text::FontStyle style,::flash::text::FontType type)
{  hx::ObjectPtr< DefaultFont_obj > result = new DefaultFont_obj();
	result->__construct(__o_filename,style,type);
	return result;}

Dynamic DefaultFont_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< DefaultFont_obj > result = new DefaultFont_obj();
	result->__construct(inArgs[0],inArgs[1],inArgs[2]);
	return result;}

::String DefaultFont_obj::resourceName;


DefaultFont_obj::DefaultFont_obj()
{
}

void DefaultFont_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(DefaultFont);
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void DefaultFont_obj::__Visit(HX_VISIT_PARAMS)
{
	super::__Visit(HX_VISIT_ARG);
}

Dynamic DefaultFont_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 12:
		if (HX_FIELD_EQ(inName,"resourceName") ) { return resourceName; }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic DefaultFont_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 12:
		if (HX_FIELD_EQ(inName,"resourceName") ) { resourceName=inValue.Cast< ::String >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void DefaultFont_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("resourceName"),
	String(null()) };

static ::String sMemberFields[] = {
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(DefaultFont_obj::__mClass,"__mClass");
	HX_MARK_MEMBER_NAME(DefaultFont_obj::resourceName,"resourceName");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(DefaultFont_obj::__mClass,"__mClass");
	HX_VISIT_MEMBER_NAME(DefaultFont_obj::resourceName,"resourceName");
};

Class DefaultFont_obj::__mClass;

void DefaultFont_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.DefaultFont"), hx::TCanCast< DefaultFont_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void DefaultFont_obj::__boot()
{
	resourceName= HX_CSTRING("NME_font_com_DefaultFont");
}

} // end namespace com
