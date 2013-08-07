#include <hxcpp.h>

#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#include <com/gamekit/core/IJsonParsable.h>
#endif
namespace com{
namespace gamekit{
namespace core{

HX_DEFINE_DYNAMIC_FUNC1(IJsonParsable_obj,parseJson,)


static ::String sMemberFields[] = {
	HX_CSTRING("parseJson"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(IJsonParsable_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(IJsonParsable_obj::__mClass,"__mClass");
};

Class IJsonParsable_obj::__mClass;

void IJsonParsable_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.gamekit.core.IJsonParsable"), hx::TCanCast< IJsonParsable_obj> ,0,sMemberFields,
	0, 0,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void IJsonParsable_obj::__boot()
{
}

} // end namespace com
} // end namespace gamekit
} // end namespace core
