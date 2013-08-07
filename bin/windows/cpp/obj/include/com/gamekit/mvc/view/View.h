#ifndef INCLUDED_com_gamekit_mvc_view_View
#define INCLUDED_com_gamekit_mvc_view_View

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <flash/display/Sprite.h>
#include <com/gamekit/core/IDestroyable.h>
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
HX_DECLARE_CLASS4(com,gamekit,mvc,model,Model)
HX_DECLARE_CLASS4(com,gamekit,mvc,view,View)
HX_DECLARE_CLASS2(flash,display,DisplayObject)
HX_DECLARE_CLASS2(flash,display,DisplayObjectContainer)
HX_DECLARE_CLASS2(flash,display,IBitmapDrawable)
HX_DECLARE_CLASS2(flash,display,InteractiveObject)
HX_DECLARE_CLASS2(flash,display,Sprite)
HX_DECLARE_CLASS2(flash,events,Event)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
namespace com{
namespace gamekit{
namespace mvc{
namespace view{


class HXCPP_CLASS_ATTRIBUTES  View_obj : public ::flash::display::Sprite_obj{
	public:
		typedef ::flash::display::Sprite_obj super;
		typedef View_obj OBJ_;
		View_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< View_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~View_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		inline operator ::com::gamekit::core::IDestroyable_obj *()
			{ return new ::com::gamekit::core::IDestroyable_delegate_< View_obj >(this); }
		hx::Object *__ToInterface(const hx::type_info &inType);
		::String __ToString() const { return HX_CSTRING("View"); }

		virtual Float set_sizeHeight( Float value);
		Dynamic set_sizeHeight_dyn();

		virtual Float get_sizeHeight( );
		Dynamic get_sizeHeight_dyn();

		virtual Float set_sizeWidth( Float value);
		Dynamic set_sizeWidth_dyn();

		virtual Float get_sizeWidth( );
		Dynamic get_sizeWidth_dyn();

		virtual ::com::gamekit::mvc::model::Model set_model( ::com::gamekit::mvc::model::Model value);
		Dynamic set_model_dyn();

		virtual ::com::gamekit::mvc::model::Model get_model( );
		Dynamic get_model_dyn();

		virtual Void _onModelChange( ::flash::events::Event e);
		Dynamic _onModelChange_dyn();

		virtual Void _dismissModel( );
		Dynamic _dismissModel_dyn();

		virtual Void _applyModel( );
		Dynamic _applyModel_dyn();

		virtual Void _clear( );
		Dynamic _clear_dyn();

		virtual Void _resize( );
		Dynamic _resize_dyn();

		virtual Void setSize( Float width,Float height);
		Dynamic setSize_dyn();

		virtual Void destroy( );
		Dynamic destroy_dyn();

		Float _sizeHeight;
		Float _sizeWidth;
		::com::gamekit::mvc::model::Model _model;
};

} // end namespace com
} // end namespace gamekit
} // end namespace mvc
} // end namespace view

#endif /* INCLUDED_com_gamekit_mvc_view_View */ 
