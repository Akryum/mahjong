#ifndef INCLUDED_tjson_FancyStyle
#define INCLUDED_tjson_FancyStyle

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <tjson/EncodeStyle.h>
HX_DECLARE_CLASS1(tjson,EncodeStyle)
HX_DECLARE_CLASS1(tjson,FancyStyle)
namespace tjson{


class HXCPP_CLASS_ATTRIBUTES  FancyStyle_obj : public hx::Object{
	public:
		typedef hx::Object super;
		typedef FancyStyle_obj OBJ_;
		FancyStyle_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< FancyStyle_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~FancyStyle_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		inline operator ::tjson::EncodeStyle_obj *()
			{ return new ::tjson::EncodeStyle_delegate_< FancyStyle_obj >(this); }
		hx::Object *__ToInterface(const hx::type_info &inType);
		::String __ToString() const { return HX_CSTRING("FancyStyle"); }

		virtual ::String charTimesN( ::String str,int n);
		Dynamic charTimesN_dyn();

		virtual ::String keyValueSeperator( int depth);
		Dynamic keyValueSeperator_dyn();

		virtual ::String entrySeperator( int depth);
		Dynamic entrySeperator_dyn();

		virtual ::String firstEntry( int depth);
		Dynamic firstEntry_dyn();

		virtual ::String endArray( int depth);
		Dynamic endArray_dyn();

		virtual ::String beginArray( int depth);
		Dynamic beginArray_dyn();

		virtual ::String endObject( int depth);
		Dynamic endObject_dyn();

		virtual ::String beginObject( int depth);
		Dynamic beginObject_dyn();

};

} // end namespace tjson

#endif /* INCLUDED_tjson_FancyStyle */ 
