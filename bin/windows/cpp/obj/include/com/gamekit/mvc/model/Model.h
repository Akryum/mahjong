#ifndef INCLUDED_com_gamekit_mvc_model_Model
#define INCLUDED_com_gamekit_mvc_model_Model

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <flash/events/EventDispatcher.h>
#include <com/gamekit/core/IJsonParsable.h>
#include <com/gamekit/core/IDestroyable.h>
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
HX_DECLARE_CLASS4(com,gamekit,mvc,model,Model)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
namespace com{
namespace gamekit{
namespace mvc{
namespace model{


class HXCPP_CLASS_ATTRIBUTES  Model_obj : public ::flash::events::EventDispatcher_obj{
	public:
		typedef ::flash::events::EventDispatcher_obj super;
		typedef Model_obj OBJ_;
		Model_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< Model_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~Model_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		inline operator ::com::gamekit::core::IJsonParsable_obj *()
			{ return new ::com::gamekit::core::IJsonParsable_delegate_< Model_obj >(this); }
		inline operator ::com::gamekit::core::IDestroyable_obj *()
			{ return new ::com::gamekit::core::IDestroyable_delegate_< Model_obj >(this); }
		hx::Object *__ToInterface(const hx::type_info &inType);
		::String __ToString() const { return HX_CSTRING("Model"); }

		virtual ::String set_name( ::String value);
		Dynamic set_name_dyn();

		virtual ::String get_name( );
		Dynamic get_name_dyn();

		virtual Void _parseJson( Dynamic data);
		Dynamic _parseJson_dyn();

		virtual Void _update( );
		Dynamic _update_dyn();

		virtual Void update( );
		Dynamic update_dyn();

		virtual Void parseJson( Dynamic data);
		Dynamic parseJson_dyn();

		virtual Void destroy( );
		Dynamic destroy_dyn();

		::String _name;
};

} // end namespace com
} // end namespace gamekit
} // end namespace mvc
} // end namespace model

#endif /* INCLUDED_com_gamekit_mvc_model_Model */ 
