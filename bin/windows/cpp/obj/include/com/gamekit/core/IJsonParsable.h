#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#define INCLUDED_com_gamekit_core_IJsonParsable

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
namespace com{
namespace gamekit{
namespace core{


class HXCPP_CLASS_ATTRIBUTES  IJsonParsable_obj : public hx::Interface{
	public:
		typedef hx::Interface super;
		typedef IJsonParsable_obj OBJ_;
		HX_DO_INTERFACE_RTTI;
		static void __boot();
virtual Void parseJson( Dynamic json)=0;
		Dynamic parseJson_dyn();
};

#define DELEGATE_com_gamekit_core_IJsonParsable \
virtual Void parseJson( Dynamic json) { return mDelegate->parseJson(json);}  \
virtual Dynamic parseJson_dyn() { return mDelegate->parseJson_dyn();}  \


template<typename IMPL>
class IJsonParsable_delegate_ : public IJsonParsable_obj
{
	protected:
		IMPL *mDelegate;
	public:
		IJsonParsable_delegate_(IMPL *inDelegate) : mDelegate(inDelegate) {}
		hx::Object *__GetRealObject() { return mDelegate; }
		void __Visit(HX_VISIT_PARAMS) { HX_VISIT_OBJECT(mDelegate); }
		DELEGATE_com_gamekit_core_IJsonParsable
};

} // end namespace com
} // end namespace gamekit
} // end namespace core

#endif /* INCLUDED_com_gamekit_core_IJsonParsable */ 
