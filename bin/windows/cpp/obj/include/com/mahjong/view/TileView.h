#ifndef INCLUDED_com_mahjong_view_TileView
#define INCLUDED_com_mahjong_view_TileView

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <com/gamekit/mvc/view/View.h>
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
HX_DECLARE_CLASS3(com,gamekit,display,BitmapLoader)
HX_DECLARE_CLASS4(com,gamekit,mvc,model,Model)
HX_DECLARE_CLASS4(com,gamekit,mvc,view,View)
HX_DECLARE_CLASS3(com,mahjong,model,TileModel)
HX_DECLARE_CLASS3(com,mahjong,view,TileView)
HX_DECLARE_CLASS2(flash,display,Bitmap)
HX_DECLARE_CLASS2(flash,display,BitmapData)
HX_DECLARE_CLASS2(flash,display,DisplayObject)
HX_DECLARE_CLASS2(flash,display,DisplayObjectContainer)
HX_DECLARE_CLASS2(flash,display,IBitmapDrawable)
HX_DECLARE_CLASS2(flash,display,InteractiveObject)
HX_DECLARE_CLASS2(flash,display,Shape)
HX_DECLARE_CLASS2(flash,display,Sprite)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
HX_DECLARE_CLASS2(flash,text,TextField)
namespace com{
namespace mahjong{
namespace view{


class HXCPP_CLASS_ATTRIBUTES  TileView_obj : public ::com::gamekit::mvc::view::View_obj{
	public:
		typedef ::com::gamekit::mvc::view::View_obj super;
		typedef TileView_obj OBJ_;
		TileView_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< TileView_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~TileView_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("TileView"); }

		::com::mahjong::model::TileModel tileModel;
		virtual ::com::mahjong::model::TileModel get_tileModel( );
		Dynamic get_tileModel_dyn();

		virtual Void _updateImagePosition( );
		Dynamic _updateImagePosition_dyn();

		virtual Void _showImage( ::flash::display::BitmapData data);
		Dynamic _showImage_dyn();

		virtual Void _drawBackground( );
		Dynamic _drawBackground_dyn();

		virtual Void _resize( );

		virtual Void _applyModel( );

		virtual Void destroy( );

		::com::gamekit::display::BitmapLoader _imageLoader;
		::flash::display::Bitmap _image;
		::flash::text::TextField _label;
		::flash::display::Shape _background;
		::com::mahjong::model::TileModel _tileModel;
};

} // end namespace com
} // end namespace mahjong
} // end namespace view

#endif /* INCLUDED_com_mahjong_view_TileView */ 
