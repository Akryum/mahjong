#ifndef INCLUDED_tjson_EncodeStyle
#define INCLUDED_tjson_EncodeStyle

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

HX_DECLARE_CLASS1(tjson,EncodeStyle)
namespace tjson{


class HXCPP_CLASS_ATTRIBUTES  EncodeStyle_obj : public hx::Interface{
	public:
		typedef hx::Interface super;
		typedef EncodeStyle_obj OBJ_;
		HX_DO_INTERFACE_RTTI;
		static void __boot();
virtual ::String keyValueSeperator( int depth)=0;
		Dynamic keyValueSeperator_dyn();
virtual ::String entrySeperator( int depth)=0;
		Dynamic entrySeperator_dyn();
virtual ::String firstEntry( int depth)=0;
		Dynamic firstEntry_dyn();
virtual ::String endArray( int depth)=0;
		Dynamic endArray_dyn();
virtual ::String beginArray( int depth)=0;
		Dynamic beginArray_dyn();
virtual ::String endObject( int depth)=0;
		Dynamic endObject_dyn();
virtual ::String beginObject( int depth)=0;
		Dynamic beginObject_dyn();
};

#define DELEGATE_tjson_EncodeStyle \
virtual ::String keyValueSeperator( int depth) { return mDelegate->keyValueSeperator(depth);}  \
virtual Dynamic keyValueSeperator_dyn() { return mDelegate->keyValueSeperator_dyn();}  \
virtual ::String entrySeperator( int depth) { return mDelegate->entrySeperator(depth);}  \
virtual Dynamic entrySeperator_dyn() { return mDelegate->entrySeperator_dyn();}  \
virtual ::String firstEntry( int depth) { return mDelegate->firstEntry(depth);}  \
virtual Dynamic firstEntry_dyn() { return mDelegate->firstEntry_dyn();}  \
virtual ::String endArray( int depth) { return mDelegate->endArray(depth);}  \
virtual Dynamic endArray_dyn() { return mDelegate->endArray_dyn();}  \
virtual ::String beginArray( int depth) { return mDelegate->beginArray(depth);}  \
virtual Dynamic beginArray_dyn() { return mDelegate->beginArray_dyn();}  \
virtual ::String endObject( int depth) { return mDelegate->endObject(depth);}  \
virtual Dynamic endObject_dyn() { return mDelegate->endObject_dyn();}  \
virtual ::String beginObject( int depth) { return mDelegate->beginObject(depth);}  \
virtual Dynamic beginObject_dyn() { return mDelegate->beginObject_dyn();}  \


template<typename IMPL>
class EncodeStyle_delegate_ : public EncodeStyle_obj
{
	protected:
		IMPL *mDelegate;
	public:
		EncodeStyle_delegate_(IMPL *inDelegate) : mDelegate(inDelegate) {}
		hx::Object *__GetRealObject() { return mDelegate; }
		void __Visit(HX_VISIT_PARAMS) { HX_VISIT_OBJECT(mDelegate); }
		DELEGATE_tjson_EncodeStyle
};

} // end namespace tjson

#endif /* INCLUDED_tjson_EncodeStyle */ 
