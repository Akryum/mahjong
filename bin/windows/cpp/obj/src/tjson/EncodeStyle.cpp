#include <hxcpp.h>

#ifndef INCLUDED_tjson_EncodeStyle
#include <tjson/EncodeStyle.h>
#endif
namespace tjson{

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,keyValueSeperator,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,entrySeperator,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,firstEntry,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,endArray,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,beginArray,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,endObject,return )

HX_DEFINE_DYNAMIC_FUNC1(EncodeStyle_obj,beginObject,return )


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
	HX_MARK_MEMBER_NAME(EncodeStyle_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(EncodeStyle_obj::__mClass,"__mClass");
};

Class EncodeStyle_obj::__mClass;

void EncodeStyle_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("tjson.EncodeStyle"), hx::TCanCast< EncodeStyle_obj> ,0,sMemberFields,
	0, 0,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void EncodeStyle_obj::__boot()
{
}

} // end namespace tjson
