#ifndef INCLUDED_com_gamekit_core_IDestroyable
#define INCLUDED_com_gamekit_core_IDestroyable

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
namespace com{
namespace gamekit{
namespace core{


class HXCPP_CLASS_ATTRIBUTES  IDestroyable_obj : public hx::Interface{
	public:
		typedef hx::Interface super;
		typedef IDestroyable_obj OBJ_;
		HX_DO_INTERFACE_RTTI;
		static void __boot();
virtual Void destroy( )=0;
		Dynamic destroy_dyn();
};

#define DELEGATE_com_gamekit_core_IDestroyable \
virtual Void destroy( ) { return mDelegate->destroy();}  \
virtual Dynamic destroy_dyn() { return mDelegate->destroy_dyn();}  \


template<typename IMPL>
class IDestroyable_delegate_ : public IDestroyable_obj
{
	protected:
		IMPL *mDelegate;
	public:
		IDestroyable_delegate_(IMPL *inDelegate) : mDelegate(inDelegate) {}
		hx::Object *__GetRealObject() { return mDelegate; }
		void __Visit(HX_VISIT_PARAMS) { HX_VISIT_OBJECT(mDelegate); }
		DELEGATE_com_gamekit_core_IDestroyable
};

} // end namespace com
} // end namespace gamekit
} // end namespace core

#endif /* INCLUDED_com_gamekit_core_IDestroyable */ 
