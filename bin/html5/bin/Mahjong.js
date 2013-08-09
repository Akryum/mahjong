(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	try {
		if(Reflect.hasField(js.Browser.window,"winParameters")) flash.Lib.get_current().loaderInfo.parameters = (Reflect.field(js.Browser.window,"winParameters"))();
		flash.Lib.get_current().get_stage().loaderInfo = flash.Lib.get_current().loaderInfo;
	} catch( e ) {
	}
	ApplicationMain.preloader = new NMEPreloader();
	flash.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var resourcePrefix = "NME_:bitmap_";
	var _g = 0, _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader = ApplicationMain.loaders.get(path);
			loader.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader.load(new flash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new flash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(Main,"main") == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.field(Main,"main").apply(Main,[]);
}
var flash = {}
flash.events = {}
flash.events.IEventDispatcher = function() { }
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	__class__: flash.events.IEventDispatcher
}
flash.events.EventDispatcher = function(target) {
	if(target != null) this.nmeTarget = target; else this.nmeTarget = this;
	this.nmeEventMap = [];
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
flash.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,setList: function(type,list) {
		this.nmeEventMap[type] = list;
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,getList: function(type) {
		return this.nmeEventMap[type];
	}
	,existList: function(type) {
		return this.nmeEventMap != null && this.nmeEventMap[type] != undefined;
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.nmeTarget;
		var capture = event.eventPhase == flash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.nmeGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new flash.events.Listener(inListener,capture,priority));
		list.sort(flash.events.EventDispatcher.compareListeners);
	}
	,__class__: flash.events.EventDispatcher
}
flash.display = {}
flash.display.IBitmapDrawable = function() { }
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	__class__: flash.display.IBitmapDrawable
}
flash.display.DisplayObject = function() {
	flash.events.EventDispatcher.call(this,null);
	this._nmeId = flash.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new flash.geom.Transform(this));
	this.nmeX = 0.0;
	this.nmeY = 0.0;
	this.nmeScaleX = 1.0;
	this.nmeScaleY = 1.0;
	this.nmeRotation = 0.0;
	this.nmeWidth = 0.0;
	this.nmeHeight = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.nmeFilters = new Array();
	this.nmeBoundsRect = new flash.geom.Rectangle();
	this.nmeScrollRect = null;
	this.nmeMask = null;
	this.nmeMaskingObj = null;
	this.set_nmeCombinedVisible(this.get_visible());
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.DisplayObject.__super__ = flash.events.EventDispatcher;
flash.display.DisplayObject.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeSrUpdateDivs: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null || this.parent == null) return;
		if(this.nmeScrollRect == null) {
			if(this._srAxes != null && gfx.nmeSurface.parentNode == this._srAxes && this._srWindow.parentNode != null) this._srWindow.parentNode.replaceChild(gfx.nmeSurface,this._srWindow);
			return;
		}
		if(this._srWindow == null) {
			this._srWindow = js.Browser.document.createElement("div");
			this._srAxes = js.Browser.document.createElement("div");
			this._srWindow.style.setProperty("position","absolute","");
			this._srWindow.style.setProperty("left","0px","");
			this._srWindow.style.setProperty("top","0px","");
			this._srWindow.style.setProperty("width","0px","");
			this._srWindow.style.setProperty("height","0px","");
			this._srWindow.style.setProperty("overflow","hidden","");
			this._srAxes.style.setProperty("position","absolute","");
			this._srAxes.style.setProperty("left","0px","");
			this._srAxes.style.setProperty("top","0px","");
			this._srWindow.appendChild(this._srAxes);
		}
		var pnt = this.parent.localToGlobal(new flash.geom.Point(this.get_x(),this.get_y()));
		this._srWindow.style.left = pnt.x + "px";
		this._srWindow.style.top = pnt.y + "px";
		this._srWindow.style.width = this.nmeScrollRect.width + "px";
		this._srWindow.style.height = this.nmeScrollRect.height + "px";
		this._srAxes.style.left = -pnt.x - this.nmeScrollRect.x + "px";
		this._srAxes.style.top = -pnt.y - this.nmeScrollRect.y + "px";
		if(gfx.nmeSurface.parentNode != this._srAxes && gfx.nmeSurface.parentNode != null) {
			gfx.nmeSurface.parentNode.insertBefore(this._srWindow,gfx.nmeSurface);
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			this._srAxes.appendChild(gfx.nmeSurface);
		}
	}
	,nmeGetSrWindow: function() {
		return this._srWindow;
	}
	,set_width: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var w = this.nmeBoundsRect.width;
		if(this.nmeScaleX * w != inValue) {
			if(w == 0) {
				this.nmeScaleX = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				w = this.nmeBoundsRect.width;
			}
			if(w <= 0) return 0;
			this.nmeScaleX = inValue / w;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_width: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeWidth;
	}
	,set_y: function(inValue) {
		if(this.nmeY != inValue) {
			this.nmeY = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_y: function() {
		return this.nmeY;
	}
	,set_x: function(inValue) {
		if(this.nmeX != inValue) {
			this.nmeX = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_x: function() {
		return this.nmeX;
	}
	,set_visible: function(inValue) {
		if(this.nmeVisible != inValue) {
			this.nmeVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeVisible;
	}
	,get_visible: function() {
		return this.nmeVisible;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this.nmeInvalidateMatrix(true);
		return inValue;
	}
	,get__topmostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,get_stage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return flash.Lib.nmeGetStage();
		return null;
	}
	,set_scrollRect: function(inValue) {
		this.nmeScrollRect = inValue;
		this.nmeSrUpdateDivs();
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.nmeScrollRect == null) return null;
		return this.nmeScrollRect.clone();
	}
	,set_scaleY: function(inValue) {
		if(this.nmeScaleY != inValue) {
			this.nmeScaleY = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.nmeScaleY;
	}
	,set_scaleX: function(inValue) {
		if(this.nmeScaleX != inValue) {
			this.nmeScaleX = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.nmeScaleX;
	}
	,set_rotation: function(inValue) {
		if(this.nmeRotation != inValue) {
			this.nmeRotation = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_rotation: function() {
		return this.nmeRotation;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.nmeInvalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.nmeChildren,this);
			this.parent.nmeInvalidateBounds();
		}
		if(inValue != null) {
			inValue._nmeRenderFlags |= 64;
			if(inValue.parent != null) inValue.parent._nmeRenderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,set_nmeCombinedVisible: function(inValue) {
		if(this.nmeCombinedVisible != inValue) {
			this.nmeCombinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeCombinedVisible;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new flash.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new flash.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,get__matrixInvalid: function() {
		return (this._nmeRenderFlags & 4) != 0;
	}
	,get__matrixChainInvalid: function() {
		return (this._nmeRenderFlags & 8) != 0;
	}
	,set_mask: function(inValue) {
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = null;
		this.nmeMask = inValue;
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = this;
		return this.nmeMask;
	}
	,get_mask: function() {
		return this.nmeMask;
	}
	,set_height: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var h = this.nmeBoundsRect.height;
		if(this.nmeScaleY * h != inValue) {
			if(h == 0) {
				this.nmeScaleY = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				h = this.nmeBoundsRect.height;
			}
			if(h <= 0) return 0;
			this.nmeScaleY = inValue / h;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_height: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeHeight;
	}
	,set_filters: function(filters) {
		var oldFilterCount = this.nmeFilters == null?0:this.nmeFilters.length;
		if(filters == null) {
			this.nmeFilters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.nmeFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.nmeFilters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,get__boundsInvalid: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return (this._nmeRenderFlags & 64) != 0; else return (this._nmeRenderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,get_filters: function() {
		if(this.nmeFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.nmeFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__bottommostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,__contains: function(child) {
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			var gfx = this.nmeGetGraphics();
			if(gfx == null) {
				this.nmeBoundsRect.x = this.get_x();
				this.nmeBoundsRect.y = this.get_y();
				this.nmeBoundsRect.width = 0;
				this.nmeBoundsRect.height = 0;
			} else {
				this.nmeBoundsRect = gfx.nmeExtent.clone();
				if(this.scale9Grid != null) {
					this.nmeBoundsRect.width *= this.nmeScaleX;
					this.nmeBoundsRect.height *= this.nmeScaleY;
					this.nmeWidth = this.nmeBoundsRect.width;
					this.nmeHeight = this.nmeBoundsRect.height;
				} else {
					this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
					this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
				}
				gfx.boundsDirty = false;
			}
			this._nmeRenderFlags &= -65;
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && gfx.nmeSurface != null) flash.Lib.nmeSetSurfaceVisible(gfx.nmeSurface,inValue);
	}
	,nmeValidateMatrix: function() {
		var parentMatrixInvalid = (this._nmeRenderFlags & 8) != 0 && this.parent != null;
		if((this._nmeRenderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.nmeValidateMatrix();
			var m = this.transform.get_matrix();
			if((this._nmeRenderFlags & 16) != 0) this._nmeRenderFlags &= -5;
			if((this._nmeRenderFlags & 4) != 0) {
				m.identity();
				m.scale(this.nmeScaleX,this.nmeScaleY);
				var rad = this.nmeRotation * flash.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.nmeX,this.nmeY);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.nmeGetFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.nmeGetFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.nmeSetFullMatrix(fm);
				this._nmeRenderFlags |= 32;
			}
			this._nmeRenderFlags &= -29;
		}
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && lastMoveObj != null && this != lastMoveObj) {
			var ogfx = lastMoveObj.nmeGetGraphics();
			if(ogfx != null) flash.Lib.nmeSetSurfaceZIndexAfter(this.nmeScrollRect == null?gfx.nmeSurface:this._srWindow,lastMoveObj.nmeScrollRect == null?ogfx.nmeSurface:lastMoveObj == this.parent?ogfx.nmeSurface:lastMoveObj._srWindow);
		}
		if(gfx == null) return lastMoveObj; else return this;
	}
	,nmeTestFlag: function(mask) {
		return (this._nmeRenderFlags & mask) != 0;
	}
	,nmeSetMatrix: function(inValue) {
		this.transform._matrix.copy(inValue);
		return inValue;
	}
	,nmeSetFullMatrix: function(inValue) {
		return this.transform.nmeSetFullMatrix(inValue);
	}
	,nmeSetFlagToValue: function(mask,value) {
		if(value) this._nmeRenderFlags |= mask; else this._nmeRenderFlags &= ~mask;
	}
	,nmeSetFlag: function(mask) {
		this._nmeRenderFlags |= mask;
	}
	,nmeSetDimensions: function() {
		if(this.scale9Grid != null) {
			this.nmeBoundsRect.width *= this.nmeScaleX;
			this.nmeBoundsRect.height *= this.nmeScaleY;
			this.nmeWidth = this.nmeBoundsRect.width;
			this.nmeHeight = this.nmeBoundsRect.height;
		} else {
			this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
			this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(gfx.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(gfx.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			flash.Lib.nmeDrawToSurface(gfx.nmeSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,m);
				this._nmeRenderFlags &= -33;
				this.nmeSrUpdateDivs();
			}
			flash.Lib.nmeSetSurfaceOpacity(gfx.nmeSurface,fullAlpha);
		}
	}
	,nmeRemoveFromStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) {
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			var evt = new flash.events.Event(flash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,nmeMatrixOverridden: function() {
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this._nmeRenderFlags |= 16;
		this._nmeRenderFlags |= 4;
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeIsOnStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) return true;
		return false;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this._nmeRenderFlags |= 4; else this._nmeRenderFlags |= 8;
	}
	,nmeInvalidateBounds: function() {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeGetSurface: function() {
		var gfx = this.nmeGetGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.nmeSurface;
		return surface;
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeRender();
			var extX = gfx.nmeExtent.x;
			var extY = gfx.nmeExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX <= 0 || local.y - extY <= 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			if(gfx.nmeHitTest(local.x,local.y)) return this;
		}
		return null;
	}
	,nmeGetMatrix: function() {
		return this.transform.get_matrix();
	}
	,nmeGetInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(outStack);
	}
	,nmeGetGraphics: function() {
		return null;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		return this.transform.nmeGetFullMatrix(localMatrix);
	}
	,nmeFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.nmeSetPhase(flash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
		event.nmeSetPhase(flash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return;
		if(event.bubbles) {
			event.nmeSetPhase(flash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
	}
	,nmeDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return flash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,nmeClearFlag: function(mask) {
		this._nmeRenderFlags &= ~mask;
	}
	,nmeBroadcast: function(event) {
		this.nmeDispatchEvent(event);
	}
	,nmeApplyFilters: function(surface) {
		if(this.nmeFilters != null) {
			var _g = 0, _g1 = this.nmeFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.nmeApplyFilter(surface);
			}
		}
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if(newParent.nmeGetGraphics() != null) {
			flash.Lib.nmeSetSurfaceId(gfx.nmeSurface,this._nmeId);
			if(beforeSibling != null && beforeSibling.nmeGetGraphics() != null) flash.Lib.nmeAppendSurface(gfx.nmeSurface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.nmeChildren;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,flash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , flash.display.DisplayObjectContainer);
						if(container.nmeChildren.length > 0) nextSibling = container.nmeChildren[container.nmeChildren.length - 1]; else break;
					}
					if(nextSibling.nmeGetGraphics() != gfx) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,nextSibling.get__topmostSurface()); else flash.Lib.nmeAppendSurface(gfx.nmeSurface);
				}
			}
			flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,this.getSurfaceTransform(gfx));
		} else if(newParent.name == "Stage") flash.Lib.nmeAppendSurface(gfx.nmeSurface);
		if(this.nmeIsOnStage()) {
			this.nmeSrUpdateDivs();
			var evt = new flash.events.Event(flash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,localToGlobal: function(point) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).transformPoint(point);
	}
	,invalidateGraphics: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeChanged = true;
			gfx.nmeClearNextCycle = true;
		}
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		var boundingBox = shapeFlag == null?true:!shapeFlag;
		if(!boundingBox) return this.nmeGetObjectUnderPoint(new flash.geom.Point(x,y)) != null; else {
			var gfx = this.nmeGetGraphics();
			if(gfx != null) {
				var extX = gfx.nmeExtent.x;
				var extY = gfx.nmeExtent.y;
				var local = this.globalToLocal(new flash.geom.Point(x,y));
				if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return false; else return true;
			}
			return false;
		}
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,handleGraphicsUpdated: function(gfx) {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.nmeApplyFilters(gfx.nmeSurface);
		this._nmeRenderFlags |= 32;
	}
	,globalToLocal: function(inPos) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).invert().transformPoint(inPos);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,getScreenBounds: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeBoundsRect.clone();
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.get__boundsInvalid()) this.validateBounds();
		var m = this.transform.nmeGetFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.nmeGetFullMatrix(null).invert());
		var rect = this.nmeBoundsRect.transform(m);
		return rect;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.nmeRender(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,dispatchEvent: function(event) {
		var result = this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,__class__: flash.display.DisplayObject
	,__properties__: {set_filters:"set_filters",get_filters:"get_filters",set_height:"set_height",get_height:"get_height",set_mask:"set_mask",get_mask:"get_mask",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",set_nmeCombinedVisible:"set_nmeCombinedVisible",set_parent:"set_parent",set_rotation:"set_rotation",get_rotation:"get_rotation",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",get_stage:"get_stage",set_transform:"set_transform",set_visible:"set_visible",get_visible:"get_visible",set_width:"set_width",get_width:"get_width",set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",get__bottommostSurface:"get__bottommostSurface",get__boundsInvalid:"get__boundsInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__matrixInvalid:"get__matrixInvalid",get__topmostSurface:"get__topmostSurface"}
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_tabIndex: function(inIndex) {
		return this.nmeTabIndex = inIndex;
	}
	,get_tabIndex: function() {
		return this.nmeTabIndex;
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,__class__: flash.display.InteractiveObject
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
flash.display.DisplayObjectContainer = function() {
	this.nmeChildren = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	flash.display.InteractiveObject.call(this);
	this.nmeCombinedAlpha = this.alpha;
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_scrollRect: function(inValue) {
		inValue = flash.display.InteractiveObject.prototype.set_scrollRect.call(this,inValue);
		this.nmeUnifyChildrenWithDOM();
		return inValue;
	}
	,set_visible: function(inVal) {
		this.set_nmeCombinedVisible(inVal);
		return flash.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,get_numChildren: function() {
		return this.nmeChildren.length;
	}
	,set_nmeCombinedVisible: function(inVal) {
		if(inVal != this.nmeCombinedVisible) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set_nmeCombinedVisible(child.get_visible() && inVal);
			}
		}
		return flash.display.InteractiveObject.prototype.set_nmeCombinedVisible.call(this,inVal);
	}
	,set_filters: function(filters) {
		flash.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,__contains: function(child) {
		if(child == null) return false;
		if(this == child) return true;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child || c.__contains(child)) return true;
		}
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this._nmeId + "]";
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.nmeChildren[child1];
		this.nmeChildren[child1] = this.nmeChildren[child2];
		this.nmeChildren[child2] = swap;
		swap = null;
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == child1) c1 = i; else if(this.nmeChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.nmeChildren[c1];
			this.nmeChildren[c1] = this.nmeChildren[c2];
			this.nmeChildren[c2] = swap;
			swap = null;
			this.nmeSwapSurface(c1,c2);
			child1.nmeUnifyChildrenWithDOM();
			child2.nmeUnifyChildrenWithDOM();
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.nmeChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in nmeChildren array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i + 1]);
				i++;
			}
		}
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeRemoveChild(this.nmeChildren[index]);
		throw "removeChildAt(" + index + ") : none found?";
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				child.nmeRemoveFromStage();
				child.set_parent(null);
				if($this.getChildIndex(child) >= 0) throw "Not removed properly";
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var obj = flash.display.InteractiveObject.prototype.nmeUnifyChildrenWithDOM.call(this,lastMoveObj);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			obj = child.nmeUnifyChildrenWithDOM(obj);
			if(child.get_scrollRect() != null) obj = child;
		}
		return obj;
	}
	,nmeSwapSurface: function(c1,c2) {
		if(this.nmeChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.nmeChildren.length;
		if(this.nmeChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.nmeChildren.length;
		var gfx1 = this.nmeChildren[c1].nmeGetGraphics();
		var gfx2 = this.nmeChildren[c2].nmeGetGraphics();
		if(gfx1 != null && gfx2 != null) flash.Lib.nmeSwapSurface(this.nmeChildren[c1].nmeScrollRect == null?gfx1.nmeSurface:this.nmeChildren[c1].nmeGetSrWindow(),this.nmeChildren[c2].nmeScrollRect == null?gfx2.nmeSurface:this.nmeChildren[c2].nmeGetSrWindow());
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeVisible) return;
		if(clipRect == null && this.nmeScrollRect != null) clipRect = this.nmeScrollRect;
		flash.display.InteractiveObject.prototype.nmeRender.call(this,inMask,clipRect);
		this.nmeCombinedAlpha = this.parent != null?this.parent.nmeCombinedAlpha * this.alpha:this.alpha;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeVisible) {
				if(clipRect != null) {
					if((child._nmeRenderFlags & 4) != 0 || (child._nmeRenderFlags & 8) != 0) child.nmeValidateMatrix();
				}
				child.nmeRender(inMask,clipRect);
			}
		}
		if(this.nmeAddedChildren) {
			this.nmeUnifyChildrenWithDOM();
			this.nmeAddedChildren = false;
		}
	}
	,nmeRemoveFromStage: function() {
		flash.display.InteractiveObject.prototype.nmeRemoveFromStage.call(this);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeRemoveFromStage();
		}
	}
	,nmeRemoveChild: function(child) {
		child.nmeRemoveFromStage();
		child.set_parent(null);
		if(this.getChildIndex(child) >= 0) throw "Not removed properly";
		return child;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this._nmeRenderFlags & 8) != 0) && !((this._nmeRenderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.nmeInvalidateMatrix();
			}
		}
		flash.display.InteractiveObject.prototype.nmeInvalidateMatrix.call(this,local);
	}
	,nmeGetObjectsUnderPoint: function(point,stack) {
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) stack.push(result);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return flash.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeBroadcast: function(event) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		flash.display.InteractiveObject.prototype.nmeAddToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeGetGraphics() == null || !child.nmeIsOnStage()) child.nmeAddToStage(this);
		}
	}
	,getObjectsUnderPoint: function(point) {
		var result = new Array();
		this.nmeGetObjectsUnderPoint(point,result);
		return result;
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == inChild) return i;
		}
		return -1;
	}
	,getChildByName: function(inName) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == inName) return child;
		}
		return null;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeChildren[index];
		throw "getChildAt : index out of bounds " + index + "/" + this.nmeChildren.length;
		return null;
	}
	,contains: function(child) {
		return this.__contains(child);
	}
	,addChildAt: function(object,index) {
		if(index > this.nmeChildren.length || index < 0) throw "Invalid index position " + index;
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.nmeChildren.length) return this.addChild(object); else {
			if(this.nmeIsOnStage()) object.nmeAddToStage(this,this.nmeChildren[index]);
			this.nmeChildren.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,this.nmeChildren.length - 1);
			return object;
		}
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == object) throw "Internal error: child already existed at index " + this.getChildIndex(object);
		}
		object.set_parent(this);
		if(this.nmeIsOnStage()) object.nmeAddToStage(this);
		if(this.nmeChildren == null) this.nmeChildren = new Array();
		this.nmeChildren.push(object);
		return object;
	}
	,__removeChild: function(child) {
		HxOverrides.remove(this.nmeChildren,child);
	}
	,__class__: flash.display.DisplayObjectContainer
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeGraphics = new flash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.nmeCursorCallbackOver != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
		if(this.nmeCursorCallbackOut != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		if(!cursor) flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default); else {
			this.nmeCursorCallbackOver = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Pointer);
			};
			this.nmeCursorCallbackOut = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default);
			};
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,get_graphics: function() {
		return this.nmeGraphics;
	}
	,get_dropTarget: function() {
		return this.nmeDropTarget;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stopDrag: function() {
		if(this.nmeIsOnStage()) {
			this.get_stage().nmeStopDrag(this);
			var l = this.parent.nmeChildren.length - 1;
			var obj = this.get_stage();
			var _g1 = 0, _g = this.parent.nmeChildren.length;
			while(_g1 < _g) {
				var i = _g1++;
				var result = this.parent.nmeChildren[l - i].nmeGetObjectUnderPoint(new flash.geom.Point(this.get_stage().get_mouseX(),this.get_stage().get_mouseY()));
				if(result != null) obj = result;
			}
			if(obj != this) this.nmeDropTarget = obj; else this.nmeDropTarget = this.get_stage();
		}
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.nmeIsOnStage()) this.get_stage().nmeStartDrag(this,lockCenter,bounds);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: flash.display.Sprite
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{get_dropTarget:"get_dropTarget",get_graphics:"get_graphics",set_useHandCursor:"set_useHandCursor"})
});
var Main = function() {
	flash.display.Sprite.call(this);
	this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	flash.Lib.get_current().get_stage().align = flash.display.StageAlign.TOP_LEFT;
	flash.Lib.get_current().get_stage().scaleMode = flash.display.StageScaleMode.NO_SCALE;
	flash.Lib.get_current().addChild(new Main());
}
Main.__super__ = flash.display.Sprite;
Main.prototype = $extend(flash.display.Sprite.prototype,{
	added: function(e) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
		this.get_stage().addEventListener(flash.events.Event.RESIZE,$bind(this,this.resize));
		this.init();
	}
	,init: function() {
		if(this.inited) return;
		this.inited = true;
		var app = new com.App();
		this.addChild(app);
	}
	,resize: function(e) {
		if(!this.inited) this.init();
	}
	,__class__: Main
});
var DocumentClass = function() {
	Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	get_stage: function() {
		return flash.Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf.b += Std.string(f(this));
			if(p.len == 0) {
				buf.b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.b += Std.string(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		return this.r.global?(function($this) {
			var $r;
			$this.r.lastIndex = pos;
			$this.r.m = $this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = $this.r.m != null;
			if(b) $this.r.s = s;
			$r = b;
			return $r;
		}(this)):(function($this) {
			var $r;
			var b = $this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b) {
				$this.r.s = s;
				$this.r.m.index += pos;
			}
			$r = b;
			return $r;
		}(this));
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		var width = 800;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,getHeight: function() {
		var height = 480;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getBackgroundColor: function() {
		return 16777215;
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
flash.text = {}
flash.text.Font = function() {
	this.nmeMetrics = [];
	this.nmeFontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(flash.text.Font.nmeFontData == null) {
		flash.text.Font.nmeFontData = [];
		flash.text.Font.nmeFontData["Bitstream_Vera_Sans"] = haxe.Unserializer.run(flash.text.Font.DEFAULT_FONT_DATA);
	}
	if(className == "flash.text.Font") this.set_fontName("Bitstream_Vera_Sans"); else this.set_fontName(className.split(".").pop());
};
$hxClasses["flash.text.Font"] = flash.text.Font;
flash.text.Font.__name__ = ["flash","text","Font"];
flash.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return flash.text.Font.nmeRegisteredFonts.slice();
}
flash.text.Font.nmeOfResource = function(resourceName,fontName) {
	if(fontName == null) fontName = "";
	var data = haxe.Unserializer.run(haxe.Resource.getString(resourceName));
	if(data == null) {
	} else {
		if(fontName == "") {
			flash.text.Font.nmeFontData[resourceName] = data.hash;
			fontName = data.fontName;
		}
		flash.text.Font.nmeFontData[data.fontName] = data.hash;
	}
	return fontName;
}
flash.text.Font.registerFont = function(font) {
	var instance = js.Boot.__cast(Type.createInstance(font,[]) , flash.text.Font);
	if(instance != null) {
		if(Reflect.hasField(font,"resourceName")) instance.set_fontName(flash.text.Font.nmeOfResource(Reflect.field(font,"resourceName")));
		flash.text.Font.nmeRegisteredFonts.push(instance);
	}
}
flash.text.Font.prototype = {
	set_fontName: function(name) {
		if(name == "_sans" || name == "_serif" || name == "_typewriter") name = "Bitstream_Vera_Sans";
		this.fontName = name;
		if(flash.text.Font.nmeFontData[this.fontName] == null) try {
			flash.text.Font.nmeOfResource(name);
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		if(flash.text.Font.nmeFontData[this.fontName] != null) try {
			this.nmeGlyphData = flash.text.Font.nmeFontData[this.fontName];
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		return name;
	}
	,nmeSetScale: function(scale) {
		this.nmeFontScale = scale / 1024;
	}
	,nmeRender: function(graphics,inChar,inX,inY,inOutline) {
		var index = 0;
		var glyph = this.nmeGlyphData.get(inChar);
		if(glyph == null) return;
		var commands = glyph.commands;
		var data = glyph.data;
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c) {
			case 1:
				graphics.moveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 2:
				graphics.lineTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 3:
				graphics.curveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale,inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			}
		}
	}
	,nmeGetAdvance: function(inGlyph,height) {
		var m = this.nmeMetrics[inGlyph];
		if(m == null) {
			var glyph = this.nmeGlyphData.get(inGlyph);
			if(glyph == null) return 0;
			this.nmeMetrics[inGlyph] = m = glyph._width * this.nmeFontScale | 0;
		}
		if(m == null) return 0;
		return m;
	}
	,hasGlyph: function(str) {
		return this.nmeGlyphData.exists(HxOverrides.cca(str,0));
	}
	,__class__: flash.text.Font
	,__properties__: {set_fontName:"set_fontName"}
}
var com = {}
com.DefaultFont = function() {
	flash.text.Font.call(this);
};
$hxClasses["com.DefaultFont"] = com.DefaultFont;
com.DefaultFont.__name__ = ["com","DefaultFont"];
com.DefaultFont.__super__ = flash.text.Font;
com.DefaultFont.prototype = $extend(flash.text.Font.prototype,{
	__class__: com.DefaultFont
});
com.App = function() {
	flash.display.Sprite.call(this);
	flash.text.Font.registerFont(com.DefaultFont);
	com.gamekit.text.LatexParser.standardColors = new haxe.ds.StringMap();
	com.gamekit.text.LatexParser.standardColors.set("apricot","#fbb982");
	com.gamekit.text.LatexParser.standardColors.set("aquamarine","#fbb982");
	com.gamekit.text.LatexParser.standardColors.set("bittersweet","#c04f16");
	com.gamekit.text.LatexParser.standardColors.set("black","#000000");
	com.gamekit.text.LatexParser.standardColors.set("blue","#2c2f92");
	com.gamekit.text.LatexParser.standardColors.set("bluegreen","#00b3b8");
	com.gamekit.text.LatexParser.standardColors.set("blueviolet","#463892");
	com.gamekit.text.LatexParser.standardColors.set("brickred","#b6311b");
	com.gamekit.text.LatexParser.standardColors.set("brown","#792400");
	com.gamekit.text.LatexParser.standardColors.set("burntorange","#f7921d");
	com.gamekit.text.LatexParser.standardColors.set("cadetblue","#74729a");
	com.gamekit.text.LatexParser.standardColors.set("carnationpink","#f282b3");
	com.gamekit.text.LatexParser.standardColors.set("cerulean","#00a1e3");
	com.gamekit.text.LatexParser.standardColors.set("cornflowerblue","#40b0e4");
	com.gamekit.text.LatexParser.standardColors.set("cyan","#00adef");
	com.gamekit.text.LatexParser.standardColors.set("dandelion","#fdbb41");
	com.gamekit.text.LatexParser.standardColors.set("darkorchid","#a4528a");
	com.gamekit.text.LatexParser.standardColors.set("emerald","#00a99d");
	com.gamekit.text.LatexParser.standardColors.set("forestgreen","#009b55");
	com.gamekit.text.LatexParser.standardColors.set("fuchsia","#8c358c");
	com.gamekit.text.LatexParser.standardColors.set("goldenrod","#ffde41");
	com.gamekit.text.LatexParser.standardColors.set("gray","#949698");
	com.gamekit.text.LatexParser.standardColors.set("green","#00a64e");
	com.gamekit.text.LatexParser.standardColors.set("greenyellow","#dfe674");
	com.gamekit.text.LatexParser.standardColors.set("junlegreen","#00a99a");
	com.gamekit.text.LatexParser.standardColors.set("lavender","#f49ec4");
	com.gamekit.text.LatexParser.standardColors.set("limegreen","#8dc73d");
	com.gamekit.text.LatexParser.standardColors.set("magenta","#ec008c");
	com.gamekit.text.LatexParser.standardColors.set("mahogany","#a9341e");
	com.gamekit.text.LatexParser.standardColors.set("maroon","#af3135");
	com.gamekit.text.LatexParser.standardColors.set("melon","#f89d7a");
	com.gamekit.text.LatexParser.standardColors.set("midnightblue","#006695");
	com.gamekit.text.LatexParser.standardColors.set("mulberry","#a93b92");
	com.gamekit.text.LatexParser.standardColors.set("navyblue","#006eb8");
	com.gamekit.text.LatexParser.standardColors.set("olivegreen","#3c8030");
	com.gamekit.text.LatexParser.standardColors.set("orange","#f58137");
	com.gamekit.text.LatexParser.standardColors.set("orangered","#ed135a");
	com.gamekit.text.LatexParser.standardColors.set("orchid","#af72b0");
	com.gamekit.text.LatexParser.standardColors.set("peach","#f79659");
	com.gamekit.text.LatexParser.standardColors.set("periwinkle","#7976b8");
	com.gamekit.text.LatexParser.standardColors.set("pinegreen","#008b72");
	com.gamekit.text.LatexParser.standardColors.set("plum","#92258e");
	com.gamekit.text.LatexParser.standardColors.set("processblue","#00b0f0");
	com.gamekit.text.LatexParser.standardColors.set("purple","#99479b");
	com.gamekit.text.LatexParser.standardColors.set("rawsienna","#974005");
	com.gamekit.text.LatexParser.standardColors.set("red","#ed1b22");
	com.gamekit.text.LatexParser.standardColors.set("redorange","#f26034");
	com.gamekit.text.LatexParser.standardColors.set("redviolet","#a1236a");
	com.gamekit.text.LatexParser.standardColors.set("rhodamine","#ef559f");
	com.gamekit.text.LatexParser.standardColors.set("royalblue","#0070bc");
	com.gamekit.text.LatexParser.standardColors.set("royalpurple","#603e99");
	com.gamekit.text.LatexParser.standardColors.set("rubinered","#ed007c");
	com.gamekit.text.LatexParser.standardColors.set("salmon","#f69188");
	com.gamekit.text.LatexParser.standardColors.set("seagreen","#3ebc9c");
	com.gamekit.text.LatexParser.standardColors.set("sepia","#671700");
	com.gamekit.text.LatexParser.standardColors.set("skyblue","#45c5dd");
	com.gamekit.text.LatexParser.standardColors.set("springgreen","#c6dc66");
	com.gamekit.text.LatexParser.standardColors.set("tan","#da9d76");
	com.gamekit.text.LatexParser.standardColors.set("tealblue","#00aeb3");
	com.gamekit.text.LatexParser.standardColors.set("thistle","#d882b6");
	com.gamekit.text.LatexParser.standardColors.set("turquoise","#00b4ce");
	com.gamekit.text.LatexParser.standardColors.set("violet","#57419b");
	com.gamekit.text.LatexParser.standardColors.set("violetred","#ef57a0");
	com.gamekit.text.LatexParser.standardColors.set("white","#ffffff");
	com.gamekit.text.LatexParser.standardColors.set("wildstrawberry","#ee2866");
	com.gamekit.text.LatexParser.standardColors.set("yellow","#fff200");
	com.gamekit.text.LatexParser.standardColors.set("yellowgreen","#98cc70");
	com.gamekit.text.LatexParser.standardColors.set("yelloworange","#faa21a");
	var mahjong = new com.mahjong.Mahjong();
	this.addChild(mahjong);
};
$hxClasses["com.App"] = com.App;
com.App.__name__ = ["com","App"];
com.App.__super__ = flash.display.Sprite;
com.App.prototype = $extend(flash.display.Sprite.prototype,{
	__class__: com.App
});
com.gamekit = {}
com.gamekit.core = {}
com.gamekit.core.IDestroyable = function() { }
$hxClasses["com.gamekit.core.IDestroyable"] = com.gamekit.core.IDestroyable;
com.gamekit.core.IDestroyable.__name__ = ["com","gamekit","core","IDestroyable"];
com.gamekit.core.IDestroyable.prototype = {
	__class__: com.gamekit.core.IDestroyable
}
com.gamekit.core.IJsonParsable = function() { }
$hxClasses["com.gamekit.core.IJsonParsable"] = com.gamekit.core.IJsonParsable;
com.gamekit.core.IJsonParsable.__name__ = ["com","gamekit","core","IJsonParsable"];
com.gamekit.core.IJsonParsable.prototype = {
	__class__: com.gamekit.core.IJsonParsable
}
com.gamekit.display = {}
com.gamekit.display.BitmapLoader = function(url,callback) {
	this._url = url;
	this._callback = callback;
	if(com.gamekit.display.BitmapLoader._cache == null) com.gamekit.display.BitmapLoader._cache = new haxe.ds.StringMap();
	if(com.gamekit.display.BitmapLoader._cache.exists(this._url)) {
		this._bitmapData = com.gamekit.display.BitmapLoader._cache.get(this._url);
		this._applyCallback();
	}
	this._load();
};
$hxClasses["com.gamekit.display.BitmapLoader"] = com.gamekit.display.BitmapLoader;
com.gamekit.display.BitmapLoader.__name__ = ["com","gamekit","display","BitmapLoader"];
com.gamekit.display.BitmapLoader.__interfaces__ = [com.gamekit.core.IDestroyable];
com.gamekit.display.BitmapLoader.clearCache = function() {
	com.gamekit.display.BitmapLoader._cache = null;
}
com.gamekit.display.BitmapLoader.prototype = {
	get_bitmapData: function() {
		return this._bitmapData;
	}
	,get_callback: function() {
		return this._callback;
	}
	,get_url: function() {
		return this._url;
	}
	,_onLoadComplete: function(e) {
		var bitmap = this._loader.content;
		if(bitmap != null) this._bitmapData = bitmap.bitmapData;
		com.gamekit.display.BitmapLoader._cache.set(this._url,this._bitmapData);
		this._applyCallback();
	}
	,_applyCallback: function() {
		if(this._callback != null) this._callback.apply(this,[this._bitmapData]);
	}
	,_load: function() {
		this._loader = new flash.display.Loader();
		this._loader.loaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this._onLoadComplete));
	}
	,destroy: function() {
		if(this._loader != null) this._loader.loaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this._onLoadComplete));
		this._loader = null;
		this._callback = null;
		this._bitmapData = null;
	}
	,__class__: com.gamekit.display.BitmapLoader
	,__properties__: {get_url:"get_url",get_callback:"get_callback",get_bitmapData:"get_bitmapData"}
}
com.gamekit.mvc = {}
com.gamekit.mvc.model = {}
com.gamekit.mvc.model.Model = function() {
	this._name = "unnamed";
	flash.events.EventDispatcher.call(this);
};
$hxClasses["com.gamekit.mvc.model.Model"] = com.gamekit.mvc.model.Model;
com.gamekit.mvc.model.Model.__name__ = ["com","gamekit","mvc","model","Model"];
com.gamekit.mvc.model.Model.__interfaces__ = [com.gamekit.core.IJsonParsable,com.gamekit.core.IDestroyable];
com.gamekit.mvc.model.Model.__super__ = flash.events.EventDispatcher;
com.gamekit.mvc.model.Model.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_name: function(value) {
		return this._name = value;
	}
	,get_name: function() {
		return this._name;
	}
	,_parseJson: function(data) {
		this._name = data.name;
	}
	,_update: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
	}
	,update: function() {
		this._update();
	}
	,parseJson: function(data) {
		this._parseJson(data);
		this._update();
	}
	,destroy: function() {
	}
	,__class__: com.gamekit.mvc.model.Model
	,__properties__: {set_name:"set_name",get_name:"get_name"}
});
com.gamekit.mvc.view = {}
com.gamekit.mvc.view.View = function() {
	flash.display.Sprite.call(this);
};
$hxClasses["com.gamekit.mvc.view.View"] = com.gamekit.mvc.view.View;
com.gamekit.mvc.view.View.__name__ = ["com","gamekit","mvc","view","View"];
com.gamekit.mvc.view.View.__interfaces__ = [com.gamekit.core.IDestroyable];
com.gamekit.mvc.view.View.__super__ = flash.display.Sprite;
com.gamekit.mvc.view.View.prototype = $extend(flash.display.Sprite.prototype,{
	set_sizeHeight: function(value) {
		this._sizeHeight = value;
		this._resize();
		return this._sizeHeight;
	}
	,get_sizeHeight: function() {
		return this._sizeHeight;
	}
	,set_sizeWidth: function(value) {
		this._sizeWidth = value;
		this._resize();
		return this._sizeWidth;
	}
	,get_sizeWidth: function() {
		return this._sizeWidth;
	}
	,set_model: function(value) {
		if(this._model != value) {
			this._dismissModel();
			this._model = value;
			if(this._model != null) {
				this._model.addEventListener(flash.events.Event.CHANGE,$bind(this,this._onModelChange));
				this._applyModel();
			} else this._clear();
		}
		return this._model;
	}
	,get_model: function() {
		return this._model;
	}
	,_onModelChange: function(e) {
		this._applyModel();
	}
	,_dismissModel: function() {
		if(this._model != null) this._model.removeEventListener(flash.events.Event.CHANGE,$bind(this,this._onModelChange));
		this._model = null;
	}
	,_applyModel: function() {
	}
	,_clear: function() {
	}
	,_resize: function() {
	}
	,setSize: function(width,height) {
		this._sizeWidth = width;
		this._sizeHeight = height;
		this._resize();
	}
	,destroy: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.nmeChildren.length > 0) this.removeChildAt(0);
		this._clear();
		this._dismissModel();
		this._model = null;
	}
	,__class__: com.gamekit.mvc.view.View
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{set_model:"set_model",get_model:"get_model",set_sizeWidth:"set_sizeWidth",get_sizeWidth:"get_sizeWidth",set_sizeHeight:"set_sizeHeight",get_sizeHeight:"get_sizeHeight"})
});
com.gamekit.text = {}
com.gamekit.text.LatexParser = function() { }
$hxClasses["com.gamekit.text.LatexParser"] = com.gamekit.text.LatexParser;
com.gamekit.text.LatexParser.__name__ = ["com","gamekit","text","LatexParser"];
com.gamekit.text.LatexParser.toHtml = function(latex) {
	var reg;
	latex = StringTools.replace(latex,"\\n","#R#");
	reg = new EReg("\\\\size\\(([0-9]+)\\)\\{(.*)\\}","i");
	reg.match(latex);
	latex = reg.map(latex,com.gamekit.text.LatexParser._replaceSize);
	reg = new EReg("\\\\color\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}","i");
	reg.match(latex);
	latex = reg.map(latex,com.gamekit.text.LatexParser._replaceColor);
	reg = new EReg("_\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}","i");
	reg.match(latex);
	latex = reg.map(latex,com.gamekit.text.LatexParser._replaceSub);
	reg = new EReg("\\^\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}","i");
	reg.match(latex);
	latex = reg.map(latex,com.gamekit.text.LatexParser._replaceSup);
	latex = StringTools.replace(latex,"#R#","<br/>");
	return latex;
}
com.gamekit.text.LatexParser._replaceSize = function(reg) {
	return "<font size=\"" + Math.round(com.gamekit.text.LatexParser.baseFontSize * Std.parseInt(reg.matched(1)) / 100) + "\">" + reg.matched(2) + "</font>";
}
com.gamekit.text.LatexParser._replaceColor = function(reg) {
	var color = reg.matched(1).toLowerCase();
	if(com.gamekit.text.LatexParser.standardColors != null && com.gamekit.text.LatexParser.standardColors.exists(color)) color = com.gamekit.text.LatexParser.standardColors.get(color); else {
		var reg2 = new EReg("#[0-9a-f]{6}","i");
		if(!reg2.match(color)) return reg.matched(2);
	}
	return "<font color=\"" + color + "\">" + reg.matched(2) + "</font>";
}
com.gamekit.text.LatexParser._replaceSub = function(reg) {
	return reg.matched(2);
}
com.gamekit.text.LatexParser._replaceSup = function(reg) {
	return reg.matched(2);
}
com.mahjong = {}
com.mahjong.Mahjong = function() {
	flash.display.Sprite.call(this);
	this._map = new com.mahjong.view.MapView();
	this.addChild(this._map);
	this.loadMod("data/mods/elements.json");
	this.loadMap("data/maps/turtle");
};
$hxClasses["com.mahjong.Mahjong"] = com.mahjong.Mahjong;
com.mahjong.Mahjong.__name__ = ["com","mahjong","Mahjong"];
com.mahjong.Mahjong.__super__ = flash.display.Sprite;
com.mahjong.Mahjong.prototype = $extend(flash.display.Sprite.prototype,{
	_onMapLoaded: function(e) {
		var mapFile = this._mapLoader.data;
		var map = new com.mahjong.model.MapModel();
		map.parseString(mapFile);
		this._activeMap = map;
		if(this._activeMod != null) this._buildMap();
		this._mapLoader.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this._onMapLoaded));
		this._mapLoader = null;
	}
	,_onModLoaded: function(e) {
		var modFile = this._modLoader.data;
		var mod = new com.mahjong.model.ModModel();
		mod.parseJson(tjson.TJSON.parse(modFile));
		console.log("mod: " + mod.get_name() + " by: " + mod.get_author() + " rules: " + mod.get_rules() + " tiles: " + mod.get_tiles().length + " associations: " + mod.get_associations().length);
		this._activeMod = mod;
		if(this._activeMap != null) this._buildMap();
		this._modLoader.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this._onModLoaded));
		this._modLoader = null;
	}
	,_buildMap: function() {
		this._map.set_modModel(this._activeMod);
		this._map.set_model(this._activeMap);
	}
	,loadMap: function(url) {
		if(this._mapLoader != null) {
		}
		if(this._activeMap != null) this._activeMap.destroy();
		this._mapLoader = new flash.net.URLLoader();
		this._mapLoader.addEventListener(flash.events.Event.COMPLETE,$bind(this,this._onMapLoaded));
		this._mapLoader.load(new flash.net.URLRequest(url));
	}
	,loadMod: function(url) {
		if(this._modLoader != null) {
		}
		if(this._activeMod != null) this._activeMod.destroy();
		this._modLoader = new flash.net.URLLoader();
		this._modLoader.addEventListener(flash.events.Event.COMPLETE,$bind(this,this._onModLoaded));
		this._modLoader.load(new flash.net.URLRequest(url));
	}
	,__class__: com.mahjong.Mahjong
});
com.mahjong.map = {}
com.mahjong.map.MapTile = function() {
};
$hxClasses["com.mahjong.map.MapTile"] = com.mahjong.map.MapTile;
com.mahjong.map.MapTile.__name__ = ["com","mahjong","map","MapTile"];
com.mahjong.map.MapTile.prototype = {
	set_layer: function(value) {
		return this._layer = value;
	}
	,get_layer: function() {
		return this._layer;
	}
	,set_y: function(value) {
		return this._y = value;
	}
	,get_y: function() {
		return this._y;
	}
	,set_x: function(value) {
		return this._x = value;
	}
	,get_x: function() {
		return this._x;
	}
	,__class__: com.mahjong.map.MapTile
	,__properties__: {set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_layer:"set_layer",get_layer:"get_layer"}
}
com.mahjong.model = {}
com.mahjong.model.MapModel = function() {
	com.gamekit.mvc.model.Model.call(this);
	this._layers = new Array();
	this._tiles = new Array();
};
$hxClasses["com.mahjong.model.MapModel"] = com.mahjong.model.MapModel;
com.mahjong.model.MapModel.__name__ = ["com","mahjong","model","MapModel"];
com.mahjong.model.MapModel.__super__ = com.gamekit.mvc.model.Model;
com.mahjong.model.MapModel.prototype = $extend(com.gamekit.mvc.model.Model.prototype,{
	get_tiles: function() {
		return this._tiles;
	}
	,get_layers: function() {
		return this._layers;
	}
	,set_height: function(value) {
		return this._height = value;
	}
	,get_height: function() {
		return this._height;
	}
	,set_width: function(value) {
		return this._width = value;
	}
	,get_width: function() {
		return this._width;
	}
	,parseString: function(data) {
		data = StringTools.rtrim(data);
		data = StringTools.replace(data,"\n","");
		if(data.charAt(data.length - 1) == ";") data = HxOverrides.substr(data,0,data.length - 1);
		var lines = data.split(";");
		var details = lines.shift().split(",");
		this._name = details[0];
		this._width = Std.parseInt(details[1]);
		this._height = Std.parseInt(details[2]);
		this._layers = new Array();
		this._tiles = new Array();
		var tiles;
		var tile;
		var layer;
		var x = 0;
		var y = 0;
		var layerIndex = 0;
		var _g = 0;
		while(_g < lines.length) {
			var layerData = lines[_g];
			++_g;
			x = 0;
			y = 0;
			layer = new Array();
			tiles = layerData.split("");
			var _g1 = 0;
			while(_g1 < tiles.length) {
				var tileChar = tiles[_g1];
				++_g1;
				if(layer[y] == null) layer[y] = new Array();
				if(tileChar == ".") tile = null; else {
					tile = new com.mahjong.map.MapTile();
					tile.set_x(x);
					tile.set_y(y);
					tile.set_layer(layerIndex);
					if(tileChar == "%" || tileChar == "#") {
						var _g2 = tile;
						_g2.set_y(_g2.get_y() - 0.5);
					}
					if(tileChar == "&" || tileChar == "#") {
						var _g2 = tile;
						_g2.set_x(_g2.get_x() - 0.5);
					}
					this._tiles.push(tile);
				}
				layer[y][x] = tile;
				x++;
				if(x == this._width) {
					x = 0;
					y++;
				}
			}
			this._layers.push(layer);
			layerIndex++;
		}
	}
	,destroy: function() {
		com.gamekit.mvc.model.Model.prototype.destroy.call(this);
		this._layers = null;
		this._tiles = null;
	}
	,__class__: com.mahjong.model.MapModel
	,__properties__: $extend(com.gamekit.mvc.model.Model.prototype.__properties__,{set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height",get_layers:"get_layers",get_tiles:"get_tiles"})
});
com.mahjong.model.ModModel = function() {
	this._rules = "";
	this._author = "";
	com.gamekit.mvc.model.Model.call(this);
	this._tiles = new Array();
	this._associations = new Array();
};
$hxClasses["com.mahjong.model.ModModel"] = com.mahjong.model.ModModel;
com.mahjong.model.ModModel.__name__ = ["com","mahjong","model","ModModel"];
com.mahjong.model.ModModel.__super__ = com.gamekit.mvc.model.Model;
com.mahjong.model.ModModel.prototype = $extend(com.gamekit.mvc.model.Model.prototype,{
	set_associations: function(value) {
		return this._associations = value;
	}
	,get_associations: function() {
		return this._associations;
	}
	,set_tiles: function(value) {
		return this._tiles = value;
	}
	,get_tiles: function() {
		return this._tiles;
	}
	,set_rules: function(value) {
		return this._rules = value;
	}
	,get_rules: function() {
		return this._rules;
	}
	,set_author: function(value) {
		return this._author = value;
	}
	,get_author: function() {
		return this._author;
	}
	,parseJson: function(data) {
		com.gamekit.mvc.model.Model.prototype.parseJson.call(this,data);
		this._author = data.author;
		this._rules = data.rules;
		if(data.pieces != null) {
			var tileModel;
			var _g = 0, _g1 = js.Boot.__cast(data.pieces , Array);
			while(_g < _g1.length) {
				var tile = _g1[_g];
				++_g;
				tileModel = new com.mahjong.model.TileModel();
				tileModel.parseJson(tile);
				this._tiles.push(tileModel);
			}
		}
		if(data.associations != null) {
			var _g = 0, _g1 = js.Boot.__cast(data.associations , Array);
			while(_g < _g1.length) {
				var association = _g1[_g];
				++_g;
				this._associations.push([association[0],association[1]]);
			}
		}
	}
	,destroy: function() {
		com.gamekit.mvc.model.Model.prototype.destroy.call(this);
		var _g = 0, _g1 = this._tiles;
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			tile.destroy();
		}
		this._tiles = null;
		this._associations = null;
	}
	,__class__: com.mahjong.model.ModModel
	,__properties__: $extend(com.gamekit.mvc.model.Model.prototype.__properties__,{set_author:"set_author",get_author:"get_author",set_rules:"set_rules",get_rules:"get_rules",set_tiles:"set_tiles",get_tiles:"get_tiles",set_associations:"set_associations",get_associations:"get_associations"})
});
com.mahjong.model.TileModel = function() {
	this._context = null;
	this._information = "";
	this._rotated = false;
	this._value = "";
	this._type = "text";
	com.gamekit.mvc.model.Model.call(this);
};
$hxClasses["com.mahjong.model.TileModel"] = com.mahjong.model.TileModel;
com.mahjong.model.TileModel.__name__ = ["com","mahjong","model","TileModel"];
com.mahjong.model.TileModel.__super__ = com.gamekit.mvc.model.Model;
com.mahjong.model.TileModel.prototype = $extend(com.gamekit.mvc.model.Model.prototype,{
	set_context: function(value) {
		return this._context = value;
	}
	,get_context: function() {
		return this._context;
	}
	,set_information: function(value) {
		return this._information = value;
	}
	,get_information: function() {
		return this._information;
	}
	,set_rotated: function(value) {
		return this._rotated = value;
	}
	,get_rotated: function() {
		return this._rotated;
	}
	,set_value: function(value) {
		return this._value = value;
	}
	,get_value: function() {
		return this._value;
	}
	,set_type: function(value) {
		return this._type = value;
	}
	,get_type: function() {
		return this._type;
	}
	,_parseJson: function(data) {
		com.gamekit.mvc.model.Model.prototype._parseJson.call(this,data);
		if(data.type == "text" || data.type == "image") this._type = data.type;
		if(this._type == "text") this._value = com.gamekit.text.LatexParser.toHtml(data.value);
		this._rotated = data.rotate;
		if(data.information != null) this._information = data.information; else this._information = "";
		this._context = data.context;
	}
	,__class__: com.mahjong.model.TileModel
	,__properties__: $extend(com.gamekit.mvc.model.Model.prototype.__properties__,{set_type:"set_type",get_type:"get_type",set_value:"set_value",get_value:"get_value",set_rotated:"set_rotated",get_rotated:"get_rotated",set_information:"set_information",get_information:"get_information",set_context:"set_context",get_context:"get_context"})
});
com.mahjong.view = {}
com.mahjong.view.MapView = function() {
	com.gamekit.mvc.view.View.call(this);
};
$hxClasses["com.mahjong.view.MapView"] = com.mahjong.view.MapView;
com.mahjong.view.MapView.__name__ = ["com","mahjong","view","MapView"];
com.mahjong.view.MapView.__super__ = com.gamekit.mvc.view.View;
com.mahjong.view.MapView.prototype = $extend(com.gamekit.mvc.view.View.prototype,{
	set_modModel: function(value) {
		return this._modModel = value;
	}
	,get_modModel: function() {
		return this._modModel;
	}
	,get_mapModel: function() {
		return this._mapModel;
	}
	,_applyModel: function() {
		com.gamekit.mvc.view.View.prototype._applyModel.call(this);
		this._mapModel = this._model;
		if(this._mapModel != null && this._modModel != null) {
			this._clear();
			var tileModels = new Array();
			var _g = 0, _g1 = this._modModel.get_tiles();
			while(_g < _g1.length) {
				var tileModel = _g1[_g];
				++_g;
				tileModels.push(tileModel);
			}
			var _g = 0, _g1 = this._mapModel.get_tiles();
			while(_g < _g1.length) {
				var mapTile = _g1[_g];
				++_g;
				var index = Math.round(Math.random() * (tileModels.length - 1));
				var tileModel = tileModels.splice(index,1)[0];
				var tileView = new com.mahjong.view.TileView();
				tileView.setSize(com.mahjong.view.TileView.defaultSizeWidth,com.mahjong.view.TileView.defaultSizeHeight);
				tileView.set_model(tileModel);
				tileView.set_x(com.mahjong.view.TileView.defaultSizeWidth * mapTile.get_x() - com.mahjong.view.TileView.depth * mapTile.get_layer());
				tileView.set_y(com.mahjong.view.TileView.defaultSizeHeight * mapTile.get_y() - com.mahjong.view.TileView.depth * mapTile.get_layer());
				this.addChild(tileView);
			}
		}
	}
	,_clear: function() {
		com.gamekit.mvc.view.View.prototype._clear.call(this);
		if(this._tiles != null) {
			var _g = 0, _g1 = this._tiles;
			while(_g < _g1.length) {
				var tile = _g1[_g];
				++_g;
				tile.destroy();
			}
		}
		this._tiles = null;
	}
	,_resize: function() {
		com.gamekit.mvc.view.View.prototype._resize.call(this);
	}
	,destroy: function() {
		com.gamekit.mvc.view.View.prototype.destroy.call(this);
		this._mapModel = null;
		this._modModel = null;
		this._tiles = null;
	}
	,__class__: com.mahjong.view.MapView
	,__properties__: $extend(com.gamekit.mvc.view.View.prototype.__properties__,{get_mapModel:"get_mapModel",set_modModel:"set_modModel",get_modModel:"get_modModel"})
});
com.mahjong.view.TileView = function() {
	com.gamekit.mvc.view.View.call(this);
	this._background = new flash.display.Shape();
	this._background.set_filters([new flash.filters.DropShadowFilter(4,45,0,0.3,8,8,1,1)]);
	this.addChild(this._background);
	this._labelContainer = new flash.display.Sprite();
	this.addChild(this._labelContainer);
	this._label = new flash.text.TextField();
	this._label.selectable = false;
	this._label.mouseEnabled = false;
	this._label.set_autoSize("LEFT");
	this._label.multiline = true;
	this._label.embedFonts = true;
	this._labelContainer.addChild(this._label);
	var format = new flash.text.TextFormat("Aller",12,0,false,false,false,null,null,flash.text.TextFormatAlign.CENTER);
	this._label.set_defaultTextFormat(format);
	this._image = new flash.display.Bitmap();
	this.addChild(this._image);
};
$hxClasses["com.mahjong.view.TileView"] = com.mahjong.view.TileView;
com.mahjong.view.TileView.__name__ = ["com","mahjong","view","TileView"];
com.mahjong.view.TileView.__super__ = com.gamekit.mvc.view.View;
com.mahjong.view.TileView.prototype = $extend(com.gamekit.mvc.view.View.prototype,{
	get_tileModel: function() {
		return this._tileModel;
	}
	,_updateImagePosition: function() {
		this._image.set_x((this._sizeWidth - this._image.get_width()) * 0.5);
		this._image.set_y((this._sizeHeight - this._image.get_height()) * 0.5);
	}
	,_showImage: function(data) {
		this._image.set_bitmapData(data);
		this._updateImagePosition();
	}
	,_drawBackground: function() {
		this._background.get_graphics().clear();
		this._background.get_graphics().lineStyle(1,0,1,true,flash.display.LineScaleMode.NONE);
		this._background.get_graphics().beginFill(11184810,1);
		this._background.get_graphics().drawRoundRect(com.mahjong.view.TileView.depth,com.mahjong.view.TileView.depth,this._sizeWidth,this._sizeHeight,com.mahjong.view.TileView.roundDiameter,com.mahjong.view.TileView.roundDiameter);
		this._background.get_graphics().lineStyle(1,0,1,true,flash.display.LineScaleMode.NONE);
		this._background.get_graphics().beginFill(16777215,1);
		this._background.get_graphics().drawRoundRect(0,0,this._sizeWidth,this._sizeHeight,com.mahjong.view.TileView.roundDiameter,com.mahjong.view.TileView.roundDiameter);
	}
	,_resize: function() {
		com.gamekit.mvc.view.View.prototype._resize.call(this);
		this._drawBackground();
		if(this._tileModel == null) return;
		if(this._tileModel.get_rotated()) this._labelContainer.set_rotation(90); else this._labelContainer.set_rotation(0);
		this._label.set_x(-this._label.get_width() * 0.5);
		this._label.set_y(-this._label.get_height() * 0.5);
		this._labelContainer.set_x(this._sizeWidth * 0.5);
		this._labelContainer.set_y(this._sizeHeight * 0.5);
		this._updateImagePosition();
	}
	,_applyModel: function() {
		com.gamekit.mvc.view.View.prototype._applyModel.call(this);
		this._tileModel = this._model;
		if(this._tileModel != null) {
			if(this._tileModel.get_type() == "text") {
				this._label.set_visible(true);
				var reg = new EReg("<[a-z]+ ([a-z]+=\".*\")*>","gi");
				var t = reg.replace(this._tileModel.get_value(),"");
				reg = new EReg("</[a-z]+>","gi");
				t = reg.replace(t,"");
				this._label.set_text(t);
				this._label.set_width(this._label.get_textWidth());
				this._image.set_visible(false);
			} else if(this._tileModel.get_type() == "image") {
				this._label.set_visible(false);
				this._image.set_visible(true);
				if(this._imageLoader != null) this._imageLoader.destroy();
				this._imageLoader = new com.gamekit.display.BitmapLoader(this._tileModel.get_value(),$bind(this,this._showImage));
			}
			this._resize();
		}
	}
	,destroy: function() {
		com.gamekit.mvc.view.View.prototype.destroy.call(this);
		if(this._imageLoader != null) this._imageLoader.destroy();
		this._background = null;
		this._label = null;
		this._image = null;
		this._imageLoader = null;
		this._tileModel = null;
		this._labelContainer = null;
	}
	,__class__: com.mahjong.view.TileView
	,__properties__: $extend(com.gamekit.mvc.view.View.prototype.__properties__,{get_tileModel:"get_tileModel"})
});
var haxe = {}
haxe.Timer = function() { }
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
flash.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__properties__ = {get_current:"get_current"}
flash.Lib["as"] = function(v,c) {
	return js.Boot.__instanceof(v,c)?v:null;
}
flash.Lib.attach = function(name) {
	return new flash.display.MovieClip();
}
flash.Lib.getTimer = function() {
	return (haxe.Timer.stamp() - flash.Lib.starttime) * 1000 | 0;
}
flash.Lib.getURL = function(request,target) {
	document.open(request.url);
}
flash.Lib.nmeAppendSurface = function(surface,before,after) {
	if(flash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) before.parentNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) after.parentNode.insertBefore(surface,after.nextSibling); else flash.Lib.mMe.__scr.appendChild(surface);
	}
}
flash.Lib.nmeAppendText = function(surface,container,text,wrap,isHtml) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		surface.removeChild(surface.childNodes[i]);
	}
	if(isHtml) container.innerHTML = text; else container.appendChild(js.Browser.document.createTextNode(text));
	container.style.setProperty("position","relative","");
	container.style.setProperty("cursor","default","");
	if(!wrap) container.style.setProperty("white-space","nowrap","");
	surface.appendChild(container);
}
flash.Lib.nmeBootstrap = function() {
	if(flash.Lib.mMe == null) {
		var target = js.Browser.document.getElementById("haxe:jeash");
		if(target == null) target = js.Browser.document.createElement("div");
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat(HxOverrides.substr(agent,agent.indexOf("Android") + 8,3));
			if(version <= 2.3) flash.Lib.mForce2DTransform = true;
		}
		flash.Lib.Run(target,flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
	}
}
flash.Lib.nmeCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
flash.Lib.nmeCreateSurfaceAnimationCSS = function(surface,data,template,templateFunc,fps,discrete,infinite) {
	if(infinite == null) infinite = false;
	if(discrete == null) discrete = false;
	if(fps == null) fps = 25;
	if(surface.id == null || surface.id == "") {
		flash.Lib.trace("Failed to create a CSS Style tag for a surface without an id attribute");
		return null;
	}
	var style = null;
	if(surface.getAttribute("data-nme-anim") != null) style = js.Browser.document.getElementById(surface.getAttribute("data-nme-anim")); else {
		style = flash.Lib.mMe.__scr.appendChild(js.Browser.document.createElement("style"));
		style.sheet.id = "__nme_anim_" + surface.id + "__";
		surface.setAttribute("data-nme-anim",style.sheet.id);
	}
	var keyframeStylesheetRule = "";
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var perc = i / (data.length - 1) * 100;
		var frame = data[i];
		keyframeStylesheetRule += perc + "% { " + template.execute(templateFunc(frame)) + " } ";
	}
	var animationDiscreteRule = discrete?"steps(::steps::, end)":"";
	var animationInfiniteRule = infinite?"infinite":"";
	var animationTpl = "";
	var _g = 0, _g1 = ["animation","-moz-animation","-webkit-animation","-o-animation","-ms-animation"];
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		animationTpl += prefix + ": ::id:: ::duration::s " + animationDiscreteRule + " " + animationInfiniteRule + "; ";
	}
	var animationStylesheetRule = new haxe.Template(animationTpl).execute({ id : surface.id, duration : data.length / fps, steps : 1});
	var rules = style.sheet.rules != null?style.sheet.rules:style.sheet.cssRules;
	var _g = 0, _g1 = ["","-moz-","-webkit-","-o-","-ms-"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		try {
			style.sheet.insertRule("@" + variant + "keyframes " + surface.id + " {" + keyframeStylesheetRule + "}",rules.length);
		} catch( e ) {
		}
	}
	style.sheet.insertRule("#" + surface.id + " { " + animationStylesheetRule + " } ",rules.length);
	return style;
}
flash.Lib.nmeDesignMode = function(mode) {
	js.Browser.document.designMode = mode?"on":"off";
}
flash.Lib.nmeDisableFullScreen = function() {
}
flash.Lib.nmeDisableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		flash.Lib.trace("Disable right click not supported in this browser.");
	}
}
flash.Lib.nmeDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
flash.Lib.nmeDrawSurfaceRect = function(surface,tgt,x,y,rect) {
	var tgtCtx = tgt.getContext("2d");
	tgt.width = rect.width;
	tgt.height = rect.height;
	tgtCtx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);
	tgt.style.left = x + "px";
	tgt.style.top = y + "px";
}
flash.Lib.nmeDrawToSurface = function(surface,tgt,matrix,alpha,clipRect,smoothing) {
	if(smoothing == null) smoothing = true;
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	tgtCtx.globalAlpha = alpha;
	flash.Lib.nmeSetImageSmoothing(tgtCtx,smoothing);
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
flash.Lib.nmeEnableFullScreen = function() {
	if(flash.Lib.mMe != null) {
		var origWidth = flash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = flash.Lib.mMe.__scr.style.getPropertyValue("height");
		flash.Lib.mMe.__scr.style.setProperty("width","100%","");
		flash.Lib.mMe.__scr.style.setProperty("height","100%","");
		flash.Lib.nmeDisableFullScreen = function() {
			flash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			flash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
flash.Lib.nmeEnableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		flash.Lib.trace("Enable right click not supported in this browser.");
	}
}
flash.Lib.nmeFullScreenHeight = function() {
	return js.Browser.window.innerHeight;
}
flash.Lib.nmeFullScreenWidth = function() {
	return js.Browser.window.innerWidth;
}
flash.Lib.nmeGetHeight = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientHeight > 0?tgt.clientHeight:500;
}
flash.Lib.nmeGetStage = function() {
	if(flash.Lib.mStage == null) {
		var width = flash.Lib.nmeGetWidth();
		var height = flash.Lib.nmeGetHeight();
		flash.Lib.mStage = new flash.display.Stage(width,height);
	}
	return flash.Lib.mStage;
}
flash.Lib.nmeGetWidth = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientWidth > 0?tgt.clientWidth:500;
}
flash.Lib.nmeIsOnStage = function(surface) {
	var p = surface;
	while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
	return p == flash.Lib.mMe.__scr;
}
flash.Lib.nmeParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
flash.Lib.nmeRemoveSurface = function(surface) {
	if(flash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-nme-anim");
		if(anim != null) {
			var style = js.Browser.document.getElementById(anim);
			if(style != null) flash.Lib.mMe.__scr.removeChild(style);
		}
		if(surface.parentNode != null) surface.parentNode.removeChild(surface);
	}
	return surface;
}
flash.Lib.nmeSetSurfaceBorder = function(surface,color,size) {
	surface.style.setProperty("border-color","#" + StringTools.hex(color),"");
	surface.style.setProperty("border-style","solid","");
	surface.style.setProperty("border-width",size + "px","");
	surface.style.setProperty("border-collapse","collapse","");
}
flash.Lib.nmeSetSurfaceClipping = function(surface,rect) {
}
flash.Lib.nmeSetSurfaceFont = function(surface,font,bold,size,color,align,lineHeight) {
	surface.style.setProperty("font-family",font,"");
	surface.style.setProperty("font-weight",Std.string(bold),"");
	surface.style.setProperty("color","#" + StringTools.hex(color),"");
	surface.style.setProperty("font-size",size + "px","");
	surface.style.setProperty("text-align",align,"");
	surface.style.setProperty("line-height",lineHeight + "px","");
}
flash.Lib.nmeSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
flash.Lib.nmeSetSurfacePadding = function(surface,padding,margin,display) {
	surface.style.setProperty("padding",padding + "px","");
	surface.style.setProperty("margin",margin + "px","");
	surface.style.setProperty("top",padding + 2 + "px","");
	surface.style.setProperty("right",padding + 1 + "px","");
	surface.style.setProperty("left",padding + 1 + "px","");
	surface.style.setProperty("bottom",padding + 1 + "px","");
	surface.style.setProperty("display",display?"inline":"block","");
}
flash.Lib.nmeSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-nme-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
		surface.style.setProperty("transform","","");
		surface.style.setProperty("-moz-transform","","");
		surface.style.setProperty("-webkit-transform","","");
		surface.style.setProperty("-o-transform","","");
		surface.style.setProperty("-ms-transform","","");
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!flash.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
flash.Lib.nmeSetSurfaceZIndexAfter = function(surface1,surface2) {
	if(surface1 != null && surface2 != null) {
		if(surface1.parentNode != surface2.parentNode && surface2.parentNode != null) surface2.parentNode.appendChild(surface1);
		if(surface2.parentNode != null) {
			var nextSibling = surface2.nextSibling;
			if(surface1.previousSibling != surface2) {
				var swap = flash.Lib.nmeRemoveSurface(surface1);
				if(nextSibling == null) surface2.parentNode.appendChild(swap); else surface2.parentNode.insertBefore(swap,nextSibling);
			}
		}
	}
}
flash.Lib.nmeSwapSurface = function(surface1,surface2) {
	var parent1 = surface1.parentNode;
	var parent2 = surface2.parentNode;
	if(parent1 != null && parent2 != null) {
		if(parent1 == parent2) {
			var next1 = surface1.nextSibling;
			var next2 = surface2.nextSibling;
			if(next1 == surface2) parent1.insertBefore(surface2,surface1); else if(next2 == surface1) parent1.insertBefore(surface1,surface2); else {
				parent1.replaceChild(surface2,surface1);
				if(next2 != null) parent1.insertBefore(surface1,next2); else parent1.appendChild(surface1);
			}
		} else {
			var next2 = surface2.nextSibling;
			parent1.replaceChild(surface2,surface1);
			if(next2 != null) parent2.insertBefore(surface1,next2); else parent2.appendChild(surface1);
		}
	}
}
flash.Lib.nmeSetContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
flash.Lib.nmeSetCursor = function(type) {
	if(flash.Lib.mMe != null) flash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
flash.Lib.nmeSetImageSmoothing = function(context,enabled) {
	var _g = 0, _g1 = ["imageSmoothingEnabled","mozImageSmoothingEnabled","webkitImageSmoothingEnabled"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		context[variant] = enabled;
	}
}
flash.Lib.nmeSetSurfaceAlign = function(surface,align) {
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
flash.Lib.nmeSetSurfaceRotation = function(surface,rotate) {
	surface.style.setProperty("transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-moz-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-webkit-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-o-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-ms-transform","rotate(" + rotate + "deg)","");
}
flash.Lib.nmeSetSurfaceScale = function(surface,scale) {
	surface.style.setProperty("transform","scale(" + scale + ")","");
	surface.style.setProperty("-moz-transform","scale(" + scale + ")","");
	surface.style.setProperty("-webkit-transform","scale(" + scale + ")","");
	surface.style.setProperty("-o-transform","scale(" + scale + ")","");
	surface.style.setProperty("-ms-transform","scale(" + scale + ")","");
}
flash.Lib.nmeSetSurfaceSpritesheetAnimation = function(surface,spec,fps) {
	if(spec.length == 0) return surface;
	var div = js.Browser.document.createElement("div");
	div.style.backgroundImage = "url(" + surface.toDataURL("image/png") + ")";
	div.id = surface.id;
	var keyframeTpl = new haxe.Template("background-position: ::left::px ::top::px; width: ::width::px; height: ::height::px; ");
	var templateFunc = function(frame) {
		return { left : -frame.x, top : -frame.y, width : frame.width, height : frame.height};
	};
	flash.Lib.nmeCreateSurfaceAnimationCSS(div,spec,keyframeTpl,templateFunc,fps,true,true);
	if(flash.Lib.nmeIsOnStage(surface)) {
		flash.Lib.nmeAppendSurface(div);
		flash.Lib.nmeCopyStyle(surface,div);
		flash.Lib.nmeSwapSurface(surface,div);
		flash.Lib.nmeRemoveSurface(surface);
	} else flash.Lib.nmeCopyStyle(surface,div);
	return div;
}
flash.Lib.nmeSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
flash.Lib.nmeSetTextDimensions = function(surface,width,height,align) {
	surface.style.setProperty("width",width + "px","");
	surface.style.setProperty("height",height + "px","");
	surface.style.setProperty("overflow","hidden","");
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSurfaceHitTest = function(surface,x,y) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = surface.childNodes[i];
		if(x >= node.offsetLeft && x <= node.offsetLeft + node.offsetWidth && y >= node.offsetTop && y <= node.offsetTop + node.offsetHeight) return true;
	}
	return false;
}
flash.Lib.preventDefaultTouchMove = function() {
	js.Browser.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
}
flash.Lib.Run = function(tgt,width,height) {
	flash.Lib.mMe = new flash.Lib(tgt,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") flash.Lib.nmeGetStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	if(Reflect.hasField(tgt,"on" + flash.Lib.HTML_TOUCH_EVENT_TYPES[0])) {
		var _g = 0, _g1 = flash.Lib.HTML_TOUCH_EVENT_TYPES;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
		}
	} else {
		var _g = 0, _g1 = flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
		}
	}
	var _g = 0, _g1 = flash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	if(Reflect.hasField(js.Browser.window,"on" + "devicemotion")) js.Browser.window.addEventListener("devicemotion",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	if(Reflect.hasField(js.Browser.window,"on" + "orientationchange")) js.Browser.window.addEventListener("orientationchange",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	var _g = 0, _g1 = flash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		js.Browser.window.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") flash.Lib.nmeGetStage().set_backgroundColor(flash.Lib.nmeParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return pos == 0?res | cur << 16:pos == 1?res | cur << 8:pos == 2?res | cur:(function($this) {
			var $r;
			throw "pos should be 0-2";
			return $r;
		}(this));
	})); else flash.Lib.nmeGetStage().set_backgroundColor(16777215);
	flash.Lib.get_current().get_graphics().beginFill(flash.Lib.nmeGetStage().get_backgroundColor());
	flash.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	flash.Lib.nmeSetSurfaceId(flash.Lib.get_current().get_graphics().nmeSurface,"Root MovieClip");
	flash.Lib.nmeGetStage().nmeUpdateNextWake();
	try {
		var winParameters = js.Browser.window.winParameters();
		var _g = 0, _g1 = Reflect.fields(winParameters);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			flash.Lib.get_current().loaderInfo.parameters[prop] = Reflect.field(winParameters,prop);
		}
	} catch( e ) {
	}
	return flash.Lib.mMe;
}
flash.Lib.setUserScalable = function(isScalable) {
	if(isScalable == null) isScalable = true;
	var meta = js.Browser.document.createElement("meta");
	meta.name = "viewport";
	meta.content = "user-scalable=" + (isScalable?"yes":"no");
}
flash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
flash.Lib.get_current = function() {
	if(flash.Lib.mMainClassRoot == null) {
		flash.Lib.mMainClassRoot = new flash.display.MovieClip();
		flash.Lib.mCurrent = flash.Lib.mMainClassRoot;
		flash.Lib.nmeGetStage().addChild(flash.Lib.mCurrent);
	}
	return flash.Lib.mMainClassRoot;
}
flash.Lib.prototype = {
	__class__: flash.Lib
}
flash._Lib = {}
flash._Lib.CursorType = $hxClasses["flash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
flash._Lib.CursorType.Pointer = ["Pointer",0];
flash._Lib.CursorType.Pointer.toString = $estr;
flash._Lib.CursorType.Pointer.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Text = ["Text",1];
flash._Lib.CursorType.Text.toString = $estr;
flash._Lib.CursorType.Text.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Default = ["Default",2];
flash._Lib.CursorType.Default.toString = $estr;
flash._Lib.CursorType.Default.__enum__ = flash._Lib.CursorType;
flash._Vector = {}
flash._Vector.Vector_Impl_ = function() { }
$hxClasses["flash._Vector.Vector_Impl_"] = flash._Vector.Vector_Impl_;
flash._Vector.Vector_Impl_.__name__ = ["flash","_Vector","Vector_Impl_"];
flash._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
flash._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
}
flash._Vector.Vector_Impl_.concat = function(this1,a) {
	return this1.concat(a);
}
flash._Vector.Vector_Impl_.copy = function(this1) {
	return this1.slice();
}
flash._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
}
flash._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
}
flash._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
}
flash._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
}
flash._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
}
flash._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
}
flash._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
}
flash._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
}
flash._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
}
flash._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
}
flash._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
}
flash._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from, _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
}
flash._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
}
flash._Vector.Vector_Impl_.ofArray = function(a) {
	return flash._Vector.Vector_Impl_.concat(flash._Vector.Vector_Impl_._new(),a);
}
flash._Vector.Vector_Impl_.convert = function(v) {
	return v;
}
flash._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
}
flash._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
}
flash._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
}
flash._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(value < this1.length) this1 = this1.slice(0,value);
	while(value > this1.length) this1.push(null);
	return value;
}
flash._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
}
flash._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
}
flash.accessibility = {}
flash.accessibility.AccessibilityProperties = function() {
	this.description = "";
	this.forceSimple = false;
	this.name = "";
	this.noAutoLabeling = false;
	this.shortcut = "";
	this.silent = false;
};
$hxClasses["flash.accessibility.AccessibilityProperties"] = flash.accessibility.AccessibilityProperties;
flash.accessibility.AccessibilityProperties.__name__ = ["flash","accessibility","AccessibilityProperties"];
flash.accessibility.AccessibilityProperties.prototype = {
	__class__: flash.accessibility.AccessibilityProperties
}
flash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	flash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		this.bitmapData.nmeReferenceCount++;
		if(this.bitmapData.nmeReferenceCount == 1) this.nmeGraphics = new flash.display.Graphics(this.bitmapData._nmeTextureBuffer);
	}
	if(this.pixelSnapping == null) this.pixelSnapping = flash.display.PixelSnapping.AUTO;
	if(this.nmeGraphics == null) this.nmeGraphics = new flash.display.Graphics();
	if(this.bitmapData != null) this.nmeRender();
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_bitmapData: function(inBitmapData) {
		if(inBitmapData != this.bitmapData) {
			if(this.bitmapData != null) {
				this.bitmapData.nmeReferenceCount--;
				if(this.nmeGraphics.nmeSurface == this.bitmapData._nmeTextureBuffer) flash.Lib.nmeSetSurfaceOpacity(this.bitmapData._nmeTextureBuffer,0);
			}
			if(inBitmapData != null) inBitmapData.nmeReferenceCount++;
		}
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new flash.geom.Rectangle(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if(this.bitmapData == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.bitmapData._nmeTextureBuffer != this.nmeGraphics.nmeSurface) {
			var imageDataLease = this.bitmapData.nmeLease;
			if(imageDataLease != null && (this.nmeCurrentLease == null || imageDataLease.seed != this.nmeCurrentLease.seed || imageDataLease.time != this.nmeCurrentLease.time)) {
				var srcCanvas = this.bitmapData._nmeTextureBuffer;
				this.nmeGraphics.nmeSurface.width = srcCanvas.width;
				this.nmeGraphics.nmeSurface.height = srcCanvas.height;
				this.nmeGraphics.clear();
				flash.Lib.nmeDrawToSurface(srcCanvas,this.nmeGraphics.nmeSurface);
				this.nmeCurrentLease = imageDataLease.clone();
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
				this._nmeRenderFlags |= 32;
			}
		}
		if(inMask != null) {
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
			flash.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect,this.smoothing);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
				flash.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			if(!this.nmeInit) {
				flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,0);
				this.nmeInit = true;
			} else flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() || local.y > this.get_height()) return null; else return this;
		} else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,__class__: flash.display.Bitmap
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
flash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.nmeLocked = false;
	this.nmeReferenceCount = 0;
	this.nmeLeaseNum = 0;
	this.nmeLease = new flash.display.ImageDataLease();
	this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	this._nmeTextureBuffer = js.Browser.document.createElement("canvas");
	this._nmeTextureBuffer.width = width;
	this._nmeTextureBuffer.height = height;
	this._nmeId = flash.utils.Uuid.uuid();
	flash.Lib.nmeSetSurfaceId(this._nmeTextureBuffer,this._nmeId);
	this.nmeTransparent = transparent;
	this.rect = new flash.geom.Rectangle(0,0,width,height);
	if(this.nmeTransparent) {
		this.nmeTransparentFiller = js.Browser.document.createElement("canvas");
		this.nmeTransparentFiller.width = width;
		this.nmeTransparentFiller.height = height;
		var ctx = this.nmeTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.nmeTransparent) inFillColor |= -16777216;
		this.nmeInitColor = inFillColor;
		this.nmeFillRect(this.rect,inFillColor);
	}
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new flash.geom.Rectangle(0,0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0));
	var num = (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0) * (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0);
	p.position = 0;
	var _g = 0;
	while(_g < num) {
		var i = _g++;
		var pos = p.position;
		var alpha = p.readByte();
		var red = p.readByte();
		var green = p.readByte();
		var blue = p.readByte();
		p.position = pos;
		p.writeByte(red);
		p.writeByte(green);
		p.writeByte(blue);
		p.writeByte(alpha);
	}
	return p;
}
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.nmeLoadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
}
flash.display.BitmapData.nmeBase64Encode = function(bytes) {
	var blob = "";
	var codex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	bytes.position = 0;
	while(bytes.position < bytes.length) {
		var by1 = 0, by2 = 0, by3 = 0;
		by1 = bytes.readByte();
		if(bytes.position < bytes.length) by2 = bytes.readByte();
		if(bytes.position < bytes.length) by3 = bytes.readByte();
		var by4 = 0, by5 = 0, by6 = 0, by7 = 0;
		by4 = by1 >> 2;
		by5 = (by1 & 3) << 4 | by2 >> 4;
		by6 = (by2 & 15) << 2 | by3 >> 6;
		by7 = by3 & 63;
		blob += codex.charAt(by4);
		blob += codex.charAt(by5);
		if(bytes.position < bytes.length) blob += codex.charAt(by6); else blob += "=";
		if(bytes.position < bytes.length) blob += codex.charAt(by7); else blob += "=";
	}
	return blob;
}
flash.display.BitmapData.nmeCreateFromHandle = function(inHandle) {
	var result = new flash.display.BitmapData(0,0);
	result._nmeTextureBuffer = inHandle;
	return result;
}
flash.display.BitmapData.nmeIsJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
}
flash.display.BitmapData.nmeIsPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
}
flash.display.BitmapData.prototype = {
	get_width: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.width; else return 0;
	}
	,get_transparent: function() {
		return this.nmeTransparent;
	}
	,get_height: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.height; else return 0;
	}
	,nmeOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		data.bitmapData.nmeBuildLease();
		if(data.inLoader != null) {
			var e1 = new flash.events.Event(flash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,unlock: function(changeRect) {
		this.nmeLocked = false;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		if(this.nmeImageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.nmeImageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.nmeImageData,0,0);
		}
		var _g = 0, _g1 = this.nmeCopyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.nmeTransparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		console.log("BitmapData.threshold not implemented");
		return 0;
	}
	,setPixels: function(rect,byteArray) {
		rect = this.clipRect(rect);
		if(rect == null) return;
		var len = Math.round(4 * rect.width * rect.height);
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				imageData.data[i] = byteArray.readByte();
			}
			ctx.putImageData(imageData,rect.x,rect.y);
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				this.nmeImageData.data[pos] = byteArray.readByte();
				pos++;
			}
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = (color & -16777216) >>> 24; else imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = (color & -16777216) >>> 24; else this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,scroll: function(x,y) {
		throw "bitmapData.scroll is currently not supported for HTML5";
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		var generator = new flash.display._BitmapData.MinstdGenerator(randomSeed);
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var imageData = null;
		if(this.nmeLocked) imageData = this.nmeImageData; else imageData = ctx.createImageData(this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
		var _g1 = 0, _g = this._nmeTextureBuffer.width * this._nmeTextureBuffer.height;
		while(_g1 < _g) {
			var i = _g1++;
			if(grayScale) imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1); else {
				imageData.data[i * 4] = (channelOptions & 1) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 1] = (channelOptions & 2) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 2] = (channelOptions & 4) == 0?0:low + generator.nextValue() % (high - low + 1);
			}
			imageData.data[i * 4 + 3] = (channelOptions & 8) == 0?255:low + generator.nextValue() % (high - low + 1);
		}
		if(this.nmeLocked) this.nmeImageDataChanged = true; else ctx.putImageData(imageData,0,0);
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Browser.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this._nmeTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.nmeOnLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.nmeOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,nmeIncrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps++;
	}
	,nmeGetNumRefBitmaps: function() {
		return this.nmeAssignedBitmaps;
	}
	,nmeLoadFromBytes: function(bytes,inRawAlpha,onload) {
		var _g = this;
		var type = "";
		if(flash.display.BitmapData.nmeIsPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.nmeIsJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		var img = js.Browser.document.createElement("img");
		var canvas = this._nmeTextureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			if(inRawAlpha != null) {
				var pixels = ctx.getImageData(0,0,img.width,img.height);
				var _g1 = 0, _g2 = inRawAlpha.length;
				while(_g1 < _g2) {
					var i = _g1++;
					pixels.data[i * 4 + 3] = inRawAlpha.readUnsignedByte();
				}
				ctx.putImageData(pixels,0,0);
			}
			_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload != null) onload(_g);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + flash.display.BitmapData.nmeBase64Encode(bytes);
	}
	,nmeGetLease: function() {
		return this.nmeLease;
	}
	,nmeFillRect: function(rect,color) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.nmeTransparent?color >>> 24:255;
		if(!this.nmeLocked) {
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = r;
					this.nmeImageData.data[s + offsetX + 1] = g;
					this.nmeImageData.data[s + offsetX + 2] = b;
					this.nmeImageData.data[s + offsetX + 3] = a;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,nmeDecrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps--;
	}
	,nmeClearCanvas: function() {
		var ctx = this._nmeTextureBuffer.getContext("2d");
		ctx.clearRect(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
	}
	,nmeBuildLease: function() {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,lock: function() {
		this.nmeLocked = true;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		this.nmeImageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		this.nmeImageDataChanged = false;
		this.nmeCopyPixelList = [];
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		var type = Type.getClassName(Type.getClass(secondObject));
		firstAlphaThreshold = firstAlphaThreshold & -1;
		var me = this;
		var doHitTest = function(imageData) {
			if(secondObject.__proto__ == null || secondObject.__proto__.__class__ == null || secondObject.__proto__.__class__.__name__ == null) return false;
			var _g = secondObject.__proto__.__class__.__name__[2];
			switch(_g) {
			case "Rectangle":
				var rect = secondObject;
				rect.x -= firstPoint.x;
				rect.y -= firstPoint.y;
				rect = me.clipRect(me.rect);
				if(me.rect == null) return false;
				var boundingBox = new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
				if(!rect.intersects(boundingBox)) return false;
				var diff = rect.intersection(boundingBox);
				var offset = 4 * (Math.round(diff.x) + Math.round(diff.y) * imageData.width) + 3;
				var pos = offset;
				var boundR = Math.round(4 * (diff.x + diff.width));
				while(pos < offset + Math.round(4 * (diff.width + imageData.width * diff.height))) {
					if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
					if(imageData.data[pos] - firstAlphaThreshold >= 0) return true;
					pos += 4;
				}
				return false;
			case "Point":
				var point = secondObject;
				var x = point.x - firstPoint.x;
				var y = point.y - firstPoint.y;
				if(x < 0 || y < 0 || x >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) || y >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0)) return false;
				if(imageData.data[Math.round(4 * (y * (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) + x)) + 3] - firstAlphaThreshold > 0) return true;
				return false;
			case "Bitmap":
				throw "bitmapData.hitTest with a second object of type Bitmap is currently not supported for HTML5";
				return false;
			case "BitmapData":
				throw "bitmapData.hitTest with a second object of type BitmapData is currently not supported for HTML5";
				return false;
			default:
				throw "BitmapData::hitTest secondObject argument must be either a Rectangle, a Point, a Bitmap or a BitmapData object.";
				return false;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doHitTest(imageData);
		} else return doHitTest(this.nmeImageData);
	}
	,handle: function() {
		return this._nmeTextureBuffer;
	}
	,getPixels: function(rect) {
		var len = Math.round(4 * rect.width * rect.height);
		var byteArray = new flash.utils.ByteArray();
		if(byteArray.allocated < len) byteArray._nmeResizeBuffer(byteArray.allocated = Math.max(len,byteArray.allocated * 2) | 0); else if(byteArray.allocated > len) byteArray._nmeResizeBuffer(byteArray.allocated = len);
		byteArray.length = len;
		len;
		rect = this.clipRect(rect);
		if(rect == null) return byteArray;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				byteArray.writeByte(imagedata.data[i]);
			}
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				byteArray.writeByte(this.nmeImageData.data[pos]);
				pos++;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			return this.getInt32(0,ctx.getImageData(x,y,1,1).data);
		} else return this.getInt32(4 * y * this._nmeTextureBuffer.width + x * 4,this.nmeImageData.data);
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(x,y,1,1);
			return imagedata.data[0] << 16 | imagedata.data[1] << 8 | imagedata.data[2];
		} else {
			var offset = 4 * y * (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + x * 4;
			return this.nmeImageData.data[offset] << 16 | this.nmeImageData.data[offset + 1] << 8 | this.nmeImageData.data[offset + 2];
		}
	}
	,getInt32: function(offset,data) {
		return (this.nmeTransparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		var me = this;
		var doGetColorBoundsRect = function(data) {
			var minX = me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0, maxX = 0, minY = me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0, maxY = 0, i = 0;
			while(i < data.length) {
				var value = me.getInt32(i,data);
				if(findColor) {
					if((value & mask) == color) {
						var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
						var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
						if(x < minX) minX = x;
						if(x > maxX) maxX = x;
						if(y < minY) minY = y;
						if(y > maxY) maxY = y;
					}
				} else if((value & mask) != color) {
					var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
					var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
					if(x < minX) minX = x;
					if(x > maxX) maxX = x;
					if(y < minY) minY = y;
					if(y > maxY) maxY = y;
				}
				i += 4;
			}
			if(minX < maxX && minY < maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY); else return new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
		};
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doGetColorBoundsRect(imageData.data);
		} else return doGetColorBoundsRect(this.nmeImageData.data);
	}
	,floodFill: function(x,y,color) {
		var wasLocked = this.nmeLocked;
		if(!this.nmeLocked) this.lock();
		var queue = new Array();
		queue.push(new flash.geom.Point(x,y));
		var old = this.getPixel32(x,y);
		var iterations = 0;
		var search = new Array();
		var _g1 = 0, _g = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var column = new Array();
			var _g3 = 0, _g2 = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0) + 1;
			while(_g3 < _g2) {
				var i1 = _g3++;
				column.push(false);
			}
			search.push(column);
		}
		var currPoint, newPoint;
		while(queue.length > 0) {
			currPoint = queue.shift();
			++iterations;
			var x1 = currPoint.x | 0;
			var y1 = currPoint.y | 0;
			if(x1 < 0 || x1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) continue;
			if(y1 < 0 || y1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) continue;
			search[x1][y1] = true;
			if(this.getPixel32(x1,y1) == old) {
				this.setPixel32(x1,y1,color);
				if(!search[x1 + 1][y1]) queue.push(new flash.geom.Point(x1 + 1,y1));
				if(!search[x1][y1 + 1]) queue.push(new flash.geom.Point(x1,y1 + 1));
				if(x1 > 0 && !search[x1 - 1][y1]) queue.push(new flash.geom.Point(x1 - 1,y1));
				if(y1 > 0 && !search[x1][y1 - 1]) queue.push(new flash.geom.Point(x1,y1 - 1));
			}
		}
		if(!wasLocked) this.unlock();
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this._nmeTextureBuffer.width && rect.height == this._nmeTextureBuffer.height) {
			if(this.nmeTransparent) {
				if(color >>> 24 == 0 || color == this.nmeInitColor) return this.nmeClearCanvas();
			} else if((color | -16777216) == (this.nmeInitColor | -16777216)) return this.nmeClearCanvas();
		}
		return this.nmeFillRect(rect,color);
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else {
				flash.Lib.nmeSetImageSmoothing(ctx,smoothing);
				ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			}
			ctx.drawImage(this._nmeTextureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this._nmeTextureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new flash.geom.Rectangle(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height),inColorTransform);
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		source.drawToSurface(this._nmeTextureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new flash.geom.Rectangle();
			var object = source;
			rect.x = matrix != null?matrix.tx:0;
			rect.y = matrix != null?matrix.ty:0;
			try {
				rect.width = Reflect.getProperty(source,"width");
				rect.height = Reflect.getProperty(source,"height");
			} catch( e ) {
				rect.width = this._nmeTextureBuffer.width;
				rect.height = this._nmeTextureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,dispose: function() {
		this.nmeClearCanvas();
		this._nmeTextureBuffer = null;
		this.nmeLeaseNum = 0;
		this.nmeLease = null;
		this.nmeImageData = null;
	}
	,destroy: function() {
		this._nmeTextureBuffer = null;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceBitmapData._nmeTextureBuffer.width == 0 || sourceBitmapData._nmeTextureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		if(alphaBitmapData != null && alphaBitmapData.nmeTransparent) {
			if(alphaPoint == null) alphaPoint = new flash.geom.Point();
			var bitmapData = new flash.display.BitmapData(sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.width:0,sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.height:0,true);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point(sourceRect.x,sourceRect.y));
			bitmapData.copyChannel(alphaBitmapData,new flash.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new flash.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = bitmapData;
		}
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			if(!mergeAlpha) {
				if(this.nmeTransparent && sourceBitmapData.nmeTransparent) {
					var trpCtx = sourceBitmapData.nmeTransparentFiller.getContext("2d");
					var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
					ctx.putImageData(trpData,destPoint.x,destPoint.y);
				}
			}
			ctx.drawImage(sourceBitmapData._nmeTextureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.nmeCopyPixelList[this.nmeCopyPixelList.length] = { handle : sourceBitmapData._nmeTextureBuffer, transparentFiller : mergeAlpha?null:sourceBitmapData.nmeTransparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		this.rect = this.clipRect(this.rect);
		if(this.rect == null) return;
		if(destChannel == 8 && !this.nmeTransparent) return;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		var doChannelCopy = function(imageData) {
			var srcCtx = sourceBitmapData._nmeTextureBuffer.getContext("2d");
			var srcImageData = srcCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
			var destIdx = -1;
			if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
			var pos = 4 * (Math.round(destPoint.x) + Math.round(destPoint.y) * imageData.width) + destIdx;
			var boundR = Math.round(4 * (destPoint.x + sourceRect.width));
			var setPos = function(val) {
				if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
				imageData.data[pos] = val;
				pos += 4;
			};
			var srcIdx = -1;
			if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
			while(srcIdx < srcImageData.data.length) {
				setPos(srcImageData.data[srcIdx]);
				srcIdx += 4;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			doChannelCopy(imageData);
			ctx.putImageData(imageData,0,0);
		} else {
			doChannelCopy(this.nmeImageData);
			this.nmeImageDataChanged = true;
		}
	}
	,compare: function(inBitmapTexture) {
		throw "bitmapData.compare is currently not supported for HTML5";
		return 0;
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0, _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = this.nmeImageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.nmeImageData.data[s + offsetX + 1] = this.nmeImageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.nmeImageData.data[s + offsetX + 2] = this.nmeImageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.nmeImageData.data[s + offsetX + 3] = this.nmeImageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,clone: function() {
		var bitmapData = new flash.display.BitmapData(this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0,this.nmeTransparent);
		var rect = new flash.geom.Rectangle(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		bitmapData.setPixels(rect,this.getPixels(rect));
		bitmapData.nmeLease.set(bitmapData.nmeLeaseNum++,new Date().getTime());
		return bitmapData;
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) {
			r.width -= r.x + r.width - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) {
			r.height -= r.y + r.height - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,clear: function(color) {
		this.fillRect(this.rect,color);
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(sourceBitmapData == this && sourceRect.x == destPoint.x && sourceRect.y == destPoint.y) filter.nmeApplyFilter(this._nmeTextureBuffer,sourceRect); else {
			var bitmapData = new flash.display.BitmapData(sourceRect.width | 0,sourceRect.height | 0);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point());
			filter.nmeApplyFilter(bitmapData._nmeTextureBuffer);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
		}
	}
	,__class__: flash.display.BitmapData
	,__properties__: {get_height:"get_height",get_transparent:"get_transparent",get_width:"get_width"}
}
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: flash.display.ImageDataLease
}
flash.display._BitmapData = {}
flash.display._BitmapData.MinstdGenerator = function(seed) {
	if(seed == 0) this.value = 1; else this.value = seed;
};
$hxClasses["flash.display._BitmapData.MinstdGenerator"] = flash.display._BitmapData.MinstdGenerator;
flash.display._BitmapData.MinstdGenerator.__name__ = ["flash","display","_BitmapData","MinstdGenerator"];
flash.display._BitmapData.MinstdGenerator.prototype = {
	nextValue: function() {
		var lo = 16807 * (this.value & 65535);
		var hi = 16807 * (this.value >>> 16);
		lo += (hi & 32767) << 16;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		lo += hi >>> 15;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		return this.value = lo;
	}
	,__class__: flash.display._BitmapData.MinstdGenerator
}
flash.display.BitmapDataChannel = function() { }
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display.CapsStyle = $hxClasses["flash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
flash.display.CapsStyle.NONE = ["NONE",0];
flash.display.CapsStyle.NONE.toString = $estr;
flash.display.CapsStyle.NONE.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.ROUND = ["ROUND",1];
flash.display.CapsStyle.ROUND.toString = $estr;
flash.display.CapsStyle.ROUND.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.SQUARE = ["SQUARE",2];
flash.display.CapsStyle.SQUARE.toString = $estr;
flash.display.CapsStyle.SQUARE.__enum__ = flash.display.CapsStyle;
flash.display.GradientType = $hxClasses["flash.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] }
flash.display.GradientType.RADIAL = ["RADIAL",0];
flash.display.GradientType.RADIAL.toString = $estr;
flash.display.GradientType.RADIAL.__enum__ = flash.display.GradientType;
flash.display.GradientType.LINEAR = ["LINEAR",1];
flash.display.GradientType.LINEAR.toString = $estr;
flash.display.GradientType.LINEAR.__enum__ = flash.display.GradientType;
flash.display.Graphics = function(inSurface) {
	flash.Lib.nmeBootstrap();
	if(inSurface == null) {
		this.nmeSurface = js.Browser.document.createElement("canvas");
		this.nmeSurface.width = 0;
		this.nmeSurface.height = 0;
	} else this.nmeSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.nmeClearLine();
	this.mLineJobs = [];
	this.nmeChanged = true;
	this.nextDrawIndex = 0;
	this.nmeExtent = new flash.geom.Rectangle();
	this.nmeExtentWithFilters = new flash.geom.Rectangle();
	this._padding = 0.0;
	this.nmeClearNextCycle = true;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.nmeDetectIsPointInPathMode = function() {
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return flash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?flash.display.PointInPathMode.USER_SPACE:flash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
flash.display.Graphics.prototype = {
	nmeRender: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.nmeChanged) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.nmeExpandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.nmeClearNextCycle) {
			this.nextDrawIndex = 0;
			this.nmeClearCanvas();
			this.nmeClearNextCycle = false;
		}
		if(this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x > this.nmeSurface.width || this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y > this.nmeSurface.height) this.nmeAdjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,flash.filters.DropShadowFilter)) filter.nmeApplyFilter(this.nmeSurface,null,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.nmeExtentWithFilters.x != 0 || this.nmeExtentWithFilters.y != 0) ctx.translate(-this.nmeExtentWithFilters.x * sx,-this.nmeExtentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.nmeDrawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0, _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						switch(lj.joints) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						switch(lj.caps) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
						while(_g4 < _g3) {
							var i1 = _g4++;
							var p = d.points[i1];
							switch(p.type) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0, _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				var bitmap = d.bitmap;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else if(bitmap != null && (bitmap.flags & 16) > 0) {
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					if((bitmap.flags & 65536) == 0) {
						ctx.mozImageSmoothingEnabled = false;
						ctx.webkitImageSmoothingEnabled = false;
					}
					ctx.fillStyle = ctx.createPattern(bitmap.texture_buffer,"repeat");
				} else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				if(bitmap != null && (bitmap.flags & 16) == 0) {
					ctx.clip();
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.nmeChanged = false;
		this.nextDrawIndex = len;
		this.mDrawList = [];
		return true;
	}
	,nmeMediaSurface: function(surface) {
		this.nmeSurface = surface;
	}
	,nmeInvalidate: function() {
		this.nmeChanged = true;
		this.nmeClearNextCycle = true;
	}
	,nmeHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.nmeExtent.width > 0 && this.nmeExtent.height > 0) return true;
		return false;
	}
	,nmeExpandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.nmeExtent.width -= this._padding;
			this.nmeExtent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtent.x = minX;
		this.nmeExtent.y = minY;
		this.nmeExtent.width = maxX - minX + this._padding;
		this.nmeExtent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,nmeExpandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtentWithFilters.x = minX;
		this.nmeExtentWithFilters.y = minY;
		this.nmeExtentWithFilters.width = maxX - minX;
		this.nmeExtentWithFilters.height = maxY - minY;
	}
	,nmeDrawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.nmeBitmap._nmeTextureBuffer;
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.nmeTileRects[tileID];
				center = sheet.nmeCenterPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,nmeDrawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,nmeClearLine: function() {
		this.mCurrentLine = new flash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,nmeClearCanvas: function() {
		if(this.nmeSurface != null) {
			var ctx = (function($this) {
				var $r;
				try {
					$r = $this.nmeSurface.getContext("2d");
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(ctx != null) ctx.clearRect(0,0,this.nmeSurface.width,this.nmeSurface.height);
		}
	}
	,nmeAdjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.nmeSurface,"getContext") != null) {
			var width = Math.ceil((this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x) * sx);
			var height = Math.ceil((this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Browser.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				flash.Lib.nmeDrawToSurface(this.nmeSurface,dstCanvas);
				if(flash.Lib.nmeIsOnStage(this.nmeSurface)) {
					flash.Lib.nmeAppendSurface(dstCanvas);
					flash.Lib.nmeCopyStyle(this.nmeSurface,dstCanvas);
					flash.Lib.nmeSwapSurface(this.nmeSurface,dstCanvas);
					flash.Lib.nmeRemoveSurface(this.nmeSurface);
					if(this.nmeSurface.id != null) flash.Lib.nmeSetSurfaceId(dstCanvas,this.nmeSurface.id);
				}
				this.nmeSurface = dstCanvas;
			}
		}
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.nmeClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.mCurrentLine.grad = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,getContext: function() {
		try {
			return this.nmeSurface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,flush: function() {
		this.closePolygon(true);
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.nmeExpandStandardExtent(flash.Lib.get_current().get_stage().get_stageWidth(),flash.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new flash.display.Drawable(null,null,null,null,null,null,new flash.display.TileJob(sheet,tileData,flags)));
		this.nmeChanged = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(ry == -1) ry = rx;
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawGraphicsData: function(points) {
		var $it0 = ((function(_e) {
			return function() {
				return $iterator(flash._Vector.Vector_Impl_)(_e);
			};
		})(points))();
		while( $it0.hasNext() ) {
			var data = $it0.next();
			if(data == null) this.mFilling = true; else switch(data.nmeGraphicsDataType) {
			case flash.display.GraphicsDataType.STROKE:
				var stroke = data;
				if(stroke.fill == null) this.lineStyle(stroke.thickness,0,1.,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit); else switch(stroke.fill.nmeGraphicsFillType) {
				case flash.display.GraphicsFillType.SOLID_FILL:
					var fill = stroke.fill;
					this.lineStyle(stroke.thickness,fill.color,fill.alpha,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit);
					break;
				case flash.display.GraphicsFillType.GRADIENT_FILL:
					var fill = stroke.fill;
					this.lineGradientStyle(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
					break;
				}
				break;
			case flash.display.GraphicsDataType.PATH:
				var path = data;
				var j = 0;
				var _g1 = 0, _g = flash._Vector.Vector_Impl_.get_length(path.commands);
				while(_g1 < _g) {
					var i = _g1++;
					var command = path.commands[i];
					switch(command) {
					case 1:
						this.moveTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 2:
						this.lineTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 3:
						this.curveTo(path.data[j],path.data[j + 1],path.data[j + 2],path.data[j + 3]);
						j = j + 4;
						break;
					}
				}
				break;
			case flash.display.GraphicsDataType.SOLID:
				var fill = data;
				this.beginFill(fill.color,fill.alpha);
				break;
			case flash.display.GraphicsDataType.GRADIENT:
				var fill = data;
				this.beginGradientFill(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
				break;
			}
		}
	}
	,drawEllipse: function(x,y,rx,ry) {
		this.closePolygon(false);
		rx /= 2;
		ry /= 2;
		this.nmeDrawEllipse(x + rx,y + ry,rx,ry);
		this.closePolygon(false);
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.nmeDrawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,createGradient: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		var points = new Array();
		var _g1 = 0, _g = colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			points.push(new flash.display.GradPoint(colors[i],alphas[i],ratios[i]));
		}
		var flags = 0;
		if(type == flash.display.GradientType.RADIAL) flags |= 1;
		if(spreadMethod == flash.display.SpreadMethod.REPEAT) flags |= 2; else if(spreadMethod == flash.display.SpreadMethod.REFLECT) flags |= 4;
		if(matrix == null) {
			matrix = new flash.geom.Matrix();
			matrix.createGradientBox(25,25);
		} else matrix = matrix.clone();
		var focal = focalPointRatio == null?0:focalPointRatio;
		return new flash.display.Grad(points,matrix,flags,focal);
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new flash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new flash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new flash.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.nmeChanged = true;
	}
	,clear: function() {
		this.nmeClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.nmeClearNextCycle = true;
		this.boundsDirty = true;
		this.nmeExtent.x = 0.0;
		this.nmeExtent.y = 0.0;
		this.nmeExtent.width = 0.0;
		this.nmeExtent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,blit: function(inTexture) {
		this.closePolygon(true);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) ctx.drawImage(inTexture._nmeTextureBuffer,this.mPenX,this.mPenY);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.closePolygon(true);
		this.mFilling = true;
		this.mBitmap = null;
		this.mSolidGradient = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,beginBitmapFill: function(bitmap,matrix,in_repeat,in_smooth) {
		if(in_smooth == null) in_smooth = false;
		if(in_repeat == null) in_repeat = true;
		this.closePolygon(true);
		var repeat = in_repeat == null?true:in_repeat;
		var smooth = in_smooth == null?false:in_smooth;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.nmeExpandStandardExtent(bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.width:0,bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.height:0);
		this.mBitmap = { texture_buffer : bitmap._nmeTextureBuffer, matrix : matrix == null?matrix:matrix.clone(), flags : (repeat?16:0) | (smooth?65536:0)};
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new flash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,__class__: flash.display.Graphics
}
flash.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["flash.display.Drawable"] = flash.display.Drawable;
flash.display.Drawable.__name__ = ["flash","display","Drawable"];
flash.display.Drawable.prototype = {
	__class__: flash.display.Drawable
}
flash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["flash.display.GfxPoint"] = flash.display.GfxPoint;
flash.display.GfxPoint.__name__ = ["flash","display","GfxPoint"];
flash.display.GfxPoint.prototype = {
	__class__: flash.display.GfxPoint
}
flash.display.Grad = function(inPoints,inMatrix,inFlags,inFocal) {
	this.points = inPoints;
	this.matrix = inMatrix;
	this.flags = inFlags;
	this.focal = inFocal;
};
$hxClasses["flash.display.Grad"] = flash.display.Grad;
flash.display.Grad.__name__ = ["flash","display","Grad"];
flash.display.Grad.prototype = {
	__class__: flash.display.Grad
}
flash.display.GradPoint = function(inCol,inAlpha,inRatio) {
	this.col = inCol;
	this.alpha = inAlpha;
	this.ratio = inRatio;
};
$hxClasses["flash.display.GradPoint"] = flash.display.GradPoint;
flash.display.GradPoint.__name__ = ["flash","display","GradPoint"];
flash.display.GradPoint.prototype = {
	__class__: flash.display.GradPoint
}
flash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["flash.display.LineJob"] = flash.display.LineJob;
flash.display.LineJob.__name__ = ["flash","display","LineJob"];
flash.display.LineJob.prototype = {
	__class__: flash.display.LineJob
}
flash.display.PointInPathMode = $hxClasses["flash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
flash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
flash.display.PointInPathMode.USER_SPACE.toString = $estr;
flash.display.PointInPathMode.USER_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
flash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
flash.display.PointInPathMode.DEVICE_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["flash.display.TileJob"] = flash.display.TileJob;
flash.display.TileJob.__name__ = ["flash","display","TileJob"];
flash.display.TileJob.prototype = {
	__class__: flash.display.TileJob
}
flash.display.IGraphicsFill = function() { }
$hxClasses["flash.display.IGraphicsFill"] = flash.display.IGraphicsFill;
flash.display.IGraphicsFill.__name__ = ["flash","display","IGraphicsFill"];
flash.display.IGraphicsFill.prototype = {
	__class__: flash.display.IGraphicsFill
}
flash.display.IGraphicsData = function() { }
$hxClasses["flash.display.IGraphicsData"] = flash.display.IGraphicsData;
flash.display.IGraphicsData.__name__ = ["flash","display","IGraphicsData"];
flash.display.IGraphicsData.prototype = {
	__class__: flash.display.IGraphicsData
}
flash.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) focalPointRatio = 0;
	this.type = type;
	this.colors = colors;
	this.alphas = alphas;
	this.ratios = ratios;
	this.matrix = matrix;
	this.spreadMethod = spreadMethod;
	this.interpolationMethod = interpolationMethod;
	this.focalPointRatio = focalPointRatio;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.GRADIENT;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.GRADIENT_FILL;
};
$hxClasses["flash.display.GraphicsGradientFill"] = flash.display.GraphicsGradientFill;
flash.display.GraphicsGradientFill.__name__ = ["flash","display","GraphicsGradientFill"];
flash.display.GraphicsGradientFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsGradientFill.prototype = {
	__class__: flash.display.GraphicsGradientFill
}
flash.display.IGraphicsPath = function() { }
$hxClasses["flash.display.IGraphicsPath"] = flash.display.IGraphicsPath;
flash.display.IGraphicsPath.__name__ = ["flash","display","IGraphicsPath"];
flash.display.GraphicsPath = function(commands,data,winding) {
	this.commands = commands;
	this.data = data;
	this.winding = winding;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.PATH;
};
$hxClasses["flash.display.GraphicsPath"] = flash.display.GraphicsPath;
flash.display.GraphicsPath.__name__ = ["flash","display","GraphicsPath"];
flash.display.GraphicsPath.__interfaces__ = [flash.display.IGraphicsPath,flash.display.IGraphicsData];
flash.display.GraphicsPath.prototype = {
	moveTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,1);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,lineTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,2);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,3);
			flash._Vector.Vector_Impl_.push(this.data,anchorX);
			flash._Vector.Vector_Impl_.push(this.data,anchorY);
			flash._Vector.Vector_Impl_.push(this.data,controlX);
			flash._Vector.Vector_Impl_.push(this.data,controlY);
		}
	}
	,__class__: flash.display.GraphicsPath
}
flash.display.GraphicsPathCommand = function() { }
$hxClasses["flash.display.GraphicsPathCommand"] = flash.display.GraphicsPathCommand;
flash.display.GraphicsPathCommand.__name__ = ["flash","display","GraphicsPathCommand"];
flash.display.GraphicsPathWinding = $hxClasses["flash.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] }
flash.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
flash.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
flash.display.GraphicsPathWinding.EVEN_ODD.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
flash.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
flash.display.GraphicsPathWinding.NON_ZERO.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	this.alpha = alpha;
	this.color = color;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.SOLID;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.SOLID_FILL;
};
$hxClasses["flash.display.GraphicsSolidFill"] = flash.display.GraphicsSolidFill;
flash.display.GraphicsSolidFill.__name__ = ["flash","display","GraphicsSolidFill"];
flash.display.GraphicsSolidFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsSolidFill.prototype = {
	__class__: flash.display.GraphicsSolidFill
}
flash.display.IGraphicsStroke = function() { }
$hxClasses["flash.display.IGraphicsStroke"] = flash.display.IGraphicsStroke;
flash.display.IGraphicsStroke.__name__ = ["flash","display","IGraphicsStroke"];
flash.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) miterLimit = 3;
	if(pixelHinting == null) pixelHinting = false;
	if(thickness == null) thickness = 0.0;
	this.caps = caps != null?caps:null;
	this.fill = fill;
	this.joints = joints != null?joints:null;
	this.miterLimit = miterLimit;
	this.pixelHinting = pixelHinting;
	this.scaleMode = scaleMode != null?scaleMode:null;
	this.thickness = thickness;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.STROKE;
};
$hxClasses["flash.display.GraphicsStroke"] = flash.display.GraphicsStroke;
flash.display.GraphicsStroke.__name__ = ["flash","display","GraphicsStroke"];
flash.display.GraphicsStroke.__interfaces__ = [flash.display.IGraphicsStroke,flash.display.IGraphicsData];
flash.display.GraphicsStroke.prototype = {
	__class__: flash.display.GraphicsStroke
}
flash.display.GraphicsDataType = $hxClasses["flash.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
flash.display.GraphicsDataType.STROKE = ["STROKE",0];
flash.display.GraphicsDataType.STROKE.toString = $estr;
flash.display.GraphicsDataType.STROKE.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.SOLID = ["SOLID",1];
flash.display.GraphicsDataType.SOLID.toString = $estr;
flash.display.GraphicsDataType.SOLID.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
flash.display.GraphicsDataType.GRADIENT.toString = $estr;
flash.display.GraphicsDataType.GRADIENT.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.PATH = ["PATH",3];
flash.display.GraphicsDataType.PATH.toString = $estr;
flash.display.GraphicsDataType.PATH.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsFillType = $hxClasses["flash.display.GraphicsFillType"] = { __ename__ : true, __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
flash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
flash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
flash.display.GraphicsFillType.SOLID_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
flash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
flash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.InterpolationMethod = $hxClasses["flash.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] }
flash.display.InterpolationMethod.RGB = ["RGB",0];
flash.display.InterpolationMethod.RGB.toString = $estr;
flash.display.InterpolationMethod.RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
flash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
flash.display.InterpolationMethod.LINEAR_RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.JointStyle = $hxClasses["flash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
flash.display.JointStyle.MITER = ["MITER",0];
flash.display.JointStyle.MITER.toString = $estr;
flash.display.JointStyle.MITER.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.ROUND = ["ROUND",1];
flash.display.JointStyle.ROUND.toString = $estr;
flash.display.JointStyle.ROUND.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.BEVEL = ["BEVEL",2];
flash.display.JointStyle.BEVEL.toString = $estr;
flash.display.JointStyle.BEVEL.__enum__ = flash.display.JointStyle;
flash.display.LineScaleMode = $hxClasses["flash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
flash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
flash.display.LineScaleMode.HORIZONTAL.toString = $estr;
flash.display.LineScaleMode.HORIZONTAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NONE = ["NONE",1];
flash.display.LineScaleMode.NONE.toString = $estr;
flash.display.LineScaleMode.NONE.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NORMAL = ["NORMAL",2];
flash.display.LineScaleMode.NORMAL.toString = $estr;
flash.display.LineScaleMode.NORMAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
flash.display.LineScaleMode.VERTICAL.toString = $estr;
flash.display.LineScaleMode.VERTICAL.__enum__ = flash.display.LineScaleMode;
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	handleLoad: function(e) {
		e.currentTarget = this;
		this.content.nmeInvalidateBounds();
		this.content.nmeRender(null,null);
		this.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.Sprite.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new flash.geom.Rectangle(0,0,this.mImage.get_width(),this.mImage.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this._nmeId + "]";
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event(flash.events.Event.COMPLETE);
				evt.currentTarget = _g;
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
		}
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,__class__: flash.display.Loader
});
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(ldr) {
	var li = new flash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
}
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__class__: flash.display.LoaderInfo
});
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.__currentFrame = 0;
	this.__totalFrames = 0;
	this.loaderInfo = flash.display.LoaderInfo.create(null);
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	get_totalFrames: function() {
		return this.__totalFrames;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stop: function() {
	}
	,prevFrame: function() {
	}
	,play: function() {
	}
	,nextFrame: function() {
	}
	,gotoAndStop: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,gotoAndPlay: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,__class__: flash.display.MovieClip
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_currentFrame:"get_currentFrame",get_framesLoaded:"get_framesLoaded",get_totalFrames:"get_totalFrames"})
});
flash.display.PixelSnapping = $hxClasses["flash.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
flash.display.PixelSnapping.NEVER = ["NEVER",0];
flash.display.PixelSnapping.NEVER.toString = $estr;
flash.display.PixelSnapping.NEVER.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.AUTO = ["AUTO",1];
flash.display.PixelSnapping.AUTO.toString = $estr;
flash.display.PixelSnapping.AUTO.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
flash.display.PixelSnapping.ALWAYS.toString = $estr;
flash.display.PixelSnapping.ALWAYS.__enum__ = flash.display.PixelSnapping;
flash.display.Shape = function() {
	flash.display.DisplayObject.call(this);
	this.nmeGraphics = new flash.display.Graphics();
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	get_graphics: function() {
		return this.nmeGraphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: flash.display.Shape
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
flash.display.SpreadMethod = $hxClasses["flash.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] }
flash.display.SpreadMethod.REPEAT = ["REPEAT",0];
flash.display.SpreadMethod.REPEAT.toString = $estr;
flash.display.SpreadMethod.REPEAT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.REFLECT = ["REFLECT",1];
flash.display.SpreadMethod.REFLECT.toString = $estr;
flash.display.SpreadMethod.REFLECT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.PAD = ["PAD",2];
flash.display.SpreadMethod.PAD.toString = $estr;
flash.display.SpreadMethod.PAD.__enum__ = flash.display.SpreadMethod;
flash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.nmeIsCancelled = false;
	this.nmeIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = flash.events.EventPhase.AT_TARGET;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,stopPropagation: function() {
		this.nmeIsCancelled = true;
	}
	,stopImmediatePropagation: function() {
		this.nmeIsCancelled = true;
		this.nmeIsCancelledNow = true;
	}
	,nmeSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,nmeGetIsCancelledNow: function() {
		return this.nmeIsCancelledNow;
	}
	,nmeGetIsCancelled: function() {
		return this.nmeIsCancelled;
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,__class__: flash.events.Event
}
flash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.nmeCreate = function(type,event,local,target) {
	var nmeMouseDown = false;
	var delta = 2;
	if(type == flash.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == flash.events.MouseEvent.MOUSE_DOWN) nmeMouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == flash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) nmeMouseDown = false; else if(event.button != null) {
				if(event.button == 0) nmeMouseDown = false; else nmeMouseDown = false;
			}
		}
	}
	var pseudoEvent = new flash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,nmeMouseDown,delta);
	pseudoEvent.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.MouseEvent
});
flash.display.Stage = function(width,height) {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeFocusObject = null;
	this.nmeFocusObjectActivated = false;
	this.nmeWindowWidth = width;
	this.nmeWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = flash.display.StageScaleMode.SHOW_ALL;
	this.nmeStageMatrix = new flash.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = flash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.nmeWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.nmeWindowHeight);
	this.nmePointInPathMode = flash.display.Graphics.nmeDetectIsPointInPathMode();
	this.nmeMouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.nmeTouchInfo = [];
	this.nmeUIEventsQueue = new Array(1000);
	this.nmeUIEventsQueueIndex = 0;
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.getOrientation = function() {
	var rotation = window.orientation;
	var orientation = flash.display.Stage.OrientationPortrait;
	switch(rotation) {
	case -90:
		orientation = flash.display.Stage.OrientationLandscapeLeft;
		break;
	case 180:
		orientation = flash.display.Stage.OrientationPortraitUpsideDown;
		break;
	case 90:
		orientation = flash.display.Stage.OrientationLandscapeRight;
		break;
	default:
		orientation = flash.display.Stage.OrientationPortrait;
	}
	return orientation;
}
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	get_stageWidth: function() {
		return this.nmeWindowWidth;
	}
	,get_stageHeight: function() {
		return this.nmeWindowHeight;
	}
	,get_stage: function() {
		return flash.Lib.nmeGetStage();
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.nmeShowDefaultContextMenu && this.nmeShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) flash.Lib.nmeDisableRightClick(); else flash.Lib.nmeEnableRightClick();
		}
		this.nmeShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,get_showDefaultContextMenu: function() {
		return this.nmeShowDefaultContextMenu;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_quality: function() {
		return this.quality != null?this.quality:flash.display.StageQuality.BEST;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,get_fullScreenHeight: function() {
		return js.Browser.window.innerHeight;
	}
	,get_fullScreenWidth: function() {
		return js.Browser.window.innerWidth;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var window = js.Browser.window;
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(nmeRequestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) this.nmeInterval = 1000.0 / speed | 0;
		this.nmeFrameRate = speed;
		this.nmeUpdateNextWake();
		return speed;
	}
	,get_frameRate: function() {
		return this.nmeFrameRate;
	}
	,set_focus: function(inObj) {
		this.nmeOnFocus(inObj);
		return this.nmeFocusObject;
	}
	,get_focus: function() {
		return this.nmeFocusObject;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 0:
				flash.Lib.nmeDisableFullScreen();
				break;
			case 1:
			case 2:
				flash.Lib.nmeEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,get_displayState: function() {
		return this.displayState;
	}
	,set_backgroundColor: function(col) {
		return this.nmeBackgroundColour = col;
	}
	,get_backgroundColor: function() {
		return this.nmeBackgroundColour;
	}
	,nmeOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var point = new flash.geom.Point(touch.pageX - flash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,touch.pageY - flash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
			obj.nmeFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case "touchBegin":
					$r = flash.events.MouseEvent.MOUSE_DOWN;
					break;
				case "touchEnd":
					$r = flash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.nmeDragObject != null) $this.nmeDrag(point);
						$r = flash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.nmeFireEvent(flash.events.MouseEvent.nmeCreate(mouseType,evt,local,obj));
		} else {
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
		}
	}
	,nmeOnResize: function(inW,inH) {
		this.nmeWindowWidth = inW;
		this.nmeWindowHeight = inH;
		var event = new flash.events.Event(flash.events.Event.RESIZE);
		event.target = this;
		this.nmeBroadcast(event);
	}
	,nmeOnMouse: function(event,type) {
		var point = new flash.geom.Point(event.clientX - flash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,event.clientY - flash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		if(this.nmeDragObject != null) this.nmeDrag(point);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.MouseEvent.nmeCreate(type,event,local,obj);
			this.nmeCheckInOuts(evt,stack);
			if(type == flash.events.MouseEvent.MOUSE_DOWN) this.nmeOnFocus(stack[stack.length - 1]);
			obj.nmeFireEvent(evt);
		} else {
			var evt = flash.events.MouseEvent.nmeCreate(type,event,point,null);
			this.nmeCheckInOuts(evt,stack);
		}
	}
	,nmeOnFocus: function(target) {
		if(target != this.nmeFocusObject) {
			if(this.nmeFocusObject != null) this.nmeFocusObject.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT,true,false,this.nmeFocusObject,false,0));
			target.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN,true,false,target,false,0));
			this.nmeFocusObject = target;
		}
	}
	,nmeOnKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var stack = new Array();
		if(this.nmeFocusObject == null) this.nmeGetInteractiveObjectStack(stack); else this.nmeFocusObject.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			var obj = stack[0];
			var evt = new flash.events.KeyboardEvent(pressed?flash.events.KeyboardEvent.KEY_DOWN:flash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
			obj.nmeFireEvent(evt);
		}
	}
	,nmeHandleOrientationChange: function() {
	}
	,nmeHandleAccelerometer: function(evt) {
		flash.display.Stage.nmeAcceleration.x = evt.accelerationIncludingGravity.x;
		flash.display.Stage.nmeAcceleration.y = evt.accelerationIncludingGravity.y;
		flash.display.Stage.nmeAcceleration.z = evt.accelerationIncludingGravity.z;
	}
	,toString: function() {
		return "[Stage id=" + this._nmeId + "]";
	}
	,nmeUpdateNextWake: function() {
		if(this.nmeFrameRate == 0) {
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			nmeRequestAnimationFrame($bind(this,this.nmeUpdateNextWake));
			this.nmeStageRender();
		} else {
			js.Browser.window.clearInterval(this.nmeTimer);
			this.nmeTimer = js.Browser.window.setInterval($bind(this,this.nmeStageRender),this.nmeInterval);
		}
	}
	,nmeStopDrag: function(sprite) {
		this.nmeDragBounds = null;
		this.nmeDragObject = null;
	}
	,nmeStartDrag: function(sprite,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		this.nmeDragBounds = bounds == null?null:bounds.clone();
		this.nmeDragObject = sprite;
		if(this.nmeDragObject != null) {
			var mouse = new flash.geom.Point(this._mouseX,this._mouseY);
			var p = this.nmeDragObject.parent;
			if(p != null) mouse = p.globalToLocal(mouse);
			if(lockCenter) {
				var bounds1 = sprite.getBounds(this);
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - (bounds1.width / 2 + bounds1.x);
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - (bounds1.height / 2 + bounds1.y);
			} else {
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - mouse.x;
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - mouse.y;
			}
		}
	}
	,nmeStageRender: function(_) {
		if(!this.nmeStageActive) {
			this.nmeOnResize(this.nmeWindowWidth,this.nmeWindowHeight);
			var event = new flash.events.Event(flash.events.Event.ACTIVATE);
			event.target = this;
			this.nmeBroadcast(event);
			this.nmeStageActive = true;
		}
		var _g1 = 0, _g = this.nmeUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeUIEventsQueue[i] != null) this.nmeProcessStageEvent(this.nmeUIEventsQueue[i]);
		}
		this.nmeUIEventsQueueIndex = 0;
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		this.nmeBroadcast(event);
		if(this.nmeInvalid) {
			var event1 = new flash.events.Event(flash.events.Event.RENDER);
			this.nmeBroadcast(event1);
		}
		this.nmeRenderAll();
	}
	,nmeRenderToCanvas: function(canvas) {
		canvas.width = canvas.width;
		this.nmeRender(canvas);
	}
	,nmeRenderAll: function() {
		this.nmeRender(null,null);
	}
	,nmeQueueStageEvent: function(evt) {
		this.nmeUIEventsQueue[this.nmeUIEventsQueueIndex++] = evt;
	}
	,nmeProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.nmeOnResize(flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
			break;
		case "focus":
			this.nmeOnFocus(this);
			if(!this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = true;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.ACTIVATE));
			}
			break;
		case "blur":
			if(this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = false;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.DEACTIVATE));
			}
			break;
		case "mousemove":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.nmeOnMouse(evt,flash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.nmeOnMouse(evt,flash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new flash.display._Stage.TouchInfo();
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.nmeHandleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.nmeHandleOrientationChange();
			break;
		default:
		}
	}
	,nmeIsOnStage: function() {
		return true;
	}
	,nmeDrag: function(point) {
		var p = this.nmeDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.nmeDragOffsetX;
		var y = point.y + this.nmeDragOffsetY;
		if(this.nmeDragBounds != null) {
			if(x < this.nmeDragBounds.x) x = this.nmeDragBounds.x; else if(x > this.nmeDragBounds.get_right()) x = this.nmeDragBounds.get_right();
			if(y < this.nmeDragBounds.y) y = this.nmeDragBounds.y; else if(y > this.nmeDragBounds.get_bottom()) y = this.nmeDragBounds.get_bottom();
		}
		this.nmeDragObject.set_x(x);
		this.nmeDragObject.set_y(y);
	}
	,nmeCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.nmeMouseOverObjects:touchInfo.touchOverObjects;
		var changeEvents = touchInfo == null?flash.display.Stage.nmeMouseChanges:flash.display.Stage.nmeTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.nmeCreateSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.nmeCreateSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.nmeMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,invalidate: function() {
		this.nmeInvalid = true;
	}
	,__class__: flash.display.Stage
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_displayState:"set_displayState",get_displayState:"get_displayState",set_focus:"set_focus",get_focus:"get_focus",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",get_fullScreenHeight:"get_fullScreenHeight",get_fullScreenWidth:"get_fullScreenWidth",set_quality:"set_quality",get_quality:"get_quality",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",get_stageHeight:"get_stageHeight",get_stageWidth:"get_stageWidth"})
});
flash.display._Stage = {}
flash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["flash.display._Stage.TouchInfo"] = flash.display._Stage.TouchInfo;
flash.display._Stage.TouchInfo.__name__ = ["flash","display","_Stage","TouchInfo"];
flash.display._Stage.TouchInfo.prototype = {
	__class__: flash.display._Stage.TouchInfo
}
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] }
flash.display.StageDisplayState.NORMAL = ["NORMAL",0];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageQuality = function() { }
$hxClasses["flash.display.StageQuality"] = flash.display.StageQuality;
flash.display.StageQuality.__name__ = ["flash","display","StageQuality"];
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.errors = {}
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,__class__: flash.errors.Error
}
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text) {
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = flash.events.Listener.sIDs++;
};
$hxClasses["flash.events.Listener"] = flash.events.Listener;
flash.events.Listener.__name__ = ["flash","events","Listener"];
flash.events.Listener.prototype = {
	Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: flash.events.Listener
}
flash.events.EventPhase = function() { }
$hxClasses["flash.events.EventPhase"] = flash.events.EventPhase;
flash.events.EventPhase.__name__ = ["flash","events","EventPhase"];
flash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["flash.events.FocusEvent"] = flash.events.FocusEvent;
flash.events.FocusEvent.__name__ = ["flash","events","FocusEvent"];
flash.events.FocusEvent.__super__ = flash.events.Event;
flash.events.FocusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.FocusEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.IOErrorEvent
});
flash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.altKey = inAltKey == null?false:inAltKey;
	this.charCode = inCharCode == null?0:inCharCode;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
	this.commandKey = commandKeyValue;
	this.controlKey = controlKeyValue;
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
};
$hxClasses["flash.events.KeyboardEvent"] = flash.events.KeyboardEvent;
flash.events.KeyboardEvent.__name__ = ["flash","events","KeyboardEvent"];
flash.events.KeyboardEvent.__super__ = flash.events.Event;
flash.events.KeyboardEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.KeyboardEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["flash.events.TouchEvent"] = flash.events.TouchEvent;
flash.events.TouchEvent.__name__ = ["flash","events","TouchEvent"];
flash.events.TouchEvent.nmeCreate = function(type,event,touch,local,target) {
	var evt = new flash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
flash.events.TouchEvent.__super__ = flash.events.Event;
flash.events.TouchEvent.prototype = $extend(flash.events.Event.prototype,{
	nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.TouchEvent
});
flash.filters = {}
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,nmePreFilter: function(surface) {
	}
	,clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,__class__: flash.filters.BitmapFilter
}
flash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	flash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this._nmeCached = false;
};
$hxClasses["flash.filters.DropShadowFilter"] = flash.filters.DropShadowFilter;
flash.filters.DropShadowFilter.__name__ = ["flash","filters","DropShadowFilter"];
flash.filters.DropShadowFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.DropShadowFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this._nmeCached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "rgba(" + (this.color >> 16 & 255) + "," + (this.color >> 8 & 255) + "," + (this.color & 255) + "," + this.alpha + ")";
			this._nmeCached = true;
		}
	}
	,clone: function() {
		return new flash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: flash.filters.DropShadowFilter
});
flash.geom = {}
flash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,__class__: flash.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
flash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new flash.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,transformPoint: function(inPos) {
		return new flash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,to3DString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", " + "0, 1" + ")";
	}
	,setRotation: function(inTheta,inScale) {
		if(inScale == null) inScale = 1;
		var scale = inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTranslateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTransformY: function(inPos) {
		return inPos.x * this.b + inPos.y * this.d + this.ty;
	}
	,nmeTransformX: function(inPos) {
		return inPos.x * this.a + inPos.y * this.c + this.tx;
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		if(in_ty == null) in_ty = 0;
		if(in_tx == null) in_tx = 0;
		if(rotation == null) rotation = 0;
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.set_tx(in_tx != null?in_tx + in_width / 2:in_width / 2);
		this.set_ty(in_ty != null?in_ty + in_height / 2:in_height / 2);
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,__class__: flash.geom.Matrix
	,__properties__: {set_tx:"set_tx",set_ty:"set_ty"}
}
flash.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
flash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new flash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
flash.geom.Point.polar = function(len,angle) {
	return new flash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
flash.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,subtract: function(v) {
		return new flash.geom.Point(this.x - v.x,this.y - v.y);
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,add: function(v) {
		return new flash.geom.Point(v.x + this.x,v.y + this.y);
	}
	,__class__: flash.geom.Point
	,__properties__: {get_length:"get_length"}
}
flash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new flash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new flash.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new flash.geom.Rectangle();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,__class__: flash.geom.Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_left:"set_left",get_left:"get_left",set_right:"set_right",get_right:"get_right",set_size:"set_size",get_size:"get_size",set_top:"set_top",get_top:"get_top",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft"}
}
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.nmeMatrixOverridden();
		return this._matrix;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,get_concatenatedMatrix: function() {
		return this.nmeGetFullMatrix(this._matrix);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,nmeSetMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,__class__: flash.geom.Transform
	,__properties__: {set_colorTransform:"set_colorTransform",get_concatenatedMatrix:"get_concatenatedMatrix",set_matrix:"set_matrix",get_matrix:"get_matrix",get_pixelBounds:"get_pixelBounds"}
}
flash.media = {}
flash.media.Sound = function(stream,context) {
	flash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.nmeSoundChannels = new haxe.ds.IntMap();
	this.nmeSoundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.nmeCanPlayMime = function(mime) {
	var audio = js.Browser.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	return playable(audio.canPlayType(mime,null));
}
flash.media.Sound.nmeCanPlayType = function(extension) {
	var mime = flash.media.Sound.nmeMimeForExtension(extension);
	if(mime == null) return false;
	return flash.media.Sound.nmeCanPlayMime(mime);
}
flash.media.Sound.nmeMimeForExtension = function(extension) {
	var mime = null;
	switch(extension) {
	case "mp3":
		mime = "audio/mpeg";
		break;
	case "ogg":
		mime = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime = null;
	}
	return mime;
}
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeOnSoundLoaded: function(evt) {
		this.nmeRemoveEventListeners();
		var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
		this.dispatchEvent(evt1);
	}
	,nmeOnSoundLoadError: function(evt) {
		this.nmeRemoveEventListeners();
		console.log("Error loading sound '" + this.nmeStreamUrl + "'");
		var evt1 = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		this.dispatchEvent(evt1);
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(this.nmeStreamUrl == null) return null;
		var self = this;
		var curIdx = this.nmeSoundIdx;
		var removeRef = function() {
			self.nmeSoundChannels.remove(curIdx);
		};
		var channel = flash.media.SoundChannel.nmeCreate(this.nmeStreamUrl,startTime,loops,sndTransform,removeRef);
		this.nmeSoundChannels.set(curIdx,channel);
		this.nmeSoundIdx++;
		var audio = channel.nmeAudio;
		return channel;
	}
	,nmeRemoveEventListeners: function() {
		this.nmeSoundCache.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded),false);
		this.nmeSoundCache.removeEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError),false);
	}
	,nmeLoad: function(stream,context,mime) {
		if(mime == null) mime = "";
		if(mime == null) {
			var url = stream.url.split("?");
			var extension = HxOverrides.substr(url[0],url[0].lastIndexOf(".") + 1,null);
			mime = flash.media.Sound.nmeMimeForExtension(extension);
		}
		if(mime == null || !flash.media.Sound.nmeCanPlayMime(mime)) console.log("Warning: '" + stream.url + "' with type '" + mime + "' may not play on this browser.");
		this.nmeStreamUrl = stream.url;
		try {
			this.nmeSoundCache = new flash.net.URLLoader();
			this.nmeAddEventListeners();
			this.nmeSoundCache.load(stream);
		} catch( e ) {
			console.log("Warning: Could not preload '" + stream.url + "'");
		}
	}
	,nmeAddEventListeners: function() {
		this.nmeSoundCache.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded));
		this.nmeSoundCache.addEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError));
	}
	,load: function(stream,context) {
		this.nmeLoad(stream,context);
	}
	,close: function() {
	}
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	flash.events.EventDispatcher.call(this,this);
	this.ChannelId = -1;
	this.leftPeak = 0.;
	this.position = 0.;
	this.rightPeak = 0.;
	this.nmeAudioCurrentLoop = 1;
	this.nmeAudioTotalLoops = 1;
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.nmeCreate = function(src,startTime,loops,sndTransform,removeRef) {
	if(loops == null) loops = 0;
	if(startTime == null) startTime = 0.0;
	var channel = new flash.media.SoundChannel();
	channel.nmeAudio = js.Browser.document.createElement("audio");
	channel.nmeRemoveRef = removeRef;
	channel.nmeAudio.addEventListener("ended",$bind(channel,channel.__onSoundChannelFinished),false);
	channel.nmeAudio.addEventListener("seeked",$bind(channel,channel.__onSoundSeeked),false);
	channel.nmeAudio.addEventListener("stalled",$bind(channel,channel.__onStalled),false);
	channel.nmeAudio.addEventListener("progress",$bind(channel,channel.__onProgress),false);
	if(loops > 0) {
		channel.nmeAudioTotalLoops = loops;
		channel.nmeAudio.loop = true;
	}
	channel.nmeStartTime = startTime;
	if(startTime > 0.) {
		var onLoad = null;
		onLoad = function(_) {
			channel.nmeAudio.currentTime = channel.nmeStartTime;
			channel.nmeAudio.play();
			channel.nmeAudio.removeEventListener("canplaythrough",onLoad,false);
		};
		channel.nmeAudio.addEventListener("canplaythrough",onLoad,false);
	} else channel.nmeAudio.autoplay = true;
	channel.nmeAudio.src = src;
	return channel;
}
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_soundTransform: function(v) {
		this.nmeAudio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__onStalled: function(evt) {
		console.log("sound stalled");
		if(this.nmeAudio != null) this.nmeAudio.load();
	}
	,__onSoundSeeked: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.loop = false;
			this.stop();
		} else this.nmeAudioCurrentLoop++;
	}
	,__onSoundChannelFinished: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.removeEventListener("ended",$bind(this,this.__onSoundChannelFinished),false);
			this.nmeAudio.removeEventListener("seeked",$bind(this,this.__onSoundSeeked),false);
			this.nmeAudio.removeEventListener("stalled",$bind(this,this.__onStalled),false);
			this.nmeAudio.removeEventListener("progress",$bind(this,this.__onProgress),false);
			this.nmeAudio = null;
			var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
			evt1.target = this;
			this.dispatchEvent(evt1);
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		} else {
			this.nmeAudio.currentTime = this.nmeStartTime;
			this.nmeAudio.play();
		}
	}
	,__onProgress: function(evt) {
		console.log("sound progress: " + Std.string(evt));
	}
	,stop: function() {
		if(this.nmeAudio != null) {
			this.nmeAudio.pause();
			this.nmeAudio = null;
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		}
	}
	,__class__: flash.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	__class__: flash.media.SoundLoaderContext
}
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	__class__: flash.media.SoundTransform
}
flash.net = {}
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	onStatus: function(status) {
		var evt = new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new flash.events.Event(flash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			this.data = flash.utils.ByteArray.nmeOfBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new flash.events.Event(flash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			var _g = this;
			switch( (_g.dataFormat)[1] ) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g1 = 0;
		while(_g1 < requestHeaders.length) {
			var header = requestHeaders[_g1];
			++_g1;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,getData: function() {
		return null;
	}
	,close: function() {
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == flash.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(js.Browser.window,"ArrayBuffer")) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: flash.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = flash.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == flash.net.URLRequestMethod.GET || this.data == null) return res;
		if(js.Boot.__instanceof(this.data,String) || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) {
			res = res.slice();
			res.push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: flash.net.URLRequest
}
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	__class__: flash.net.URLRequestHeader
}
flash.net.URLRequestMethod = function() { }
$hxClasses["flash.net.URLRequestMethod"] = flash.net.URLRequestMethod;
flash.net.URLRequestMethod.__name__ = ["flash","net","URLRequestMethod"];
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(StringTools.urlEncode(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: flash.net.URLVariables
}
flash.system = {}
flash.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.ApplicationDomain"] = flash.system.ApplicationDomain;
flash.system.ApplicationDomain.__name__ = ["flash","system","ApplicationDomain"];
flash.system.ApplicationDomain.prototype = {
	hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,__class__: flash.system.ApplicationDomain
}
flash.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.LoaderContext"] = flash.system.LoaderContext;
flash.system.LoaderContext.__name__ = ["flash","system","LoaderContext"];
flash.system.LoaderContext.prototype = {
	__class__: flash.system.LoaderContext
}
flash.system.SecurityDomain = function() {
};
$hxClasses["flash.system.SecurityDomain"] = flash.system.SecurityDomain;
flash.system.SecurityDomain.__name__ = ["flash","system","SecurityDomain"];
flash.system.SecurityDomain.prototype = {
	__class__: flash.system.SecurityDomain
}
flash.text.FontStyle = $hxClasses["flash.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] }
flash.text.FontStyle.REGULAR = ["REGULAR",0];
flash.text.FontStyle.REGULAR.toString = $estr;
flash.text.FontStyle.REGULAR.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.ITALIC = ["ITALIC",1];
flash.text.FontStyle.ITALIC.toString = $estr;
flash.text.FontStyle.ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
flash.text.FontStyle.BOLD_ITALIC.toString = $estr;
flash.text.FontStyle.BOLD_ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD = ["BOLD",3];
flash.text.FontStyle.BOLD.toString = $estr;
flash.text.FontStyle.BOLD.__enum__ = flash.text.FontStyle;
flash.text.FontType = $hxClasses["flash.text.FontType"] = { __ename__ : true, __constructs__ : ["EMBEDDED","DEVICE"] }
flash.text.FontType.EMBEDDED = ["EMBEDDED",0];
flash.text.FontType.EMBEDDED.toString = $estr;
flash.text.FontType.EMBEDDED.__enum__ = flash.text.FontType;
flash.text.FontType.DEVICE = ["DEVICE",1];
flash.text.FontType.DEVICE.toString = $estr;
flash.text.FontType.DEVICE.__enum__ = flash.text.FontType;
flash.text.GridFitType = $hxClasses["flash.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] }
flash.text.GridFitType.NONE = ["NONE",0];
flash.text.GridFitType.NONE.toString = $estr;
flash.text.GridFitType.NONE.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.PIXEL = ["PIXEL",1];
flash.text.GridFitType.PIXEL.toString = $estr;
flash.text.GridFitType.PIXEL.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.SUBPIXEL = ["SUBPIXEL",2];
flash.text.GridFitType.SUBPIXEL.toString = $estr;
flash.text.GridFitType.SUBPIXEL.__enum__ = flash.text.GridFitType;
flash.text.TextField = function() {
	flash.display.InteractiveObject.call(this);
	this.mWidth = 100;
	this.mHeight = 20;
	this.mHTMLMode = false;
	this.multiline = false;
	this.nmeGraphics = new flash.display.Graphics();
	this.mFace = flash.text.TextField.mDefaultFont;
	this.mAlign = flash.text.TextFormatAlign.LEFT;
	this.mParagraphs = new Array();
	this.mSelStart = -1;
	this.mSelEnd = -1;
	this.scrollH = 0;
	this.scrollV = 1;
	this.mType = flash.text.TextFieldType.DYNAMIC;
	this.set_autoSize("NONE");
	this.mTextHeight = 12;
	this.mMaxHeight = this.mTextHeight;
	this.mHTMLText = " ";
	this.mText = " ";
	this.mTextColour = 0;
	this.tabEnabled = false;
	this.mTryFreeType = true;
	this.selectable = true;
	this.mInsertPos = 0;
	this.nmeInputEnabled = false;
	this.mDownChar = 0;
	this.mSelectDrag = -1;
	this.mLineInfo = [];
	this.set_defaultTextFormat(new flash.text.TextFormat());
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = flash.text.GridFitType.PIXEL;
	this.sharpness = 0;
};
$hxClasses["flash.text.TextField"] = flash.text.TextField;
flash.text.TextField.__name__ = ["flash","text","TextField"];
flash.text.TextField.__super__ = flash.display.InteractiveObject;
flash.text.TextField.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_wordWrap: function(inWordWrap) {
		this.wordWrap = inWordWrap;
		this.Rebuild();
		return this.get_wordWrap();
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_width: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mWidth) {
			this.mWidth = inValue;
			this.Rebuild();
		}
		return this.mWidth;
	}
	,get_width: function() {
		return Math.max(this.mWidth,this.getBounds(this.get_stage()).width);
	}
	,set_type: function(inType) {
		this.mType = inType;
		this.nmeInputEnabled = this.mType == flash.text.TextFieldType.INPUT;
		if(this.mHTMLMode) {
			if(this.nmeInputEnabled) flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true); else flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,false);
		} else if(this.nmeInputEnabled) {
			this.set_htmlText(StringTools.replace(this.mText,"\n","<BR />"));
			flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true);
		}
		this.tabEnabled = this.get_type() == flash.text.TextFieldType.INPUT;
		this.Rebuild();
		return inType;
	}
	,get_type: function() {
		return this.mType;
	}
	,get_textHeight: function() {
		return this.mMaxHeight;
	}
	,get_textWidth: function() {
		return this.mMaxWidth;
	}
	,set_textColor: function(inCol) {
		this.mTextColour = inCol;
		this.RebuildText();
		return inCol;
	}
	,get_textColor: function() {
		return this.mTextColour;
	}
	,set_text: function(inText) {
		this.mText = Std.string(inText);
		this.mHTMLMode = false;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mText;
	}
	,get_text: function() {
		if(this.mHTMLMode) this.ConvertHTMLToText(false);
		return this.mText;
	}
	,set_scrollV: function(value) {
		return this.scrollV = value;
	}
	,get_scrollV: function() {
		return this.scrollV;
	}
	,set_scrollH: function(value) {
		return this.scrollH = value;
	}
	,get_scrollH: function() {
		return this.scrollH;
	}
	,get_numLines: function() {
		return 0;
	}
	,set_multiline: function(value) {
		return this.multiline = value;
	}
	,get_multiline: function() {
		return this.multiline;
	}
	,get_maxScrollV: function() {
		return 0;
	}
	,get_maxScrollH: function() {
		return 0;
	}
	,set_htmlText: function(inHTMLText) {
		this.mParagraphs = new Array();
		this.mHTMLText = inHTMLText;
		if(!this.mHTMLMode) {
			var domElement = js.Browser.document.createElement("div");
			if(this.background || this.border) {
				domElement.style.width = this.mWidth + "px";
				domElement.style.height = this.mHeight + "px";
			}
			if(this.background) domElement.style.backgroundColor = "#" + StringTools.hex(this.backgroundColor,6);
			if(this.border) domElement.style.border = "1px solid #" + StringTools.hex(this.borderColor,6);
			domElement.style.color = "#" + StringTools.hex(this.mTextColour,6);
			domElement.style.fontFamily = this.mFace;
			domElement.style.fontSize = this.mTextHeight + "px";
			domElement.style.textAlign = Std.string(this.mAlign);
			var wrapper = domElement;
			wrapper.innerHTML = inHTMLText;
			var destination = new flash.display.Graphics(wrapper);
			var nmeSurface = this.nmeGraphics.nmeSurface;
			if(flash.Lib.nmeIsOnStage(nmeSurface)) {
				flash.Lib.nmeAppendSurface(wrapper);
				flash.Lib.nmeCopyStyle(nmeSurface,wrapper);
				flash.Lib.nmeSwapSurface(nmeSurface,wrapper);
				flash.Lib.nmeRemoveSurface(nmeSurface);
			}
			this.nmeGraphics = destination;
			this.nmeGraphics.nmeExtent.width = wrapper.width;
			this.nmeGraphics.nmeExtent.height = wrapper.height;
		} else this.nmeGraphics.nmeSurface.innerHTML = inHTMLText;
		this.mHTMLMode = true;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mHTMLText;
	}
	,get_htmlText: function() {
		return this.mHTMLText;
	}
	,set_height: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mHeight) {
			this.mHeight = inValue;
			this.Rebuild();
		}
		return this.mHeight;
	}
	,get_height: function() {
		return Math.max(this.mHeight,this.getBounds(this.get_stage()).height);
	}
	,set_defaultTextFormat: function(inFmt) {
		this.setTextFormat(inFmt);
		this._defaultTextFormat = inFmt;
		return inFmt;
	}
	,get_defaultTextFormat: function() {
		return this._defaultTextFormat;
	}
	,get_caretPos: function() {
		return this.mInsertPos;
	}
	,get_bottomScrollV: function() {
		return 0;
	}
	,set_borderColor: function(inBorderCol) {
		this.borderColor = inBorderCol;
		this.Rebuild();
		return inBorderCol;
	}
	,set_border: function(inBorder) {
		this.border = inBorder;
		this.Rebuild();
		return inBorder;
	}
	,set_backgroundColor: function(inCol) {
		this.backgroundColor = inCol;
		this.Rebuild();
		return inCol;
	}
	,set_background: function(inBack) {
		this.background = inBack;
		this.Rebuild();
		return inBack;
	}
	,set_autoSize: function(inAutoSize) {
		this.autoSize = inAutoSize;
		this.Rebuild();
		return inAutoSize;
	}
	,get_autoSize: function() {
		return this.autoSize;
	}
	,toString: function() {
		return "[TextField name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setTextFormat: function(inFmt,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(inFmt.font != null) this.mFace = inFmt.font;
		if(inFmt.size != null) this.mTextHeight = inFmt.size | 0;
		if(inFmt.align != null) this.mAlign = inFmt.align;
		if(inFmt.color != null) this.mTextColour = inFmt.color;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.getTextFormat();
	}
	,setSelection: function(beginIndex,endIndex) {
	}
	,RenderRow: function(inRow,inY,inCharIdx,inAlign,inInsert) {
		if(inInsert == null) inInsert = 0;
		var h = 0;
		var w = 0;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			if(chr.fh > h) h = chr.fh;
			w += chr.adv;
		}
		if(w > this.mMaxWidth) this.mMaxWidth = w;
		var full_height = h * 1.2 | 0;
		var align_x = 0;
		var insert_x = 0;
		if(inInsert != null) {
			if(this.autoSize != "NONE") {
				this.scrollH = 0;
				insert_x = inInsert;
			} else {
				insert_x = inInsert - this.scrollH;
				if(insert_x < 0) this.scrollH -= (this.mLimitRenderX * 3 >> 2) - insert_x; else if(insert_x > this.mLimitRenderX) this.scrollH += insert_x - (this.mLimitRenderX * 3 >> 2);
				if(this.scrollH < 0) this.scrollH = 0;
			}
		}
		if(this.autoSize == "NONE" && w <= this.mLimitRenderX) {
			if(inAlign == flash.text.TextFormatAlign.CENTER) align_x = Math.round(this.mWidth) - w >> 1; else if(inAlign == flash.text.TextFormatAlign.RIGHT) align_x = Math.round(this.mWidth) - w;
		}
		var x_list = new Array();
		this.mLineInfo.push({ mY0 : inY, mIndex : inCharIdx - 1, mX : x_list});
		var cache_sel_font = null;
		var cache_normal_font = null;
		var x = align_x - this.scrollH;
		var x0 = x;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			var adv = chr.adv;
			if(x + adv > this.mLimitRenderX) break;
			x_list.push(x);
			if(x >= 0) {
				var font = chr.font;
				if(chr.sel) {
					this.nmeGraphics.lineStyle();
					this.nmeGraphics.beginFill(2105440);
					this.nmeGraphics.drawRect(x,inY,adv,full_height);
					this.nmeGraphics.endFill();
					if(cache_normal_font == chr.font) font = cache_sel_font; else {
						font = flash.text.FontInstance.CreateSolid(chr.font.GetFace(),chr.fh,16777215,1.0);
						cache_sel_font = font;
						cache_normal_font = chr.font;
					}
				}
				font.RenderChar(this.nmeGraphics,chr.chr,x,inY + (h - chr.fh) | 0);
			}
			x += adv;
		}
		x += this.scrollH;
		return full_height;
	}
	,RebuildText: function() {
		this.mParagraphs = [];
		if(!this.mHTMLMode) {
			var font = flash.text.FontInstance.CreateSolid(this.mFace,this.mTextHeight,this.mTextColour,1.0);
			var paras = this.mText.split("\n");
			var _g = 0;
			while(_g < paras.length) {
				var paragraph = paras[_g];
				++_g;
				this.mParagraphs.push({ align : this.mAlign, spans : [{ font : font, text : paragraph + "\n"}]});
			}
		}
		this.Rebuild();
	}
	,Rebuild: function() {
		if(this.mHTMLMode) return;
		this.mLineInfo = [];
		this.nmeGraphics.clear();
		if(this.background) {
			this.nmeGraphics.beginFill(this.backgroundColor);
			this.nmeGraphics.drawRect(0,0,this.get_width(),this.get_height());
			this.nmeGraphics.endFill();
		}
		this.nmeGraphics.lineStyle(this.mTextColour);
		var insert_x = null;
		this.mMaxWidth = 0;
		var wrap = this.mLimitRenderX = this.get_wordWrap() && !this.nmeInputEnabled?this.mWidth | 0:999999;
		var char_idx = 0;
		var h = 0;
		var s0 = this.mSelStart;
		var s1 = this.mSelEnd;
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var row = [];
			var row_width = 0;
			var last_word_break = 0;
			var last_word_break_width = 0;
			var last_word_char_idx = 0;
			var start_idx = char_idx;
			var tx = 0;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				var text = span.text;
				var font = span.font;
				var fh = font.get_height();
				last_word_break = row.length;
				last_word_break_width = row_width;
				last_word_char_idx = char_idx;
				var _g5 = 0, _g4 = text.length;
				while(_g5 < _g4) {
					var ch = _g5++;
					var g = HxOverrides.cca(text,ch);
					var adv = font.nmeGetAdvance(g);
					if(g == 32) {
						last_word_break = row.length;
						last_word_break_width = tx;
						last_word_char_idx = char_idx;
					}
					if(tx + adv > wrap) {
						if(last_word_break > 0) {
							var row_end = row.splice(last_word_break,row.length - last_word_break);
							h += this.RenderRow(row,h,start_idx,paragraph.align);
							row = row_end;
							tx -= last_word_break_width;
							start_idx = last_word_char_idx;
							last_word_break = 0;
							last_word_break_width = 0;
							last_word_char_idx = 0;
							if(row_end.length > 0 && row_end[0].chr == 32) {
								row_end.shift();
								start_idx++;
							}
						} else {
							h += this.RenderRow(row,h,char_idx,paragraph.align);
							row = [];
							tx = 0;
							start_idx = char_idx;
						}
					}
					row.push({ font : font, chr : g, x : tx, fh : fh, sel : char_idx >= s0 && char_idx < s1, adv : adv});
					tx += adv;
					char_idx++;
				}
			}
			if(row.length > 0) {
				h += this.RenderRow(row,h,start_idx,paragraph.align,insert_x);
				insert_x = null;
			}
		}
		var w = this.mMaxWidth;
		if(h < this.mTextHeight) h = this.mTextHeight;
		this.mMaxHeight = h;
		var _g = this;
		switch(_g.autoSize) {
		case "LEFT":
			break;
		case "RIGHT":
			var x0 = this.get_x() + this.get_width();
			this.set_x(this.mWidth - x0);
			break;
		case "CENTER":
			var x0 = this.get_x() + this.get_width() / 2;
			this.set_x(this.mWidth / 2 - x0);
			break;
		default:
			if(this.get_wordWrap()) this.set_height(h);
		}
		if(this.border) {
			this.nmeGraphics.endFill();
			this.nmeGraphics.lineStyle(1,this.borderColor,1,true);
			this.nmeGraphics.drawRect(.5,.5,this.get_width() - .5,this.get_height() - .5);
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.nmeGraphics.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		if(!this.mHTMLMode && inMask != null) {
			var m = this.getSurfaceTransform(this.nmeGraphics);
			flash.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect,this.gridFitType != flash.text.GridFitType.PIXEL);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(this.nmeGraphics);
				flash.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.mText.length > 1) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.mMaxWidth || local.y > this.mMaxHeight) return null; else return this;
		} else return flash.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return new flash.text.TextFormat(this.mFace,this.mTextHeight,this.mTextColour);
	}
	,getLineIndexAtPoint: function(inX,inY) {
		if(this.mLineInfo.length < 1) return -1;
		if(inY <= 0) return 0;
		var _g1 = 0, _g = this.mLineInfo.length;
		while(_g1 < _g) {
			var l = _g1++;
			if(this.mLineInfo[l].mY0 > inY) return l == 0?0:l - 1;
		}
		return this.mLineInfo.length - 1;
	}
	,getCharIndexAtPoint: function(inX,inY) {
		var li = this.getLineIndexAtPoint(inX,inY);
		if(li < 0) return -1;
		var line = this.mLineInfo[li];
		var idx = line.mIndex;
		var _g = 0, _g1 = line.mX;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			if(x > inX) return idx;
			idx++;
		}
		return idx;
	}
	,getCharBoundaries: function(a) {
		return null;
	}
	,DecodeColour: function(col) {
		return Std.parseInt("0x" + HxOverrides.substr(col,1,null));
	}
	,ConvertHTMLToText: function(inUnSetHTML) {
		this.mText = "";
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				this.mText += span.text;
			}
		}
		if(inUnSetHTML) {
			this.mHTMLMode = false;
			this.RebuildText();
		}
	}
	,appendText: function(newText) {
		var _g = this;
		_g.set_text(_g.get_text() + newText);
	}
	,__class__: flash.text.TextField
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{set_autoSize:"set_autoSize",set_background:"set_background",set_backgroundColor:"set_backgroundColor",set_border:"set_border",set_borderColor:"set_borderColor",get_bottomScrollV:"get_bottomScrollV",get_caretPos:"get_caretPos",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",get_maxScrollH:"get_maxScrollH",get_maxScrollV:"get_maxScrollV",get_numLines:"get_numLines",set_text:"set_text",get_text:"get_text",set_textColor:"set_textColor",get_textColor:"get_textColor",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_type:"set_type",get_type:"get_type",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap"})
});
flash.text.FontInstanceMode = $hxClasses["flash.text.FontInstanceMode"] = { __ename__ : true, __constructs__ : ["fimSolid"] }
flash.text.FontInstanceMode.fimSolid = ["fimSolid",0];
flash.text.FontInstanceMode.fimSolid.toString = $estr;
flash.text.FontInstanceMode.fimSolid.__enum__ = flash.text.FontInstanceMode;
flash.text.FontInstance = function(inFont,inHeight) {
	this.mFont = inFont;
	this.mHeight = inHeight;
	this.mTryFreeType = true;
	this.mGlyphs = [];
	this.mCacheAsBitmap = false;
};
$hxClasses["flash.text.FontInstance"] = flash.text.FontInstance;
flash.text.FontInstance.__name__ = ["flash","text","FontInstance"];
flash.text.FontInstance.CreateSolid = function(inFace,inHeight,inColour,inAlpha) {
	var id = "SOLID:" + inFace + ":" + inHeight + ":" + inColour + ":" + inAlpha;
	var f = flash.text.FontInstance.mSolidFonts.get(id);
	if(f != null) return f;
	var font = new flash.text.Font();
	font.nmeSetScale(inHeight);
	font.set_fontName(inFace);
	if(font == null) return null;
	f = new flash.text.FontInstance(font,inHeight);
	f.SetSolid(inColour,inAlpha);
	flash.text.FontInstance.mSolidFonts.set(id,f);
	return f;
}
flash.text.FontInstance.prototype = {
	get_height: function() {
		return this.mHeight;
	}
	,toString: function() {
		return "FontInstance:" + Std.string(this.mFont) + ":" + this.mColour + "(" + this.mGlyphs.length + ")";
	}
	,RenderChar: function(inGraphics,inGlyph,inX,inY) {
		inGraphics.nmeClearLine();
		inGraphics.beginFill(this.mColour,this.mAlpha);
		this.mFont.nmeRender(inGraphics,inGlyph,inX,inY,this.mTryFreeType);
		inGraphics.endFill();
	}
	,SetSolid: function(inCol,inAlpha) {
		this.mColour = inCol;
		this.mAlpha = inAlpha;
		this.mMode = flash.text.FontInstanceMode.fimSolid;
	}
	,nmeGetAdvance: function(inChar) {
		if(this.mFont == null) return 0;
		return this.mFont.nmeGetAdvance(inChar,this.mHeight);
	}
	,GetFace: function() {
		return this.mFont.fontName;
	}
	,__class__: flash.text.FontInstance
	,__properties__: {get_height:"get_height"}
}
flash.text.TextFieldAutoSize = function() {
};
$hxClasses["flash.text.TextFieldAutoSize"] = flash.text.TextFieldAutoSize;
flash.text.TextFieldAutoSize.__name__ = ["flash","text","TextFieldAutoSize"];
flash.text.TextFieldAutoSize.prototype = {
	__class__: flash.text.TextFieldAutoSize
}
flash.text.TextFieldType = function() {
};
$hxClasses["flash.text.TextFieldType"] = flash.text.TextFieldType;
flash.text.TextFieldType.__name__ = ["flash","text","TextFieldType"];
flash.text.TextFieldType.prototype = {
	__class__: flash.text.TextFieldType
}
flash.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["flash.text.TextFormat"] = flash.text.TextFormat;
flash.text.TextFormat.__name__ = ["flash","text","TextFormat"];
flash.text.TextFormat.prototype = {
	clone: function() {
		var newFormat = new flash.text.TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.display = this.display;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__class__: flash.text.TextFormat
}
flash.text.TextFormatAlign = $hxClasses["flash.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] }
flash.text.TextFormatAlign.LEFT = ["LEFT",0];
flash.text.TextFormatAlign.LEFT.toString = $estr;
flash.text.TextFormatAlign.LEFT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.RIGHT = ["RIGHT",1];
flash.text.TextFormatAlign.RIGHT.toString = $estr;
flash.text.TextFormatAlign.RIGHT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
flash.text.TextFormatAlign.JUSTIFY.toString = $estr;
flash.text.TextFormatAlign.JUSTIFY.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.CENTER = ["CENTER",3];
flash.text.TextFormatAlign.CENTER.toString = $estr;
flash.text.TextFormatAlign.CENTER.__enum__ = flash.text.TextFormatAlign;
flash.ui = {}
flash.ui.Keyboard = function() { }
$hxClasses["flash.ui.Keyboard"] = flash.ui.Keyboard;
flash.ui.Keyboard.__name__ = ["flash","ui","Keyboard"];
flash.ui.Keyboard.isAccessible = function() {
	return false;
}
flash.ui.Keyboard.nmeConvertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
flash.ui.Keyboard.nmeConvertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 18;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
}
flash.utils = {}
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new flash.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
}
flash.utils.ByteArray.nmeOfBuffer = function(buffer) {
	var bytes = new flash.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
flash.utils.ByteArray.prototype = {
	set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Math.max(value,this.allocated * 2) | 0); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,get_endian: function() {
		return this.littleEndian?"littleEndian":"bigEndian";
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this._nmeResizeBuffer(this.allocated = Math.max(len,this.allocated * 2) | 0); else if(this.allocated > len) this._nmeResizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = Math.max(lengthToEnsure,bytes.allocated * 2) | 0); else if(bytes.allocated > lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,nmeSet: function(pos,v) {
		var data = this.data;
		data.setUint8(pos,v);
	}
	,nmeGetBuffer: function() {
		return this.data.buffer;
	}
	,nmeGet: function(pos) {
		var data = this.data;
		return data.getUint8(pos);
	}
	,nmeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,clear: function() {
		if(this.allocated < 0) this._nmeResizeBuffer(this.allocated = Math.max(0,this.allocated * 2) | 0); else if(this.allocated > 0) this._nmeResizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__class__: flash.utils.ByteArray
	,__properties__: {get_bytesAvailable:"get_bytesAvailable",set_endian:"set_endian",get_endian:"get_endian",set_length:"set_length"}
}
flash.utils.Endian = function() { }
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
flash.utils.Uuid = function() { }
$hxClasses["flash.utils.Uuid"] = flash.utils.Uuid;
flash.utils.Uuid.__name__ = ["flash","utils","Uuid"];
flash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
flash.utils.Uuid.uuid = function() {
	return flash.utils.Uuid.random(8) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(12);
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
$hxClasses["haxe.Template"] = haxe.Template;
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	run: function(e) {
		var $e = (e);
		switch( $e[1] ) {
		case 0:
			var v = $e[2];
			this.buf.b += Std.string(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = $e[2];
			this.buf.b += Std.string(Std.string(e1()));
			break;
		case 2:
			var eelse = $e[4], eif = $e[3], e1 = $e[2];
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = $e[2];
			this.buf.b += Std.string(str);
			break;
		case 4:
			var l = $e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				this.run(e1);
			}
			break;
		case 5:
			var loop = $e[3], e1 = $e[2];
			var v = e1();
			try {
				var x = $iterator(v)();
				if(x.hasNext == null) throw null;
				v = x;
			} catch( e2 ) {
				try {
					if(v.hasNext == null) throw null;
				} catch( e3 ) {
					throw "Cannot iter on " + Std.string(v);
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			while( v1.hasNext() ) {
				var ctx = v1.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = $e[3], m = $e[2];
			var v = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				var $e = (p);
				switch( $e[1] ) {
				case 0:
					var v1 = $e[2];
					pl.push(this.resolve(v1));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.b += Std.string(Std.string(v.apply(this.macros,pl)));
			} catch( e1 ) {
				var plstr = (function($this) {
					var $r;
					try {
						$r = pl.join(",");
					} catch( e2 ) {
						$r = "???";
					}
					return $r;
				}(this));
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
				throw msg;
			}
			break;
		}
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		switch(p.p) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			return (function($this) {
				var $r;
				switch(p1.p) {
				case "+":
					$r = function() {
						return e1() + e2();
					};
					break;
				case "-":
					$r = function() {
						return e1() - e2();
					};
					break;
				case "*":
					$r = function() {
						return e1() * e2();
					};
					break;
				case "/":
					$r = function() {
						return e1() / e2();
					};
					break;
				case ">":
					$r = function() {
						return e1() > e2();
					};
					break;
				case "<":
					$r = function() {
						return e1() < e2();
					};
					break;
				case ">=":
					$r = function() {
						return e1() >= e2();
					};
					break;
				case "<=":
					$r = function() {
						return e1() <= e2();
					};
					break;
				case "==":
					$r = function() {
						return e1() == e2();
					};
					break;
				case "!=":
					$r = function() {
						return e1() != e2();
					};
					break;
				case "&&":
					$r = function() {
						return e1() && e2();
					};
					break;
				case "||":
					$r = function() {
						return e1() || e2();
					};
					break;
				default:
					$r = (function($this) {
						var $r;
						throw "Unknown operation " + p1.p;
						return $r;
					}($this));
				}
				return $r;
			}(this));
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0, _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,resolve: function(v) {
		if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,execute: function(context,macros) {
		this.macros = macros == null?{ }:macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,__class__: haxe.Template
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Eof = function() { }
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
var openfl = {}
openfl.display = {}
openfl.display.Tilesheet = function(image) {
	this.nmeBitmap = image;
	this.nmeCenterPoints = new Array();
	this.nmeTileRects = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,addTileRect: function(rectangle,centerPoint) {
		this.nmeTileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new flash.geom.Point();
		this.nmeCenterPoints.push(centerPoint);
		return this.nmeTileRects.length - 1;
	}
	,__class__: openfl.display.Tilesheet
}
var tjson = {}
tjson.TJSON = function() { }
$hxClasses["tjson.TJSON"] = tjson.TJSON;
tjson.TJSON.__name__ = ["tjson","TJSON"];
tjson.TJSON.parse = function(json,fileName) {
	if(fileName == null) fileName = "JSON Data";
	tjson.TJSON.floatRegex = new EReg("^-?[0-9]*\\.[0-9]+$","");
	tjson.TJSON.intRegex = new EReg("^-?[0-9]+$","");
	tjson.TJSON.json = json;
	tjson.TJSON.fileName = fileName;
	tjson.TJSON.currentLine = 1;
	tjson.TJSON.pos = 0;
	try {
		return tjson.TJSON.doParse();
	} catch( e ) {
		if( js.Boot.__instanceof(e,String) ) {
			throw fileName + " on line " + tjson.TJSON.currentLine + ": " + e;
		} else throw(e);
	}
	return null;
}
tjson.TJSON.encode = function(obj,style) {
	if(!Reflect.isObject(obj)) throw "Provided object is not an object.";
	var st;
	if(js.Boot.__instanceof(style,tjson.EncodeStyle)) st = style; else if(style == "fancy") st = new tjson.FancyStyle(); else st = new tjson.SimpleStyle();
	if(js.Boot.__instanceof(obj,Array)) return tjson.TJSON.encodeArray(obj,st,0);
	return tjson.TJSON.encodeAnonymousObject(obj,st,0);
}
tjson.TJSON.doParse = function() {
	var s = tjson.TJSON.getNextSymbol();
	if(s == "{") return tjson.TJSON.doObject();
	if(s == "[") return tjson.TJSON.doArray();
	return null;
}
tjson.TJSON.doObject = function() {
	var o = { };
	var val = "";
	var key;
	while((key = tjson.TJSON.getNextSymbol()) != "") {
		if(key == ",") continue;
		if(key == "}") return o;
		var seperator = tjson.TJSON.getNextSymbol();
		if(seperator != ":") throw "Expected ':' but got '" + seperator + "' instead.";
		var v = tjson.TJSON.getNextSymbol();
		if(v == "{") val = tjson.TJSON.doObject(); else if(v == "[") val = tjson.TJSON.doArray(); else val = tjson.TJSON.convertSymbolToProperType(v);
		o[key] = val;
	}
	throw "Unexpected end of file. Expected '}'";
}
tjson.TJSON.doArray = function() {
	var a = new Array();
	var val;
	while((val = tjson.TJSON.getNextSymbol()) != "") {
		if(val == ",") continue; else if(val == "]") return a; else if(val == "{") val = tjson.TJSON.doObject(); else if(val == "[") val = tjson.TJSON.doArray(); else val = tjson.TJSON.convertSymbolToProperType(val);
		a.push(val);
	}
	throw "Unexpected end of file. Expected ']'";
}
tjson.TJSON.convertSymbolToProperType = function(symbol) {
	if(tjson.TJSON.lastSymbolQuoted) return symbol;
	if(tjson.TJSON.looksLikeFloat(symbol)) return Std.parseFloat(symbol);
	if(tjson.TJSON.looksLikeInt(symbol)) return Std.parseInt(symbol);
	if(symbol.toLowerCase() == "true") return true;
	if(symbol.toLowerCase() == "false") return false;
	return symbol;
}
tjson.TJSON.looksLikeFloat = function(s) {
	if(tjson.TJSON.floatRegex.match(s)) return true;
	return false;
}
tjson.TJSON.looksLikeInt = function(s) {
	if(tjson.TJSON.intRegex.match(s)) return true;
	return false;
}
tjson.TJSON.getNextSymbol = function() {
	tjson.TJSON.lastSymbolQuoted = false;
	var c = "";
	var inQuote = false;
	var quoteType = "";
	var symbol = "";
	var inEscape = false;
	var inSymbol = false;
	var inLineComment = false;
	var inBlockComment = false;
	while(tjson.TJSON.pos < tjson.TJSON.json.length) {
		c = tjson.TJSON.json.charAt(tjson.TJSON.pos++);
		if(c == "\n" && !inSymbol) tjson.TJSON.currentLine++;
		if(inLineComment) {
			if(c == "\n" || c == "\r") {
				inLineComment = false;
				tjson.TJSON.pos++;
			}
			continue;
		}
		if(inBlockComment) {
			if(c == "*" && tjson.TJSON.json.charAt(tjson.TJSON.pos) == "/") {
				inBlockComment = false;
				tjson.TJSON.pos++;
			}
			continue;
		}
		if(inQuote) {
			if(inEscape) {
				inEscape = false;
				if(c == "'" || c == "\"") {
					symbol += c;
					continue;
				}
				if(c == "t") {
					symbol += "\t";
					continue;
				}
				if(c == "n") {
					symbol += "\n";
					continue;
				}
				if(c == "\\") {
					symbol += "\\";
					continue;
				}
				if(c == "r") {
					symbol += "\r";
					continue;
				}
				throw "Invalid escape sequence '\\" + c + "'";
			} else {
				if(c == "\\") {
					inEscape = true;
					continue;
				}
				if(c == quoteType) return symbol;
				symbol += c;
				continue;
			}
		} else if(c == "/") {
			var c2 = tjson.TJSON.json.charAt(tjson.TJSON.pos);
			if(c2 == "/") {
				inLineComment = true;
				tjson.TJSON.pos++;
				continue;
			} else if(c2 == "*") {
				inBlockComment = true;
				tjson.TJSON.pos++;
				continue;
			}
		}
		if(inSymbol) {
			if(c == " " || c == "\n" || c == "\r" || c == "\t" || c == "," || c == ":" || c == "}" || c == "]") {
				tjson.TJSON.pos--;
				return symbol;
			} else {
				symbol += c;
				continue;
			}
		} else {
			if(c == " " || c == "\t" || c == "\n" || c == "\r") continue;
			if(c == "{" || c == "}" || c == "[" || c == "]" || c == "," || c == ":") return c;
			if(c == "'" || c == "\"") {
				inQuote = true;
				quoteType = c;
				tjson.TJSON.lastSymbolQuoted = true;
				continue;
			} else {
				inSymbol = true;
				symbol = c;
				continue;
			}
		}
	}
	if(inQuote) throw "Unexpected end of data. Expected ( " + quoteType + " )";
	return symbol;
}
tjson.TJSON.encodeAnonymousObject = function(obj,style,depth) {
	var buffer = style.beginObject(depth);
	var fieldCount = 0;
	var _g = 0, _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		if(fieldCount++ > 0) buffer += style.entrySeperator(depth); else buffer += style.firstEntry(depth);
		var value = Reflect.field(obj,field);
		buffer += "\"" + field + "\"" + style.keyValueSeperator(depth);
		buffer += tjson.TJSON.encodeValue(value,style,depth);
	}
	buffer += style.endObject(depth);
	return buffer;
}
tjson.TJSON.encodeArray = function(obj,style,depth) {
	var buffer = style.beginArray(depth);
	var fieldCount = 0;
	var _g = 0, _g1 = js.Boot.__cast(obj , Array);
	while(_g < _g1.length) {
		var value = _g1[_g];
		++_g;
		if(fieldCount++ > 0) buffer += style.entrySeperator(depth); else buffer += style.firstEntry(depth);
		buffer += tjson.TJSON.encodeValue(value,style,depth);
	}
	buffer += style.endArray(depth);
	return buffer;
}
tjson.TJSON.encodeValue = function(value,style,depth) {
	var buffer = "";
	if(js.Boot.__instanceof(value,Int) || js.Boot.__instanceof(value,Float)) buffer += Std.string(value); else if(js.Boot.__instanceof(value,Array)) buffer += tjson.TJSON.encodeArray(value,style,depth + 1); else if(js.Boot.__instanceof(value,String)) buffer += "\"" + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(Std.string(value),"\\","\\\\"),"\n","\\n"),"\r","\\r"),"\"","\\\"") + "\""; else if(Reflect.isObject(value)) buffer += tjson.TJSON.encodeAnonymousObject(value,style,depth + 1); else throw "Unsupported field type: " + Std.string(value);
	return buffer;
}
tjson.EncodeStyle = function() { }
$hxClasses["tjson.EncodeStyle"] = tjson.EncodeStyle;
tjson.EncodeStyle.__name__ = ["tjson","EncodeStyle"];
tjson.EncodeStyle.prototype = {
	__class__: tjson.EncodeStyle
}
tjson.SimpleStyle = function() {
};
$hxClasses["tjson.SimpleStyle"] = tjson.SimpleStyle;
tjson.SimpleStyle.__name__ = ["tjson","SimpleStyle"];
tjson.SimpleStyle.__interfaces__ = [tjson.EncodeStyle];
tjson.SimpleStyle.prototype = {
	keyValueSeperator: function(depth) {
		return ":";
	}
	,entrySeperator: function(depth) {
		return ",";
	}
	,firstEntry: function(depth) {
		return "";
	}
	,endArray: function(depth) {
		return "]";
	}
	,beginArray: function(depth) {
		return "[";
	}
	,endObject: function(depth) {
		return "}";
	}
	,beginObject: function(depth) {
		return "{";
	}
	,__class__: tjson.SimpleStyle
}
tjson.FancyStyle = function() {
};
$hxClasses["tjson.FancyStyle"] = tjson.FancyStyle;
tjson.FancyStyle.__name__ = ["tjson","FancyStyle"];
tjson.FancyStyle.__interfaces__ = [tjson.EncodeStyle];
tjson.FancyStyle.prototype = {
	charTimesN: function(str,n) {
		var buffer = "";
		var _g = 0;
		while(_g < n) {
			var x = _g++;
			buffer += str;
		}
		return buffer;
	}
	,keyValueSeperator: function(depth) {
		return " : ";
	}
	,entrySeperator: function(depth) {
		return "\n" + this.charTimesN("    ",depth + 1) + ",";
	}
	,firstEntry: function(depth) {
		return this.charTimesN("    ",depth + 1) + " ";
	}
	,endArray: function(depth) {
		return "\n" + this.charTimesN("    ",depth) + "]";
	}
	,beginArray: function(depth) {
		return "[\n";
	}
	,endObject: function(depth) {
		return "\n" + this.charTimesN("    ",depth) + "}";
	}
	,beginObject: function(depth) {
		return "{\n";
	}
	,__class__: tjson.FancyStyle
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe.Resource.content = [{ name : "NME_font_com_DefaultFont", data : "s281863:b3k0Omhhc2hxOjExMW95Njphc2NlbnRkOTU4LjQ2NHk0OmRhdGFhZDI5NC45MTJkMTAzNi4yODhkMjMzLjQ3MmQxMDM2LjI4OGQxODcuMzkyZDEwMTUuMjk2ZDE0MS4zMTJkOTk0LjMwNGQxMTAuNTkyZDk1Ny40NGQ3OS44NzJkOTIwLjU3NmQ2NS4wMjRkODcwLjRkNTAuMTc2ZDgyMC4yMjNkNTAuMTc2ZDc2MS44NTZkNTAuMTc2ZDcwMy40ODhkNjUuMDI0ZDY1My4zMTJkNzkuODcyZDYwMy4xMzZkMTEwLjU5MmQ1NjYuMjcxZDE0MS4zMTJkNTI5LjQwOGQxODcuMzkyZDUwNy45MDRkMjMzLjQ3MmQ0ODYuNGQyOTQuOTEyZDQ4Ni40ZDM1Ni4zNTJkNDg2LjRkNDAyLjQzMmQ1MDcuOTA0ZDQ0OC41MTJkNTI5LjQwOGQ0NzkuMjMyZDU2Ni4yNzFkNTA5Ljk1MmQ2MDMuMTM2ZDUyNC44ZDY1My4zMTJkNTM5LjY0OGQ3MDMuNDg4ZDUzOS42NDhkNzYxLjg1NmQ1MzkuNjQ4ZDgyMC4yMjNkNTI0LjhkODcwLjRkNTA5Ljk1MmQ5MjAuNTc2ZDQ3OS4yMzJkOTU3LjQ0ZDQ0OC41MTJkOTk0LjMwNGQ0MDIuNDMyZDEwMTUuMjk2ZDM1Ni4zNTJkMTAzNi4yODhkMjk0LjkxMmQxMDM2LjI4OGQyOTQuOTEyZDk1NS4zOTJkMzY1LjU2OGQ5NTUuMzkyZDM5OS4zNmQ5MDQuMTkyZDQzMy4xNTJkODUyLjk5MmQ0MzMuMTUyZDc2MS44NTZkNDMzLjE1MmQ2NzAuNzJkMzk5LjM2ZDYyMC4wMzFkMzY1LjU2OGQ1NjkuMzQ0ZDI5NC45MTJkNTY5LjM0NGQyMjQuMjU2ZDU2OS4zNDRkMTkwLjk3NmQ2MjAuMDMxZDE1Ny42OTZkNjcwLjcyZDE1Ny42OTZkNzYxLjg1NmQxNTcuNjk2ZDg1Mi45OTJkMTkwLjk3NmQ5MDQuMTkyZDIyNC4yNTZkOTU1LjM5MmQyOTQuOTEyZDk1NS4zOTJoeTY6X3dpZHRoZDU5MC44NDh5NDp4TWF4ZDUzOS42NDh5NDp4TWluZDUwLjE3Nnk0OnlNYXhkNTM3LjZ5NDp5TWluZC0xMi4yODh5NzpfaGVpZ2h0ZDQ4Ny40MjR5NzpsZWFkaW5nZDE4OS40NHk3OmRlc2NlbnRkMjU0Ljk3Nnk4OmNoYXJDb2RlaTExMXkxNTpsZWZ0c2lkZUJlYXJpbmdkNTAuMTc2eTEyOmFkdmFuY2VXaWR0aGQ1OTAuODQ4eTg6Y29tbWFuZHNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjIyM29SMWQ5NTguNDY0UjJhZDgwLjg5NmQ1MTkuMTY4ZDgwLjg5NmQ0NTkuNzc1ZDkxLjEzNmQ0MTIuNjcyZDEwMS4zNzZkMzY1LjU2OGQxMjUuNDRkMzMyLjI4OGQxNDkuNTA0ZDI5OS4wMDhkMTg4LjkyOGQyODEuNmQyMjguMzUyZDI2NC4xOTJkMjg1LjY5NmQyNjQuMTkyZDMzNS44NzJkMjY0LjE5MmQzNzEuNzEyZDI3Ny41MDRkNDA3LjU1MmQyOTAuODE2ZDQzMC41OTJkMzEzLjM0M2Q0NTMuNjMyZDMzNS44NzFkNDY0LjM4NGQzNjYuMDhkNDc1LjEzNmQzOTYuMjg4ZDQ3NS4xMzZkNDMwLjA4ZDQ3NS4xMzZkNDc2LjE1OWQ0NjAuOGQ1MDcuMzkxZDQ0Ni40NjRkNTM4LjYyNGQ0MjkuMDU2ZDU2My4yZDQxMS42NDhkNTg3Ljc3NmQzOTcuMzEyZDYwOS4yOGQzODIuOTc2ZDYzMC43ODRkMzgyLjk3NmQ2NTguNDMyZDM4Mi45NzZkNjc5LjkzNWQzOTUuMjY0ZDY5NC43ODRkNDA3LjU1MmQ3MDkuNjMyZDQyNS40NzJkNzIxLjkyZDQ0My4zOTJkNzM0LjIwOGQ0NjQuMzg0ZDc0Ny41MmQ0ODUuMzc2ZDc2MC44MzJkNTAzLjI5NmQ3NzguNzUyZDUyMS4yMTZkNzk2LjY3MmQ1MzMuNTA0ZDgyMi4yNzFkNTQ1Ljc5MmQ4NDcuODcyZDU0NS43OTJkODg1Ljc2ZDU0NS43OTJkOTUyLjMxOWQ1MDAuNzM2ZDk5NC4zMDRkNDU1LjY4ZDEwMzYuMjg4ZDM2Ni41OTJkMTAzNi4yODhkMzI3LjY4ZDEwMzYuMjg4ZDI5OC40OTZkMTAyOS42MzJkMjY5LjMxMmQxMDIyLjk3NmQyNDIuNjg4ZDEwMTEuNzEyZDI0NC43MzZkOTkxLjIzMmQyNTEuMzkyZDk3MC43NTJkMjU4LjA0OGQ5NTAuMjcxZDI2Ni4yNGQ5MzAuODE2ZDI4OS43OTJkOTQyLjA4ZDMxMi4zMmQ5NDcuNzEyZDMzNC44NDhkOTUzLjM0NGQzNTguNGQ5NTMuMzQ0ZDM5My4yMTZkOTUzLjM0NGQ0MTguMzA0ZDkzOC40OTZkNDQzLjM5MmQ5MjMuNjQ4ZDQ0My4zOTJkODgyLjY4OGQ0NDMuMzkyZDg1OC4xMTJkNDMxLjYxNmQ4NDIuMjRkNDE5Ljg0ZDgyNi4zNjdkNDAxLjkyZDgxNC4wNzlkMzg0ZDgwMS43OTJkMzYzLjAwOGQ3ODkuNTA0ZDM0Mi4wMTZkNzc3LjIxNmQzMjQuMDk2ZDc2MS4zNDRkMzA2LjE3NmQ3NDUuNDcyZDI5NC40ZDcyMi45NDRkMjgyLjYyNGQ3MDAuNDE1ZDI4Mi42MjRkNjY1LjU5OWQyODIuNjI0ZDYyOS43NmQyOTYuOTZkNjAzLjY0N2QzMTEuMjk2ZDU3Ny41MzZkMzI4LjE5MmQ1NTIuOTZkMzQ1LjA4OGQ1MjguMzg0ZDM1OS40MjRkNTAwLjczNmQzNzMuNzZkNDczLjA4N2QzNzMuNzZkNDM0LjE3NWQzNzMuNzZkMzk0LjI0ZDM1MC43MmQzNzAuNjg4ZDMyNy42OGQzNDcuMTM1ZDI4My42NDhkMzQ3LjEzNWQyMjIuMjA4ZDM0Ny4xMzVkMjAxLjIxNmQzODguNjA3ZDE4MC4yMjRkNDMwLjA4ZDE4MC4yMjRkNTIxLjIxNmQxODAuMjI0ZDEwMjRkMTY4Ljk2ZDEwMjYuMDQ4ZDE1NS42NDhkMTAyNy4wNzFkMTQyLjMzNmQxMDI4LjA5NmQxMzEuMDcyZDEwMjguMDk2ZDExOS44MDhkMTAyOC4wOTZkMTA1Ljk4NGQxMDI3LjA3MWQ5Mi4xNmQxMDI2LjA0OGQ4MC44OTZkMTAyNGQ4MC44OTZkNTE5LjE2OGhSM2Q1ODUuNzI4UjRkNTQ1Ljc5MlI1ZDgwLjg5NlI2ZDc1OS44MDhSN2QtMTIuMjg4UjhkNjc4LjkxMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIyM1IxMmQ4MC44OTZSMTNkNTg1LjcyOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjExMG9SMWQ5NTguNDY0UjJhZDgxLjkyZDQ5OC42ODhkOTMuMTg0ZDQ5Ni42NGQxMDMuOTM2ZDQ5NS42MTZkMTE0LjY4OGQ0OTQuNTkyZDEyNS45NTJkNDk0LjU5MmQxMzcuMjE2ZDQ5NC41OTJkMTQ2Ljk0NGQ0OTUuNjE2ZDE1Ni42NzJkNDk2LjY0ZDE2Ny45MzZkNDk4LjY4OGQxNzEuMDA4ZDUxNC4wNDhkMTc0LjA4ZDU0MC4xNmQxNzcuMTUyZDU2Ni4yNzFkMTc3LjE1MmQ1ODMuNjhkMTg3LjM5MmQ1NjYuMjcxZDIwMy4yNjRkNTQ4Ljg2NGQyMTkuMTM2ZDUzMS40NTZkMjM5LjYxNmQ1MTcuNjMyZDI2MC4wOTZkNTAzLjgwOGQyODYuNzJkNDk1LjEwNGQzMTMuMzQ0ZDQ4Ni40ZDM0NS4wODhkNDg2LjRkNDM1LjJkNDg2LjRkNDc4LjIwOGQ1MzguMTEyZDUyMS4yMTZkNTg5LjgyNGQ1MjEuMjE2ZDY5MS4yZDUyMS4yMTZkMTAyNGQ1MDkuOTUyZDEwMjYuMDQ4ZDQ5NS42MTZkMTAyNy4wNzFkNDgxLjI4ZDEwMjguMDk2ZDQ3MC4wMTZkMTAyOC4wOTZkNDU4Ljc1MmQxMDI4LjA5NmQ0NDQuOTI4ZDEwMjcuMDcxZDQzMS4xMDRkMTAyNi4wNDhkNDE5Ljg0ZDEwMjRkNDE5Ljg0ZDcxOC44NDhkNDE5Ljg0ZDY0Ni4xNDRkMzk3LjMxMmQ2MTEuODM5ZDM3NC43ODRkNTc3LjUzNmQzMjUuNjMyZDU3Ny41MzZkMjk2Ljk2ZDU3Ny41MzZkMjcxLjM2ZDU4Ny43NzZkMjQ1Ljc2ZDU5OC4wMTZkMjI2LjMwNGQ2MTkuNTJkMjA2Ljg0OGQ2NDEuMDI0ZDE5NS4wNzJkNjc1LjMyOGQxODMuMjk2ZDcwOS42MzJkMTgzLjI5NmQ3NTcuNzZkMTgzLjI5NmQxMDI0ZDE3Mi4wMzJkMTAyNi4wNDhkMTU4LjIwOGQxMDI3LjA3MWQxNDQuMzg0ZDEwMjguMDk2ZDEzMy4xMmQxMDI4LjA5NmQxMjEuODU2ZDEwMjguMDk2ZDEwNy41MmQxMDI3LjA3MWQ5My4xODRkMTAyNi4wNDhkODEuOTJkMTAyNGQ4MS45MmQ0OTguNjg4aFIzZDU5MS44NzJSNGQ1MjEuMjE2UjVkODEuOTJSNmQ1MzcuNlI3ZC00LjA5NlI4ZDQ1NS42OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTExMFIxMmQ4MS45MlIxM2Q1OTEuODcyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaGc6MjIyb1IxZDk1OC40NjRSMmFkMTkzLjUzNmQ0MDIuNDMyZDIxMC45NDRkNDAwLjM4NGQyMjUuNzkyZDM5OS44NzFkMjQwLjY0ZDM5OS4zNmQyNTguMDQ4ZDM5OS4zNmQzMTEuMjk2ZDM5OS4zNmQzNjEuOTg0ZDQxMS4xMzVkNDEyLjY3MmQ0MjIuOTEyZDQ1Mi42MDhkNDUxLjU4M2Q0OTIuNTQ0ZDQ4MC4yNTZkNTE2LjYwOGQ1MjcuODcyZDU0MC42NzJkNTc1LjQ4OGQ1NDAuNjcyZDY0Ny4xNjhkNTQwLjY3MmQ3MTcuODI0ZDUxNi42MDhkNzY1LjQ0ZDQ5Mi41NDRkODEzLjA1NmQ0NTIuNjA4ZDg0MS4yMTZkNDEyLjY3MmQ4NjkuMzc2ZDM2MS45ODRkODgxLjE1MmQzMTEuMjk2ZDg5Mi45MjhkMjU4LjA0OGQ4OTIuOTI4ZDI0MC42NGQ4OTIuOTI4ZDIyNS43OTJkODkyLjQxNWQyMTAuOTQ0ZDg5MS45MDRkMTkzLjUzNmQ4OTAuODhkMTkzLjUzNmQxMDI0ZDE4MS4yNDhkMTAyNi4wNDhkMTY3LjQyNGQxMDI2LjU2ZDE1My42ZDEwMjcuMDcxZDE0MS4zMTJkMTAyNy4wNzFkMTI4ZDEwMjcuMDcxZDExNC4xNzZkMTAyNi41NmQxMDAuMzUyZDEwMjYuMDQ4ZDg5LjA4OGQxMDI0ZDg5LjA4OGQyODcuNzQ0ZDExMy42NjRkMjg0LjY3MmQxNDEuMzEyZDI4NC42NzJkMTUzLjZkMjg0LjY3MmQxNjcuNDI0ZDI4NS4xODNkMTgxLjI0OGQyODUuNjk2ZDE5My41MzZkMjg3Ljc0NGQxOTMuNTM2ZDQwMi40MzJkMjU4LjA0OGQ4MDIuODE2ZDI4OS43OTJkODAyLjgxNmQzMjEuMDI0ZDc5Ni42NzJkMzUyLjI1NmQ3OTAuNTI4ZDM3Ni44MzJkNzczLjEyZDQwMS40MDhkNzU1LjcxMmQ0MTYuNzY4ZDcyNC45OTJkNDMyLjEyOGQ2OTQuMjcxZDQzMi4xMjhkNjQ2LjE0NGQ0MzIuMTI4ZDU5OC4wMTZkNDE2Ljc2OGQ1NjcuMjk2ZDQwMS40MDhkNTM2LjU3NmQzNzYuODMyZDUxOS42OGQzNTIuMjU2ZDUwMi43ODRkMzIxLjAyNGQ0OTYuNjRkMjg5Ljc5MmQ0OTAuNDk2ZDI1OC4wNDhkNDkwLjQ5NmQyMzcuNTY4ZDQ5MC40OTZkMjI1Ljc5MmQ0OTEuNTJkMjE0LjAxNmQ0OTIuNTQ0ZDE5My41MzZkNDk0LjU5MmQxOTMuNTM2ZDc5OC43MmQyMTIuOTkyZDgwMC43NjhkMjI0Ljc2OGQ4MDEuNzkyZDIzNi41NDRkODAyLjgxNmQyNTguMDQ4ZDgwMi44MTZoUjNkNTk0Ljk0NFI0ZDU0MC42NzJSNWQ4OS4wODhSNmQ3MzkuMzI4UjdkLTMuMDcyUjhkNjUwLjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjIyUjEyZDg5LjA4OFIxM2Q1OTQuOTQ0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaGc6MTA5b1IxZDk1OC40NjRSMmFkODEuOTJkNDk4LjY4OGQ5My4xODRkNDk2LjY0ZDEwMy45MzZkNDk1LjYxNmQxMTQuNjg4ZDQ5NC41OTJkMTI1Ljk1MmQ0OTQuNTkyZDEzNy4yMTZkNDk0LjU5MmQxNDYuOTQ0ZDQ5NS42MTZkMTU2LjY3MmQ0OTYuNjRkMTY3LjkzNmQ0OTguNjg4ZDE3MS4wMDhkNTE0LjA0OGQxNzQuMDhkNTM5LjEzNmQxNzcuMTUyZDU2NC4yMjNkMTc3LjE1MmQ1ODEuNjMyZDE4Ni4zNjhkNTYzLjJkMjAwLjE5MmQ1NDYuMzA0ZDIxNC4wMTZkNTI5LjQwOGQyMzIuOTZkNTE2LjA5NmQyNTEuOTA0ZDUwMi43ODRkMjc2LjQ4ZDQ5NC41OTJkMzAxLjA1NmQ0ODYuNGQzMzAuNzUyZDQ4Ni40ZDM5Mi4xOTJkNDg2LjRkNDI1LjQ3MmQ1MTEuNDg3ZDQ1OC43NTJkNTM2LjU3NmQ0NzYuMTZkNTgxLjYzMmQ0ODYuNGQ1NjQuMjIzZDUwMS4yNDhkNTQ2LjgxNmQ1MTYuMDk2ZDUyOS40MDhkNTM0LjUyOGQ1MTYuMDk2ZDU1Mi45NmQ1MDIuNzg0ZDU3Ni41MTJkNDk0LjU5MmQ2MDAuMDY0ZDQ4Ni40ZDYyOS43NmQ0ODYuNGQ3MjAuODk2ZDQ4Ni40ZDc2Mi4zNjhkNTM3LjU5OWQ4MDMuODRkNTg4LjhkODAzLjg0ZDY4OS4xNTJkODAzLjg0ZDEwMjRkNzkyLjU3NmQxMDI2LjA0OGQ3NzguMjRkMTAyNy4wNzFkNzYzLjkwNGQxMDI4LjA5NmQ3NTIuNjRkMTAyOC4wOTZkNzQxLjM3NmQxMDI4LjA5NmQ3MjcuNTUyZDEwMjcuMDcxZDcxMy43MjhkMTAyNi4wNDhkNzAyLjQ2NGQxMDI0ZDcwMi40NjRkNzE4Ljg0OGQ3MDIuNDY0ZDY0OC4xOTJkNjgwLjk2ZDYxMi44NjRkNjU5LjQ1NmQ1NzcuNTM2ZDYxMC4zMDRkNTc3LjUzNmQ1NTguMDhkNTc3LjUzNmQ1MjUuODI0ZDYxNS40MjRkNDkzLjU2OGQ2NTMuMzEyZDQ5My41NjhkNzI3LjA0ZDQ5My41NjhkMTAyNGQ0ODIuMzA0ZDEwMjYuMDQ4ZDQ2OC40OGQxMDI3LjA3MWQ0NTQuNjU2ZDEwMjguMDk2ZDQ0My4zOTJkMTAyOC4wOTZkNDMyLjEyOGQxMDI4LjA5NmQ0MTguMzA0ZDEwMjcuMDcxZDQwNC40OGQxMDI2LjA0OGQzOTMuMjE2ZDEwMjRkMzkzLjIxNmQ3MTEuNjhkMzkzLjIxNmQ2NDMuMDcyZDM3Mi43MzZkNjA4Ljc2OGQzNTIuMjU2ZDU3NC40NjRkMzA3LjJkNTc0LjQ2NGQyODEuNmQ1NzQuNDY0ZDI1OS4wNzJkNTg1LjcyOGQyMzYuNTQ0ZDU5Ni45OTJkMjE5LjY0OGQ2MTkuNTJkMjAyLjc1MmQ2NDIuMDQ4ZDE5My4wMjRkNjc2LjM1MmQxODMuMjk2ZDcxMC42NTZkMTgzLjI5NmQ3NTUuNzEyZDE4My4yOTZkMTAyNGQxNzIuMDMyZDEwMjYuMDQ4ZDE1OC4yMDhkMTAyNy4wNzFkMTQ0LjM4NGQxMDI4LjA5NmQxMzMuMTJkMTAyOC4wOTZkMTIxLjg1NmQxMDI4LjA5NmQxMDcuNTJkMTAyNy4wNzFkOTMuMTg0ZDEwMjYuMDQ4ZDgxLjkyZDEwMjRkODEuOTJkNDk4LjY4OGhSM2Q4NzQuNDk2UjRkODAzLjg0UjVkODEuOTJSNmQ1MzcuNlI3ZC00LjA5NlI4ZDQ1NS42OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTEwOVIxMmQ4MS45MlIxM2Q4NzQuNDk2UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoyMjFvUjFkOTU4LjQ2NFIyYWQyNTEuOTA0ZDc1NC42ODhkMTguNDMyZDI4Ny43NDRkMzEuNzQ0ZDI4NS42OTZkNDcuMTA0ZDI4NC42NzJkNjIuNDY0ZDI4My42NDhkNzcuODI0ZDI4My42NDhkOTEuMTM2ZDI4My42NDhkMTA3LjAwOGQyODQuNjcyZDEyMi44OGQyODUuNjk2ZDEzNS4xNjhkMjg3Ljc0NGQzMDcuMmQ2NTMuMzEyZDQ3Ny4xODRkMjg3Ljc0NGQ0OTAuNDk2ZDI4NS42OTZkNTAzLjgwOGQyODQuNjcyZDUxNy4xMmQyODMuNjQ4ZDUzMS40NTZkMjgzLjY0OGQ1NDUuNzkyZDI4My42NDhkNTYwLjEyOGQyODQuNjcyZDU3NC40NjRkMjg1LjY5NmQ1ODcuNzc2ZDI4Ny43NDRkMzU3LjM3NmQ3NTQuNjg4ZDM1Ny4zNzZkMTAyNGQzNDQuMDY0ZDEwMjYuMDQ4ZDMzMC43NTJkMTAyNy4wNzFkMzE3LjQ0ZDEwMjguMDk2ZDMwNC4xMjhkMTAyOC4wOTZkMjkwLjgxNmQxMDI4LjA5NmQyNzYuOTkyZDEwMjcuMDcxZDI2My4xNjhkMTAyNi4wNDhkMjUxLjkwNGQxMDI0ZDI1MS45MDRkNzU0LjY4OGQzNDMuMDRkMjI2LjMwM2QzMjkuNzI4ZDIyOC4zNTFkMzE1LjM5MmQyMjkuMzc1ZDMwMS4wNTZkMjMwLjM5OWQyODYuNzJkMjMwLjM5OWQyNzIuMzg0ZDIzMC4zOTlkMjYwLjA5NmQyMjkuMzc1ZDI0Ny44MDhkMjI4LjM1MWQyMzMuNDcyZDIyNi4zMDNkMzQyLjAxNmQxMTUuNzExZDM1OC40ZDExMy42NjNkMzc2LjgzMmQxMTIuMTI3ZDM5NS4yNjRkMTEwLjU5MWQ0MTMuNjk2ZDExMC41OTFkNDMzLjE1MmQxMTAuNTkxZDQ1MC41NmQxMTIuMTI3ZDQ2Ny45NjhkMTEzLjY2M2Q0ODIuMzA0ZDExNS43MTFkMzQzLjA0ZDIyNi4zMDNoUjNkNjA2LjIwOFI0ZDU4Ny43NzZSNWQxOC40MzJSNmQ5MTMuNDA4UjdkLTQuMDk2UjhkODk0Ljk3NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIyMVIxMmQxOC40MzJSMTNkNjA2LjIwOFIxNGFpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxMDhvUjFkOTU4LjQ2NFIyYWQ3OS44NzJkMjczLjQwOGQ5MS4xMzZkMjcxLjM2ZDEwNC45NmQyNzAuMzM2ZDExOC43ODRkMjY5LjMxMmQxMzAuMDQ4ZDI2OS4zMTJkMTQxLjMxMmQyNjkuMzEyZDE1NS4xMzZkMjcwLjMzNmQxNjguOTZkMjcxLjM2ZDE4MC4yMjRkMjczLjQwOGQxODAuMjI0ZDg2NS4yOGQxODAuMjI0ZDg5My45NTJkMTg1LjM0NGQ5MTAuMzM2ZDE5MC40NjRkOTI2LjcyZDE5OS4xNjhkOTM1LjQyNGQyMDcuODcyZDk0NC4xMjhkMjE5LjY0OGQ5NDYuNjg4ZDIzMS40MjRkOTQ5LjI0OGQyNDQuNzM2ZDk0OS4yNDhkMjUzLjk1MmQ5NDkuMjQ4ZDI2NS43MjhkOTQ4LjIyNGQyNzcuNTA0ZDk0Ny4yZDI4NS42OTZkOTQ1LjE1MmQyOTQuOTEyZDk4MC45OTJkMjk0LjkxMmQxMDIyLjk3NmQyODAuNTc2ZDEwMjguMDk2ZDI2MC4wOTZkMTAyOS42MzJkMjM5LjYxNmQxMDMxLjE2N2QyMjIuMjA4ZDEwMzEuMTY3ZDE5Mi41MTJkMTAzMS4xNjdkMTY2LjkxMmQxMDI0ZDE0MS4zMTJkMTAxNi44MzJkMTIxLjg1NmQxMDAwLjQ0OGQxMDIuNGQ5ODQuMDY0ZDkxLjEzNmQ5NTYuNDE1ZDc5Ljg3MmQ5MjguNzY4ZDc5Ljg3MmQ4ODcuODA4ZDc5Ljg3MmQyNzMuNDA4aFIzZDMwNS4xNTJSNGQyOTQuOTEyUjVkNzkuODcyUjZkNzU0LjY4OFI3ZC03LjE2OFI4ZDY3NC44MTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMDhSMTJkNzkuODcyUjEzZDMwNS4xNTJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjIyMG9SMWQ5NTguNDY0UjJhZDgyLjk0NGQyODcuNzQ0ZDEwNy41MmQyODQuNjcyZDEzNi4xOTJkMjg0LjY3MmQxNjMuODRkMjg0LjY3MmQxODcuMzkyZDI4Ny43NDRkMTg3LjM5MmQ3MDUuNTM2ZDE4Ny4zOTJkNzY5LjAyNGQxOTUuNTg0ZDgxNC4wNzlkMjAzLjc3NmQ4NTkuMTM2ZDIyMi4yMDhkODg3LjI5NmQyNDAuNjRkOTE1LjQ1NmQyNzAuODQ4ZDkyOC43NjhkMzAxLjA1NmQ5NDIuMDhkMzQ1LjA4OGQ5NDIuMDhkMzg5LjEyZDk0Mi4wOGQ0MTguODE2ZDkyOC43NjhkNDQ4LjUxMmQ5MTUuNDU2ZDQ2Ni45NDRkODg3LjI5NmQ0ODUuMzc2ZDg1OS4xMzZkNDkzLjU2OGQ4MTQuMDc5ZDUwMS43NmQ3NjkuMDI0ZDUwMS43NmQ3MDUuNTM2ZDUwMS43NmQyODcuNzQ0ZDUyNy4zNmQyODQuNjcyZDU1My45ODRkMjg0LjY3MmQ1ODIuNjU2ZDI4NC42NzJkNjA3LjIzMmQyODcuNzQ0ZDYwNy4yMzJkNzIzLjk2OGQ2MDcuMjMyZDc5Ny42OTZkNTkzLjQwOGQ4NTYuMDY0ZDU3OS41ODRkOTE0LjQzMmQ1NDguMzUyZDk1NC4zNjdkNTE3LjEyZDk5NC4zMDRkNDY2Ljk0NGQxMDE1LjI5NmQ0MTYuNzY4ZDEwMzYuMjg4ZDM0NS4wODhkMTAzNi4yODhkMjczLjQwOGQxMDM2LjI4OGQyMjMuMjMyZDEwMTUuMjk2ZDE3My4wNTZkOTk0LjMwNGQxNDEuODI0ZDk1NC4zNjdkMTEwLjU5MmQ5MTQuNDMyZDk2Ljc2OGQ4NTYuMDY0ZDgyLjk0NGQ3OTcuNjk2ZDgyLjk0NGQ3MjMuOTY4ZDgyLjk0NGQyODcuNzQ0ZDE4MS4yNDhkMjE2LjA2M2QxNzguMTc2ZDE5MC40NjNkMTc4LjE3NmQxNjQuODY0ZDE3OC4xNzZkMTM5LjI2NGQxODEuMjQ4ZDExMi42MzlkMTk1LjU4NGQxMTAuNTkxZDIwOC44OTZkMTA5LjU2N2QyMjIuMjA4ZDEwOC41NDNkMjM0LjQ5NmQxMDguNTQzZDI0Ny44MDhkMTA4LjU0M2QyNjIuMTQ0ZDEwOS41NjdkMjc2LjQ4ZDExMC41OTFkMjg4Ljc2OGQxMTIuNjM5ZDI5Mi44NjRkMTM2LjE5MmQyOTIuODY0ZDE2My44NGQyOTIuODY0ZDE5Mi41MTFkMjg4Ljc2OGQyMTYuMDYzZDI3Ni40OGQyMTguMTExZDI2Mi42NTZkMjE5LjEzNWQyNDguODMyZDIyMC4xNTlkMjM1LjUyZDIyMC4xNTlkMjIzLjIzMmQyMjAuMTU5ZDIwOS40MDhkMjE5LjEzNWQxOTUuNTg0ZDIxOC4xMTFkMTgxLjI0OGQyMTYuMDYzZDQwMS40MDhkMjE2LjA2M2QzOTkuMzZkMjAyLjc1MWQzOTcuODI0ZDE5MC40NjNkMzk2LjI4OGQxNzguMTc1ZDM5Ni4yODhkMTY0Ljg2NGQzOTYuMjg4ZDE0MS4zMTJkNDAxLjQwOGQxMTIuNjM5ZDQxMy42OTZkMTEwLjU5MWQ0MjcuNTJkMTA5LjU2N2Q0NDEuMzQ0ZDEwOC41NDNkNDU0LjY1NmQxMDguNTQzZDQ2Ni45NDRkMTA4LjU0M2Q0ODAuNzY4ZDEwOS41NjdkNDk0LjU5MmQxMTAuNTkxZDUwOC45MjhkMTEyLjYzOWQ1MTJkMTM5LjI2NGQ1MTJkMTYzLjg0ZDUxMmQxOTAuNDYzZDUwOC45MjhkMjE2LjA2M2Q0OTQuNTkyZDIxOC4xMTFkNDgxLjI4ZDIxOS4xMzVkNDY3Ljk2OGQyMjAuMTU5ZDQ1NC42NTZkMjIwLjE1OWQ0NDIuMzY4ZDIyMC4xNTlkNDI4LjAzMmQyMTkuMTM1ZDQxMy42OTZkMjE4LjExMWQ0MDEuNDA4ZDIxNi4wNjNoUjNkNjkwLjE3NlI0ZDYwNy4yMzJSNWQ4Mi45NDRSNmQ5MTUuNDU2UjdkLTEyLjI4OFI4ZDgzMi41MTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMjBSMTJkODIuOTQ0UjEzZDY5MC4xNzZSMTRhaTFpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMDdvUjFkOTU4LjQ2NFIyYWQ3Ny44MjRkMjczLjQwOGQ4OS4wODhkMjcxLjM2ZDEwMi45MTJkMjcwLjMzNmQxMTYuNzM2ZDI2OS4zMTJkMTI4ZDI2OS4zMTJkMTM5LjI2NGQyNjkuMzEyZDE1My42ZDI3MC4zMzZkMTY3LjkzNmQyNzEuMzZkMTc5LjJkMjczLjQwOGQxNzkuMmQxMDI0ZDE2Ny45MzZkMTAyNi4wNDhkMTUzLjZkMTAyNy4wNzFkMTM5LjI2NGQxMDI4LjA5NmQxMjhkMTAyOC4wOTZkMTE2LjczNmQxMDI4LjA5NmQxMDIuOTEyZDEwMjcuMDcxZDg5LjA4OGQxMDI2LjA0OGQ3Ny44MjRkMTAyNGQ3Ny44MjRkMjczLjQwOGQyMDYuODQ4ZDc1MS42MTZkMzczLjc2ZDQ5OC42ODhkMzg3LjA3MmQ0OTYuNjRkNDAwLjM4NGQ0OTUuNjE2ZDQxMy42OTZkNDk0LjU5MmQ0MjguMDMyZDQ5NC41OTJkNDQzLjM5MmQ0OTQuNTkyZDQ1Ny4yMTZkNDk1LjYxNmQ0NzEuMDRkNDk2LjY0ZDQ4NS4zNzZkNDk4LjY4OGQzMTguNDY0ZDc0NC40NDhkNTE0LjA0OGQxMDI0ZDQ5OS43MTJkMTAyNi4wNDhkNDg2LjRkMTAyNy4wNzFkNDczLjA4OGQxMDI4LjA5NmQ0NTguNzUyZDEwMjguMDk2ZDQ0NC40MTZkMTAyOC4wOTZkNDMwLjA4ZDEwMjcuMDcxZDQxNS43NDRkMTAyNi4wNDhkNDAxLjQwOGQxMDI0ZDIwNi44NDhkNzUxLjYxNmhSM2Q1MjYuMzM2UjRkNTE0LjA0OFI1ZDc3LjgyNFI2ZDc1NC42ODhSN2QtNC4wOTZSOGQ2NzYuODY0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTA3UjEyZDc3LjgyNFIxM2Q1MjYuMzM2UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjIxOW9SMWQ5NTguNDY0UjJhZDgyLjk0NGQyODcuNzQ0ZDEwNy41MmQyODQuNjcyZDEzNi4xOTJkMjg0LjY3MmQxNjMuODRkMjg0LjY3MmQxODcuMzkyZDI4Ny43NDRkMTg3LjM5MmQ3MDUuNTM2ZDE4Ny4zOTJkNzY5LjAyNGQxOTUuNTg0ZDgxNC4wNzlkMjAzLjc3NmQ4NTkuMTM2ZDIyMi4yMDhkODg3LjI5NmQyNDAuNjRkOTE1LjQ1NmQyNzAuODQ4ZDkyOC43NjhkMzAxLjA1NmQ5NDIuMDhkMzQ1LjA4OGQ5NDIuMDhkMzg5LjEyZDk0Mi4wOGQ0MTguODE2ZDkyOC43NjhkNDQ4LjUxMmQ5MTUuNDU2ZDQ2Ni45NDRkODg3LjI5NmQ0ODUuMzc2ZDg1OS4xMzZkNDkzLjU2OGQ4MTQuMDc5ZDUwMS43NmQ3NjkuMDI0ZDUwMS43NmQ3MDUuNTM2ZDUwMS43NmQyODcuNzQ0ZDUyNy4zNmQyODQuNjcyZDU1My45ODRkMjg0LjY3MmQ1ODIuNjU2ZDI4NC42NzJkNjA3LjIzMmQyODcuNzQ0ZDYwNy4yMzJkNzIzLjk2OGQ2MDcuMjMyZDc5Ny42OTZkNTkzLjQwOGQ4NTYuMDY0ZDU3OS41ODRkOTE0LjQzMmQ1NDguMzUyZDk1NC4zNjdkNTE3LjEyZDk5NC4zMDRkNDY2Ljk0NGQxMDE1LjI5NmQ0MTYuNzY4ZDEwMzYuMjg4ZDM0NS4wODhkMTAzNi4yODhkMjczLjQwOGQxMDM2LjI4OGQyMjMuMjMyZDEwMTUuMjk2ZDE3My4wNTZkOTk0LjMwNGQxNDEuODI0ZDk1NC4zNjdkMTEwLjU5MmQ5MTQuNDMyZDk2Ljc2OGQ4NTYuMDY0ZDgyLjk0NGQ3OTcuNjk2ZDgyLjk0NGQ3MjMuOTY4ZDgyLjk0NGQyODcuNzQ0ZDUyMy4yNjRkMjI2LjMwM2Q1MTQuMDQ4ZDIyOC4zNTFkNTAyLjc4NGQyMjkuMzc1ZDQ5MS41MmQyMzAuMzk5ZDQ4MS4yOGQyMzAuMzk5ZDQ1OC43NTJkMjMwLjM5OWQ0NDcuNDg4ZDIzMC4zOTlkNDMzLjY2NGQyMjkuMzc1ZDQxOS44NGQyMjguMzUxZDQxMS42NDhkMjI2LjMwM2QzNDUuMDg4ZDE2My44NGQyNzguNTI4ZDIyNi4zMDNkMjY5LjMxMmQyMjguMzUxZDI1NC45NzZkMjI5LjM3NWQyNDAuNjRkMjMwLjM5OWQyMzAuNGQyMzAuMzk5ZDIwNi44NDhkMjMwLjM5OWQxOTYuNjA4ZDIzMC4zOTlkMTg1Ljg1NmQyMjkuMzc1ZDE3NS4xMDRkMjI4LjM1MWQxNjQuODY0ZDIyNi4zMDNkMjg1LjY5NmQxMTUuNzExZDI5Ni45NmQxMTMuNjYzZDMxMi4zMmQxMTIuNjM5ZDMyNy42OGQxMTEuNjE1ZDM0NS4wODhkMTExLjYxNWQzNjIuNDk2ZDExMS42MTVkMzc3LjM0NGQxMTIuNjM5ZDM5Mi4xOTJkMTEzLjY2M2Q0MDUuNTA0ZDExNS43MTFkNTIzLjI2NGQyMjYuMzAzaFIzZDY5MC4xNzZSNGQ2MDcuMjMyUjVkODIuOTQ0UjZkOTEyLjM4NFI3ZC0xMi4yODhSOGQ4MjkuNDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMTlSMTJkODIuOTQ0UjEzZDY5MC4xNzZSMTRhaTFpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpMmkzaTNpMmkyaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmhnOjEwNm9SMWQ5NTguNDY0UjJhZDExNS43MTJkNTc4LjU2ZDQ5LjE1MmQ1NzguNTZkNDcuMTA0ZDU3MC4zNjdkNDYuMDhkNTU5LjYxNmQ0NS4wNTZkNTQ4Ljg2NGQ0NS4wNTZkNTM4LjYyNGQ0NS4wNTZkNTI4LjM4NGQ0Ni4wOGQ1MTcuNjMyZDQ3LjEwNGQ1MDYuODhkNDkuMTUyZDQ5OC42ODhkMjE1LjA0ZDQ5OC42ODhkMjE1LjA0ZDEwNTMuNjk2ZDIxNS4wNGQxMDk5Ljc3NmQyMDIuNzUyZDExMzAuNDk2ZDE5MC40NjRkMTE2MS4yMTZkMTY4LjQ0OGQxMTgwLjE2ZDE0Ni40MzJkMTE5OS4xMDRkMTE2LjczNmQxMjA3LjI5NmQ4Ny4wNGQxMjE1LjQ4OGQ1Mi4yMjRkMTIxNS40ODhkLTMuMDcyZDEyMTUuNDg4ZC00MC45NmQxMjAyLjE3NmQtMzkuOTM2ZDExODIuNzJkLTM1Ljg0ZDExNjIuMjRkLTMxLjc0NGQxMTQxLjc2ZC0yNC41NzZkMTEyNS4zNzZkMGQxMTMzLjU2OGQzMi43NjhkMTEzMy41NjhkNDYuMDhkMTEzMy41NjhkNjAuNDE2ZDExMzEuNTJkNzQuNzUyZDExMjkuNDcyZDg3LjA0ZDExMjAuNzY4ZDk5LjMyOGQxMTEyLjA2NGQxMDcuNTJkMTA5NC42NTZkMTE1LjcxMmQxMDc3LjI0OGQxMTUuNzEyZDEwNDYuNTI4ZDExNS43MTJkNTc4LjU2ZDkxLjEzNmQzODEuOTUyZDg5LjA4OGQzNjcuNjE2ZDg4LjA2NGQzNTQuODE2ZDg3LjA0ZDM0Mi4wMTVkODcuMDRkMzMwLjc1MWQ4Ny4wNGQzMTkuNDg3ZDg4LjA2NGQzMDYuNjg4ZDg5LjA4OGQyOTMuODg4ZDkxLjEzNmQyODAuNTc2ZDEwNC40NDhkMjc4LjUyOGQxMTkuODA4ZDI3Ni45OTFkMTM1LjE2OGQyNzUuNDU2ZDE0Ni40MzJkMjc1LjQ1NmQxNTcuNjk2ZDI3NS40NTZkMTcyLjU0NGQyNzYuOTkxZDE4Ny4zOTJkMjc4LjUyOGQxOTkuNjhkMjgwLjU3NmQyMDEuNzI4ZDI5My44ODhkMjAyLjc1MmQzMDYuNjg4ZDIwMy43NzZkMzE5LjQ4N2QyMDMuNzc2ZDMzMC43NTFkMjAzLjc3NmQzNDIuMDE1ZDIwMi43NTJkMzU0LjgxNmQyMDEuNzI4ZDM2Ny42MTZkMTk5LjY4ZDM4MS45NTJkMTg3LjM5MmQzODRkMTcyLjU0NGQzODUuNTM1ZDE1Ny42OTZkMzg3LjA3MmQxNDYuNDMyZDM4Ny4wNzJkMTM1LjE2OGQzODcuMDcyZDExOS44MDhkMzg1LjUzNWQxMDQuNDQ4ZDM4NGQ5MS4xMzZkMzgxLjk1MmhSM2QyOTYuOTZSNGQyMTUuMDRSNWQtNDAuOTZSNmQ3NDguNTQ0UjdkLTE5MS40ODhSOGQ3ODkuNTA0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTA2UjEyZC00MC45NlIxM2QyOTYuOTZSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIxOG9SMWQ5NTguNDY0UjJhZDgyLjk0NGQyODcuNzQ0ZDEwNy41MmQyODQuNjcyZDEzNi4xOTJkMjg0LjY3MmQxNjMuODRkMjg0LjY3MmQxODcuMzkyZDI4Ny43NDRkMTg3LjM5MmQ3MDUuNTM2ZDE4Ny4zOTJkNzY5LjAyNGQxOTUuNTg0ZDgxNC4wNzlkMjAzLjc3NmQ4NTkuMTM2ZDIyMi4yMDhkODg3LjI5NmQyNDAuNjRkOTE1LjQ1NmQyNzAuODQ4ZDkyOC43NjhkMzAxLjA1NmQ5NDIuMDhkMzQ1LjA4OGQ5NDIuMDhkMzg5LjEyZDk0Mi4wOGQ0MTguODE2ZDkyOC43NjhkNDQ4LjUxMmQ5MTUuNDU2ZDQ2Ni45NDRkODg3LjI5NmQ0ODUuMzc2ZDg1OS4xMzZkNDkzLjU2OGQ4MTQuMDc5ZDUwMS43NmQ3NjkuMDI0ZDUwMS43NmQ3MDUuNTM2ZDUwMS43NmQyODcuNzQ0ZDUyNy4zNmQyODQuNjcyZDU1My45ODRkMjg0LjY3MmQ1ODIuNjU2ZDI4NC42NzJkNjA3LjIzMmQyODcuNzQ0ZDYwNy4yMzJkNzIzLjk2OGQ2MDcuMjMyZDc5Ny42OTZkNTkzLjQwOGQ4NTYuMDY0ZDU3OS41ODRkOTE0LjQzMmQ1NDguMzUyZDk1NC4zNjdkNTE3LjEyZDk5NC4zMDRkNDY2Ljk0NGQxMDE1LjI5NmQ0MTYuNzY4ZDEwMzYuMjg4ZDM0NS4wODhkMTAzNi4yODhkMjczLjQwOGQxMDM2LjI4OGQyMjMuMjMyZDEwMTUuMjk2ZDE3My4wNTZkOTk0LjMwNGQxNDEuODI0ZDk1NC4zNjdkMTEwLjU5MmQ5MTQuNDMyZDk2Ljc2OGQ4NTYuMDY0ZDgyLjk0NGQ3OTcuNjk2ZDgyLjk0NGQ3MjMuOTY4ZDgyLjk0NGQyODcuNzQ0ZDM4Mi45NzZkMjI2LjMwM2QzNjkuNjY0ZDIyOC4zNTFkMzU1LjMyOGQyMjkuMzc1ZDM0MC45OTJkMjMwLjM5OWQzMjYuNjU2ZDIzMC4zOTlkMzEyLjMyZDIzMC4zOTlkMzAwLjAzMmQyMjkuMzc1ZDI4Ny43NDRkMjI4LjM1MWQyNzMuNDA4ZDIyNi4zMDNkMzgxLjk1MmQxMTUuNzExZDM5OC4zMzZkMTEzLjY2M2Q0MTYuNzY4ZDExMi4xMjdkNDM1LjJkMTEwLjU5MWQ0NTMuNjMyZDExMC41OTFkNDczLjA4OGQxMTAuNTkxZDQ5MC40OTZkMTEyLjEyN2Q1MDcuOTA0ZDExMy42NjNkNTIyLjI0ZDExNS43MTFkMzgyLjk3NmQyMjYuMzAzaFIzZDY5MC4xNzZSNGQ2MDcuMjMyUjVkODIuOTQ0UjZkOTEzLjQwOFI3ZC0xMi4yODhSOGQ4MzAuNDY0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjE4UjEyZDgyLjk0NFIxM2Q2OTAuMTc2UjE0YWkxaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjEwNW9SMWQ5NTguNDY0UjJhZDExMi42NGQ1NzguNTZkNDYuMDhkNTc4LjU2ZDQ0LjAzMmQ1NzAuMzY3ZDQzLjAwOGQ1NTkuNjE2ZDQxLjk4NGQ1NDguODY0ZDQxLjk4NGQ1MzguNjI0ZDQxLjk4NGQ1MjguMzg0ZDQzLjAwOGQ1MTcuNjMyZDQ0LjAzMmQ1MDYuODhkNDYuMDhkNDk4LjY4OGQyMTEuOTY4ZDQ5OC42ODhkMjExLjk2OGQxMDI0ZDIwMC43MDRkMTAyNi4wNDhkMTg2Ljg4ZDEwMjcuMDcxZDE3My4wNTZkMTAyOC4wOTZkMTYxLjc5MmQxMDI4LjA5NmQxNTEuNTUyZDEwMjguMDk2ZDEzNy43MjhkMTAyNy4wNzFkMTIzLjkwNGQxMDI2LjA0OGQxMTIuNjRkMTAyNGQxMTIuNjRkNTc4LjU2ZDkwLjExMmQzODIuOTc2ZDg4LjA2NGQzNzAuNjg4ZDg3LjU1MmQzNTYuMzUyZDg3LjA0ZDM0Mi4wMTVkODcuMDRkMzMwLjc1MWQ4Ny4wNGQzMTkuNDg3ZDg3LjU1MmQzMDUuMTUxZDg4LjA2NGQyOTAuODE2ZDkwLjExMmQyNzkuNTUyZDEwMy40MjRkMjc3LjUwNGQxMTguNzg0ZDI3Ni40OGQxMzQuMTQ0ZDI3NS40NTZkMTQ1LjQwOGQyNzUuNDU2ZDE1Ni42NzJkMjc1LjQ1NmQxNzIuMDMyZDI3Ni40OGQxODcuMzkyZDI3Ny41MDRkMTk5LjY4ZDI3OS41NTJkMjAxLjcyOGQyOTAuODE2ZDIwMi4yNGQzMDUuMTUxZDIwMi43NTJkMzE5LjQ4N2QyMDIuNzUyZDMzMC43NTFkMjAyLjc1MmQzNDIuMDE1ZDIwMi4yNGQzNTYuMzUyZDIwMS43MjhkMzcwLjY4OGQxOTkuNjhkMzgyLjk3NmQxODcuMzkyZDM4NS4wMjRkMTcyLjU0NGQzODYuMDQ4ZDE1Ny42OTZkMzg3LjA3MmQxNDYuNDMyZDM4Ny4wNzJkMTM0LjE0NGQzODcuMDcyZDExOC43ODRkMzg2LjA0OGQxMDMuNDI0ZDM4NS4wMjRkOTAuMTEyZDM4Mi45NzZoUjNkMjk0LjkxMlI0ZDIxMS45NjhSNWQ0MS45ODRSNmQ3NDguNTQ0UjdkLTQuMDk2UjhkNzA2LjU2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTA1UjEyZDQxLjk4NFIxM2QyOTQuOTEyUjE0YWkxaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIxN29SMWQ5NTguNDY0UjJhZDgyLjk0NGQyODcuNzQ0ZDEwNy41MmQyODQuNjcyZDEzNi4xOTJkMjg0LjY3MmQxNjMuODRkMjg0LjY3MmQxODcuMzkyZDI4Ny43NDRkMTg3LjM5MmQ3MDUuNTM2ZDE4Ny4zOTJkNzY5LjAyNGQxOTUuNTg0ZDgxNC4wNzlkMjAzLjc3NmQ4NTkuMTM2ZDIyMi4yMDhkODg3LjI5NmQyNDAuNjRkOTE1LjQ1NmQyNzAuODQ4ZDkyOC43NjhkMzAxLjA1NmQ5NDIuMDhkMzQ1LjA4OGQ5NDIuMDhkMzg5LjEyZDk0Mi4wOGQ0MTguODE2ZDkyOC43NjhkNDQ4LjUxMmQ5MTUuNDU2ZDQ2Ni45NDRkODg3LjI5NmQ0ODUuMzc2ZDg1OS4xMzZkNDkzLjU2OGQ4MTQuMDc5ZDUwMS43NmQ3NjkuMDI0ZDUwMS43NmQ3MDUuNTM2ZDUwMS43NmQyODcuNzQ0ZDUyNy4zNmQyODQuNjcyZDU1My45ODRkMjg0LjY3MmQ1ODIuNjU2ZDI4NC42NzJkNjA3LjIzMmQyODcuNzQ0ZDYwNy4yMzJkNzIzLjk2OGQ2MDcuMjMyZDc5Ny42OTZkNTkzLjQwOGQ4NTYuMDY0ZDU3OS41ODRkOTE0LjQzMmQ1NDguMzUyZDk1NC4zNjdkNTE3LjEyZDk5NC4zMDRkNDY2Ljk0NGQxMDE1LjI5NmQ0MTYuNzY4ZDEwMzYuMjg4ZDM0NS4wODhkMTAzNi4yODhkMjczLjQwOGQxMDM2LjI4OGQyMjMuMjMyZDEwMTUuMjk2ZDE3My4wNTZkOTk0LjMwNGQxNDEuODI0ZDk1NC4zNjdkMTEwLjU5MmQ5MTQuNDMyZDk2Ljc2OGQ4NTYuMDY0ZDgyLjk0NGQ3OTcuNjk2ZDgyLjk0NGQ3MjMuOTY4ZDgyLjk0NGQyODcuNzQ0ZDE3NC4wOGQxMTUuNzExZDE4OC40MTZkMTEzLjY2M2QyMDYuMzM2ZDExMi4xMjdkMjI0LjI1NmQxMTAuNTkxZDI0Mi42ODhkMTEwLjU5MWQyNjEuMTJkMTEwLjU5MWQyODAuMDY0ZDExMi4xMjdkMjk5LjAwOGQxMTMuNjYzZDMxNS4zOTJkMTE1LjcxMWQ0MjIuOTEyZDIyNi4zMDNkMzk5LjM2ZDIzMC4zOTlkMzcwLjY4OGQyMzAuMzk5ZDM1Ni4zNTJkMjMwLjM5OWQzNDIuMDE2ZDIyOS4zNzVkMzI3LjY4ZDIyOC4zNTFkMzE0LjM2OGQyMjYuMzAzZDE3NC4wOGQxMTUuNzExaFIzZDY5MC4xNzZSNGQ2MDcuMjMyUjVkODIuOTQ0UjZkOTEzLjQwOFI3ZC0xMi4yODhSOGQ4MzAuNDY0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjE3UjEyZDgyLjk0NFIxM2Q2OTAuMTc2UjE0YWkxaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kyaTNpM2kzaTJoZzoxMDRvUjFkOTU4LjQ2NFIyYWQ4MC44OTZkMjczLjQwOGQ5Mi4xNmQyNzEuMzZkMTA1Ljk4NGQyNzAuMzM2ZDExOS44MDhkMjY5LjMxMmQxMzEuMDcyZDI2OS4zMTJkMTQyLjMzNmQyNjkuMzEyZDE1Ni42NzJkMjcwLjMzNmQxNzEuMDA4ZDI3MS4zNmQxODIuMjcyZDI3My40MDhkMTgyLjI3MmQ1NzguNTZkMTkxLjQ4OGQ1NjQuMjIzZDIwNS4zMTJkNTQ3LjgzOWQyMTkuMTM2ZDUzMS40NTZkMjM5LjEwNGQ1MTcuNjMyZDI1OS4wNzJkNTAzLjgwOGQyODUuMTg0ZDQ5NS4xMDRkMzExLjI5NmQ0ODYuNGQzNDMuMDRkNDg2LjRkNDMzLjE1MmQ0ODYuNGQ0NzYuNjcyZDUzOC4xMTJkNTIwLjE5MmQ1ODkuODI0ZDUyMC4xOTJkNjkxLjJkNTIwLjE5MmQxMDI0ZDUwOC45MjhkMTAyNi4wNDhkNDk1LjEwNGQxMDI3LjA3MWQ0ODEuMjhkMTAyOC4wOTZkNDcwLjAxNmQxMDI4LjA5NmQ0NTguNzUyZDEwMjguMDk2ZDQ0NC45MjhkMTAyNy4wNzFkNDMxLjEwNGQxMDI2LjA0OGQ0MTkuODRkMTAyNGQ0MTkuODRkNzE4Ljg0OGQ0MTkuODRkNjQ2LjE0NGQzOTUuNzc2ZDYxMS44MzlkMzcxLjcxMmQ1NzcuNTM2ZDMyMi41NmQ1NzcuNTM2ZDI5NC45MTJkNTc3LjUzNmQyNjkuMzEyZDU4Ny4yNjRkMjQzLjcxMmQ1OTYuOTkyZDIyNC4yNTZkNjE3Ljk4M2QyMDQuOGQ2MzguOTc2ZDE5My41MzZkNjcyLjc2OGQxODIuMjcyZDcwNi41NmQxODIuMjcyZDc1NC42ODhkMTgyLjI3MmQxMDI0ZDE3MS4wMDhkMTAyNi4wNDhkMTU2LjY3MmQxMDI3LjA3MWQxNDIuMzM2ZDEwMjguMDk2ZDEzMS4wNzJkMTAyOC4wOTZkMTIwLjgzMmQxMDI4LjA5NmQxMDYuNDk2ZDEwMjcuMDcxZDkyLjE2ZDEwMjYuMDQ4ZDgwLjg5NmQxMDI0ZDgwLjg5NmQyNzMuNDA4aFIzZDU5MS44NzJSNGQ1MjAuMTkyUjVkODAuODk2UjZkNzU0LjY4OFI3ZC00LjA5NlI4ZDY3My43OTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMDRSMTJkODAuODk2UjEzZDU5MS44NzJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaGc6MjE2b1IxZDk1OC40NjRSMmFkMzcwLjY4OGQxMDM2LjI4OGQzMDkuMjQ4ZDEwMzYuMjg4ZDI2MS42MzJkMTAxOS45MDRkMjE0LjAxNmQxMDAzLjUyZDE3Ny4xNTJkOTcyLjhkMTQwLjI4OGQxMDI0ZDEyMi44OGQxMDI3LjA3MWQ5OS4zMjhkMTAyNy4wNzFkNzUuNzc2ZDEwMjcuMDcxZDU3LjM0NGQxMDI0ZDEzMS4wNzJkOTIyLjYyNGQ5NS4yMzJkODcyLjQ0OGQ3Ny4zMTJkODA0Ljg2NGQ1OS4zOTJkNzM3LjI4ZDU5LjM5MmQ2NTYuMzg0ZDU5LjM5MmQ1NzMuNDRkNzguMzM2ZDUwMy44MDhkOTcuMjhkNDM0LjE3NWQxMzUuNjhkMzgzLjQ4N2QxNzQuMDhkMzMyLjc5OWQyMzIuNDQ4ZDMwNC4xMjdkMjkwLjgxNmQyNzUuNDU2ZDM3MC42ODhkMjc1LjQ1NmQ0MjkuMDU2ZDI3NS40NTZkNDc2LjE2ZDI5MC44MTZkNTIzLjI2NGQzMDYuMTc1ZDU1OS4xMDRkMzM1Ljg3MWQ1OTMuOTJkMjg3Ljc0NGQ2MDIuMTEyZDI4NS42OTZkNjExLjg0ZDI4NC42NzJkNjIxLjU2OGQyODMuNjQ4ZDYzMy44NTZkMjgzLjY0OGQ2NDcuMTY4ZDI4My42NDhkNjU3LjQwOGQyODQuNjcyZDY2Ny42NDhkMjg1LjY5NmQ2NzYuODY0ZDI4Ny43NDRkNjA2LjIwOGQzODUuMDI0ZDY0NC4wOTZkNDM2LjIyM2Q2NjIuNTI4ZDUwNC44MzJkNjgwLjk2ZDU3My40NGQ2ODAuOTZkNjU2LjM4NGQ2ODAuOTZkNzM5LjMyOGQ2NjIuNTI4ZDgwOC45NmQ2NDQuMDk2ZDg3OC41OTJkNjA1LjY5NmQ5MjkuMjhkNTY3LjI5NmQ5NzkuOTY4ZDUwOC45MjhkMTAwOC4xMjhkNDUwLjU2ZDEwMzYuMjg4ZDM3MC42ODhkMTAzNi4yODhkMzcwLjY4OGQ5NDYuMTc2ZDQyMS44ODhkOTQ2LjE3NmQ0NTkuMjY0ZDkyNi4yMDhkNDk2LjY0ZDkwNi4yNGQ1MjEuMjE2ZDg2OC4zNTJkNTQ1Ljc5MmQ4MzAuNDY0ZDU1OC4wOGQ3NzcuMjE2ZDU3MC4zNjhkNzIzLjk2OGQ1NzAuMzY4ZDY1Ni4zODRkNTcwLjM2OGQ1NDkuODg3ZDUzOC42MjRkNDc3LjE4M2QyMzYuNTQ0ZDg5MC44OGQyODYuNzJkOTQ2LjE3NmQzNzAuNjg4ZDk0Ni4xNzZkMTcxLjAwOGQ2NTYuMzg0ZDE3MS4wMDhkNzYwLjgzMmQxOTguNjU2ZDgyOS40NGQ0OTguNjg4ZDQxNy43OTJkNDUwLjU2ZDM2Ny42MTZkMzcwLjY4OGQzNjcuNjE2ZDMxOS40ODhkMzY3LjYxNmQyODIuMTEyZDM4Ny41ODNkMjQ0LjczNmQ0MDcuNTUyZDIyMC4xNmQ0NDQuOTI4ZDE5NS41ODRkNDgyLjMwNGQxODMuMjk2ZDUzNi4wNjRkMTcxLjAwOGQ1ODkuODI0ZDE3MS4wMDhkNjU2LjM4NGhSM2Q3NDEuMzc2UjRkNjgwLjk2UjVkNTcuMzQ0UjZkNzQ4LjU0NFI3ZC0xMi4yODhSOGQ2OTEuMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIxNlIxMmQ1Ny4zNDRSMTNkNzQxLjM3NlIxNGFpMWkzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpMmkzaTFpM2kyaTNpM2kzaTNpM2hnOjEwM29SMWQ5NTguNDY0UjJhZDM2My41MmQ5NTYuNDE1ZDQ1NC42NTZkOTU4LjQ2NGQ0OTUuNjE2ZDk5NS4zMjhkNTM2LjU3NmQxMDMyLjE5MmQ1MzYuNTc2ZDEwOTYuNzA0ZDUzNi41NzZkMTEzOC42ODhkNTE1LjA3MmQxMTcxLjk2OGQ0OTMuNTY4ZDEyMDUuMjQ4ZDQ1NS42OGQxMjI5LjMxMmQ0MTcuNzkyZDEyNTMuMzc2ZDM2Ni4wOGQxMjY2LjE3NmQzMTQuMzY4ZDEyNzguOTc2ZDI1My45NTJkMTI3OC45NzZkMTQ4LjQ4ZDEyNzguOTc2ZDkzLjE4NGQxMjQ2LjIwOGQzNy44ODhkMTIxMy40NGQzNy44ODhkMTE0Mi43ODRkMzcuODg4ZDExMDAuOGQ2MC40MTZkMTA2Ny41MmQ4Mi45NDRkMTAzNC4yNGQxMTguNzg0ZDEwMTQuNzg0ZDk4LjMwNGQxMDAxLjQ3MmQ4NC40OGQ5ODEuNTA0ZDcwLjY1NmQ5NjEuNTM2ZDcwLjY1NmQ5MzEuODRkNzAuNjU2ZDg5My45NTJkODcuNTUyZDg2Ni4zMDRkMTA0LjQ0OGQ4MzguNjU2ZDEzMy4xMmQ4MTcuMTUyZDk5LjMyOGQ3OTMuNmQ3OC44NDhkNzU2LjIyM2Q1OC4zNjhkNzE4Ljg0OGQ1OC4zNjhkNjcxLjc0M2Q1OC4zNjhkNjMyLjgzMmQ3Mi43MDRkNTk5LjA0ZDg3LjA0ZDU2NS4yNDhkMTE0LjE3NmQ1NDAuMTZkMTQxLjMxMmQ1MTUuMDcyZDE4MS4yNDhkNTAwLjczNmQyMjEuMTg0ZDQ4Ni40ZDI3Mi4zODRkNDg2LjRkMzE4LjQ2NGQ0ODYuNGQzNTUuODRkNDk5LjcxMmQzOTMuMjE2ZDUxMy4wMjRkNDE5Ljg0ZDUzMy41MDNkNDQwLjMyZDUxNy4xMmQ0NzUuMTM2ZDUwNi4zNjdkNTA5Ljk1MmQ0OTUuNjE2ZDU1MS45MzZkNDk1LjYxNmQ1NTYuMDMyZDUxNS4wNzJkNTU2LjAzMmQ1MzguNjI0ZDU1Ni4wMzJkNTQ5Ljg4N2Q1NTUuMDA4ZDU2Mi4xNzVkNTUzLjk4NGQ1NzQuNDY0ZDU1MS45MzZkNTg2Ljc1MmQ0NTkuNzc2ZDU4Ni43NTJkNDcxLjA0ZDYwNC4xNmQ0NzcuMTg0ZDYyNC42NGQ0ODMuMzI4ZDY0NS4xMmQ0ODMuMzI4ZDY3MS43NDNkNDgzLjMyOGQ3MTMuNzI4ZDQ2Ny45NjhkNzQ3LjUyZDQ1Mi42MDhkNzgxLjMxMmQ0MjQuNDQ4ZDgwNS4zNzZkMzk2LjI4OGQ4MjkuNDRkMzU3LjM3NmQ4NDIuMjRkMzE4LjQ2NGQ4NTUuMDRkMjcyLjM4NGQ4NTUuMDRkMjMwLjRkODU1LjA0ZDE5Ni42MDhkODQ1LjgyNGQxODIuMjcyZDg1NC4wMTZkMTY4LjQ0OGQ4NzAuOTEyZDE1NC42MjRkODg3LjgwOGQxNTQuNjI0ZDkwNy4yNjRkMTU0LjYyNGQ5MjUuNjk2ZDE2Ny45MzZkOTM5LjUyZDE4MS4yNDhkOTUzLjM0NGQyMjcuMzI4ZDk1NC4zNjdkMzYzLjUyZDk1Ni40MTVkMjI1LjI4ZDEwMzcuMzExZDE3OS4yZDEwMzYuMjg4ZDE1Ni4xNmQxMDYxLjg4OGQxMzMuMTJkMTA4Ny40ODhkMTMzLjEyZDExMjMuMzI4ZDEzMy4xMmQxMTQ1Ljg1NmQxNDIuMzM2ZDExNjAuMTkyZDE1MS41NTJkMTE3NC41MjhkMTY4LjQ0OGQxMTgzLjIzMmQxODUuMzQ0ZDExOTEuOTM2ZDIwOC4zODRkMTE5NS41MmQyMzEuNDI0ZDExOTkuMTA0ZDI1OS4wNzJkMTE5OS4xMDRkMzQwLjk5MmQxMTk5LjEwNGQzODcuMDcyZDExNzEuOTY4ZDQzMy4xNTJkMTE0NC44MzJkNDMzLjE1MmQxMTAzLjg3MmQ0MzMuMTUyZDEwNzMuMTUyZDQxMy42OTZkMTA1Ni43NjhkMzk0LjI0ZDEwNDAuMzg0ZDM0Mi4wMTZkMTAzOS4zNTlkMjI1LjI4ZDEwMzcuMzExZDI3Mi4zODRkNzgxLjMxMmQzMjcuNjhkNzgxLjMxMmQzNTQuMzA0ZDc1MC41OTJkMzgwLjkyOGQ3MTkuODcyZDM4MC45MjhkNjcxLjc0M2QzODAuOTI4ZDYyMi41OTJkMzU0LjMwNGQ1OTEuMzZkMzI3LjY4ZDU2MC4xMjdkMjcyLjM4NGQ1NjAuMTI3ZDIxNy4wODhkNTYwLjEyN2QxOTAuOTc2ZDU5MS4zNmQxNjQuODY0ZDYyMi41OTJkMTY0Ljg2NGQ2NzEuNzQzZDE2NC44NjRkNzE5Ljg3MmQxOTAuOTc2ZDc1MC41OTJkMjE3LjA4OGQ3ODEuMzEyZDI3Mi4zODRkNzgxLjMxMmhSM2Q1NjYuMjcyUjRkNTU2LjAzMlI1ZDM3Ljg4OFI2ZDUzNy42UjdkLTI1NC45NzZSOGQ0OTkuNzEyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTAzUjEyZDM3Ljg4OFIxM2Q1NjYuMjcyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNoZzoyMTVvUjFkOTU4LjQ2NFIyYWQyNDIuNjg4ZDY2MS41MDRkMjEwLjk0NGQ2MzAuNzg0ZDE4MC4yMjRkNTk5LjU1MWQxNDkuNTA0ZDU2OC4zMTlkMTE4Ljc4NGQ1MzcuNTk5ZDEzMS4wNzJkNTE5LjE2OGQxNDcuOTY4ZDUwMi43ODRkMTY0Ljg2NGQ0ODYuNGQxODMuMjk2ZDQ3Mi4wNjNkMzA3LjJkNTk2Ljk5MmQzMzcuOTJkNTY1LjI0OGQzNjguNjRkNTM1LjA0ZDM5OS4zNmQ1MDQuODMyZDQzMS4xMDRkNDczLjA4N2Q0NjcuOTY4ZDUwMC43MzZkNDk1LjYxNmQ1MzcuNTk5ZDQzNC4xNzZkNjAwLjA2NGQzNzEuNzEyZDY2MS41MDRkNDM0LjE3NmQ3MjIuOTQ0ZDQ5NS42MTZkNzg1LjQwOGQ0ODIuMzA0ZDgwMy44NGQ0NjUuNDA4ZDgyMC43MzZkNDQ4LjUxMmQ4MzcuNjMyZDQzMS4xMDRkODQ4Ljg5NmQzMDguMjI0ZDcyNi4wMTZkMTgyLjI3MmQ4NDkuOTJkMTQ0LjM4NGQ4MjQuMzE5ZDExNy43NmQ3ODUuNDA4ZDI0Mi42ODhkNjYxLjUwNGhSM2Q2MTQuNFI0ZDQ5NS42MTZSNWQxMTcuNzZSNmQ1NTEuOTM2UjdkMTc0LjA4UjhkNDM0LjE3NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIxNVIxMmQxMTcuNzZSMTNkNjE0LjRSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpMmhnOjEwMm9SMWQ5NTguNDY0UjJhZDExNy43NmQ1NzguNTZkMzEuNzQ0ZDU3OC41NmQyNy42NDhkNTYyLjE3NWQyNy42NDhkNTM4LjYyNGQyNy42NDhkNTE2LjA5NmQzMS43NDRkNDk4LjY4OGQxMTcuNzZkNDk4LjY4OGQxMTcuNzZkNDYxLjgyM2QxMTcuNzZkMzY0LjU0NGQxNjYuNGQzMTMuODU2ZDIxNS4wNGQyNjMuMTY4ZDMwOC4yMjRkMjYzLjE2OGQzMzMuODI0ZDI2My4xNjhkMzUzLjI4ZDI2NS43MjdkMzcyLjczNmQyNjguMjg4ZDM5MC4xNDRkMjczLjQwOGQzODguMDk2ZDI5OS4wMDhkMzg0LjUxMmQzMTcuNDM5ZDM4MC45MjhkMzM1Ljg3MWQzNzQuNzg0ZDM1NS4zMjhkMzY0LjU0NGQzNTMuMjhkMzUwLjcyZDM1MC43MmQzMzYuODk2ZDM0OC4xNTlkMzE3LjQ0ZDM0OC4xNTlkMjk0LjkxMmQzNDguMTU5ZDI3Ni45OTJkMzUyLjc2OGQyNTkuMDcyZDM1Ny4zNzZkMjQ2LjI3MmQzNzAuMTc1ZDIzMy40NzJkMzgyLjk3NmQyMjYuMzA0ZDQwNi4wMTVkMjE5LjEzNmQ0MjkuMDU2ZDIxOS4xMzZkNDY0Ljg5NWQyMTkuMTM2ZDQ5OC42ODhkMzUzLjI4ZDQ5OC42ODhkMzU2LjM1MmQ1MTkuMTY4ZDM1Ni4zNTJkNTQwLjY3MmQzNTYuMzUyZDU2MC4xMjdkMzUzLjI4ZDU3OC41NmQyMTkuMTM2ZDU3OC41NmQyMTkuMTM2ZDEwMjRkMjA3Ljg3MmQxMDI2LjA0OGQxOTQuMDQ4ZDEwMjcuMDcxZDE4MC4yMjRkMTAyOC4wOTZkMTY4Ljk2ZDEwMjguMDk2ZDE1Ny42OTZkMTAyOC4wOTZkMTQzLjM2ZDEwMjcuMDcxZDEyOS4wMjRkMTAyNi4wNDhkMTE3Ljc2ZDEwMjRkMTE3Ljc2ZDU3OC41NmhSM2QzNzguODhSNGQzOTAuMTQ0UjVkMjcuNjQ4UjZkNzYwLjgzMlI3ZC00LjA5NlI4ZDczMy4xODRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMDJSMTJkMjcuNjQ4UjEzZDM3OC44OFIxNGFpMWkyaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kyaTJpM2kzaTNpM2kyaGc6MjE0b1IxZDk1OC40NjRSMmFkNjMzLjg1NmQxMDM2LjI4OGQ1NTMuOTg0ZDEwMzYuMjg4ZDQ5NS42MTZkMTAwOC4xMjhkNDM3LjI0OGQ5NzkuOTY4ZDM5OC44NDhkOTI5LjI4ZDM2MC40NDhkODc4LjU5MmQzNDEuNTA0ZDgwOC45NmQzMjIuNTZkNzM5LjMyOGQzMjIuNTZkNjU2LjM4NGQzMjIuNTZkNTczLjQ0ZDM0MS41MDRkNTAzLjgwOGQzNjAuNDQ4ZDQzNC4xNzVkMzk4Ljg0OGQzODMuNDg3ZDQzNy4yNDhkMzMyLjc5OWQ0OTUuNjE2ZDMwNC4xMjdkNTUzLjk4NGQyNzUuNDU2ZDYzMy44NTZkMjc1LjQ1NmQ3MTMuNzI4ZDI3NS40NTZkNzcyLjA5NmQzMDQuMTI3ZDgzMC40NjRkMzMyLjc5OWQ4NjguODY0ZDM4My40ODdkOTA3LjI2NGQ0MzQuMTc1ZDkyNS42OTZkNTAzLjgwOGQ5NDQuMTI4ZDU3My40NGQ5NDQuMTI4ZDY1Ni4zODRkOTQ0LjEyOGQ3MzkuMzI4ZDkyNS42OTZkODA4Ljk2ZDkwNy4yNjRkODc4LjU5MmQ4NjguODY0ZDkyOS4yOGQ4MzAuNDY0ZDk3OS45NjhkNzcyLjA5NmQxMDA4LjEyOGQ3MTMuNzI4ZDEwMzYuMjg4ZDYzMy44NTZkMTAzNi4yODhkNjMzLjg1NmQ5NDYuMTc2ZDY4NS4wNTZkOTQ2LjE3NmQ3MjIuNDMyZDkyNi4yMDhkNzU5LjgwOGQ5MDYuMjRkNzg0LjM4NGQ4NjguMzUyZDgwOC45NmQ4MzAuNDY0ZDgyMS4yNDhkNzc3LjIxNmQ4MzMuNTM2ZDcyMy45NjhkODMzLjUzNmQ2NTYuMzg0ZDgzMy41MzZkNTg5LjgyNGQ4MjEuMjQ4ZDUzNi4wNjRkODA4Ljk2ZDQ4Mi4zMDRkNzg0LjM4NGQ0NDQuOTI4ZDc1OS44MDhkNDA3LjU1MmQ3MjIuNDMyZDM4Ny41ODNkNjg1LjA1NmQzNjcuNjE2ZDYzMy44NTZkMzY3LjYxNmQ1ODIuNjU2ZDM2Ny42MTZkNTQ1LjI4ZDM4Ny41ODNkNTA3LjkwNGQ0MDcuNTUyZDQ4My4zMjhkNDQ0LjkyOGQ0NTguNzUyZDQ4Mi4zMDRkNDQ2LjQ2NGQ1MzYuMDY0ZDQzNC4xNzZkNTg5LjgyNGQ0MzQuMTc2ZDY1Ni4zODRkNDM0LjE3NmQ3MjMuOTY4ZDQ0Ni40NjRkNzc3LjIxNmQ0NTguNzUyZDgzMC40NjRkNDgzLjMyOGQ4NjguMzUyZDUwNy45MDRkOTA2LjI0ZDU0NS4yOGQ5MjYuMjA4ZDU4Mi42NTZkOTQ2LjE3NmQ2MzMuODU2ZDk0Ni4xNzZkMjA1LjgyNGQyMTYuMDYzZDIwMi43NTJkMTkwLjQ2M2QyMDIuNzUyZDE2NC44NjRkMjAyLjc1MmQxMzkuMjY0ZDIwNS44MjRkMTEyLjYzOWQyMjAuMTZkMTEwLjU5MWQyMzMuNDcyZDEwOS41NjdkMjQ2Ljc4NGQxMDguNTQzZDI1OS4wNzJkMTA4LjU0M2QyNzIuMzg0ZDEwOC41NDNkMjg2LjcyZDEwOS41NjdkMzAxLjA1NmQxMTAuNTkxZDMxMy4zNDRkMTEyLjYzOWQzMTcuNDRkMTM2LjE5MmQzMTcuNDRkMTYzLjg0ZDMxNy40NGQxOTIuNTExZDMxMy4zNDRkMjE2LjA2M2QzMDEuMDU2ZDIxOC4xMTFkMjg3LjIzMmQyMTkuMTM1ZDI3My40MDhkMjIwLjE1OWQyNjAuMDk2ZDIyMC4xNTlkMjQ3LjgwOGQyMjAuMTU5ZDIzMy45ODRkMjE5LjEzNWQyMjAuMTZkMjE4LjExMWQyMDUuODI0ZDIxNi4wNjNkNDI1Ljk4NGQyMTYuMDYzZDQyMy45MzZkMjAyLjc1MWQ0MjIuNGQxOTAuNDYzZDQyMC44NjRkMTc4LjE3NWQ0MjAuODY0ZDE2NC44NjRkNDIwLjg2NGQxNDEuMzEyZDQyNS45ODRkMTEyLjYzOWQ0MzguMjcyZDExMC41OTFkNDUyLjA5NmQxMDkuNTY3ZDQ2NS45MmQxMDguNTQzZDQ3OS4yMzJkMTA4LjU0M2Q0OTEuNTJkMTA4LjU0M2Q1MDUuMzQ0ZDEwOS41NjdkNTE5LjE2OGQxMTAuNTkxZDUzMy41MDRkMTEyLjYzOWQ1MzYuNTc2ZDEzOS4yNjRkNTM2LjU3NmQxNjMuODRkNTM2LjU3NmQxOTAuNDYzZDUzMy41MDRkMjE2LjA2M2Q1MTkuMTY4ZDIxOC4xMTFkNTA1Ljg1NmQyMTkuMTM1ZDQ5Mi41NDRkMjIwLjE1OWQ0NzkuMjMyZDIyMC4xNTlkNDY2Ljk0NGQyMjAuMTU5ZDQ1Mi42MDhkMjE5LjEzNWQ0MzguMjcyZDIxOC4xMTFkNDI1Ljk4NGQyMTYuMDYzaFIzZDc0MS4zNzZSNGQ2ODEuOTg0UjVkNjAuNDE2UjZkOTE1LjQ1NlI3ZC0xMi4yODhSOGQ4NTUuMDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMTRSMTJkNjAuNDE2UjEzZDc0MS4zNzZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMDFvUjFkOTU4LjQ2NFIyYWQxNTcuNjk2ZDc4Ni40MzJkMTU5Ljc0NGQ4NzIuNDQ4ZDIwMi4yNGQ5MTIuMzg0ZDI0NC43MzZkOTUyLjMxOWQzMjcuNjhkOTUyLjMxOWQ0MDAuMzg0ZDk1Mi4zMTlkNDY1LjkyZDkyNi43MmQ0NzQuMTEyZDk0Mi4wOGQ0NzkuMjMyZDk2NC4wOTZkNDg0LjM1MmQ5ODYuMTEyZDQ4NS4zNzZkMTAwNy42MTZkNDUxLjU4NGQxMDIxLjk1MmQ0MTEuMTM2ZDEwMjkuMTE5ZDM3MC42ODhkMTAzNi4yODhkMzIxLjUzNmQxMDM2LjI4OGQyNDkuODU2ZDEwMzYuMjg4ZDE5OC42NTZkMTAxNi4zMmQxNDcuNDU2ZDk5Ni4zNTJkMTE0LjE3NmQ5NjBkODAuODk2ZDkyMy42NDhkNjUuNTM2ZDg3My45ODRkNTAuMTc2ZDgyNC4zMTlkNTAuMTc2ZDc2NC45MjhkNTAuMTc2ZDcwNi41NmQ2NS4wMjRkNjU1Ljg3MmQ3OS44NzJkNjA1LjE4NGQxMTAuNTkyZDU2Ny44MDhkMTQxLjMxMmQ1MzAuNDMyZDE4Ny45MDRkNTA4LjQxNWQyMzQuNDk2ZDQ4Ni40ZDI5Ny45ODRkNDg2LjRkMzUyLjI1NmQ0ODYuNGQzOTMuMjE2ZDUwNC44MzJkNDM0LjE3NmQ1MjMuMjY0ZDQ2MS44MjRkNTU1LjUyZDQ4OS40NzJkNTg3Ljc3NmQ1MDMuODA4ZDYzMi4zMTlkNTE4LjE0NGQ2NzYuODY0ZDUxOC4xNDRkNzI5LjA4OGQ1MTguMTQ0ZDc0My40MjRkNTE3LjEyZDc1OS4yOTZkNTE2LjA5NmQ3NzUuMTY4ZDUxNS4wNzJkNzg2LjQzMmQxNTcuNjk2ZDc4Ni40MzJkNDE3Ljc5MmQ3MTAuNjU2ZDQxNy43OTJkNjgxLjk4M2Q0MTAuMTEyZDY1NS44NzJkNDAyLjQzMmQ2MjkuNzZkMzg3LjU4NGQ2MTAuMzA0ZDM3Mi43MzZkNTkwLjg0OGQzNDkuNjk2ZDU3OS4wNzJkMzI2LjY1NmQ1NjcuMjk2ZDI5NC45MTJkNTY3LjI5NmQyMzIuNDQ4ZDU2Ny4yOTZkMTk5LjE2OGQ2MDUuMTg0ZDE2NS44ODhkNjQzLjA3MmQxNTguNzJkNzEwLjY1NmQ0MTcuNzkyZDcxMC42NTZoUjNkNTY5LjM0NFI0ZDUxOC4xNDRSNWQ1MC4xNzZSNmQ1MzcuNlI3ZC0xMi4yODhSOGQ0ODcuNDI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTAxUjEyZDUwLjE3NlIxM2Q1NjkuMzQ0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaGc6MjEzb1IxZDk1OC40NjRSMmFkNjMzLjg1NmQxMDM2LjI4OGQ1NTMuOTg0ZDEwMzYuMjg4ZDQ5NS42MTZkMTAwOC4xMjhkNDM3LjI0OGQ5NzkuOTY4ZDM5OC44NDhkOTI5LjI4ZDM2MC40NDhkODc4LjU5MmQzNDEuNTA0ZDgwOC45NmQzMjIuNTZkNzM5LjMyOGQzMjIuNTZkNjU2LjM4NGQzMjIuNTZkNTczLjQ0ZDM0MS41MDRkNTAzLjgwOGQzNjAuNDQ4ZDQzNC4xNzVkMzk4Ljg0OGQzODMuNDg3ZDQzNy4yNDhkMzMyLjc5OWQ0OTUuNjE2ZDMwNC4xMjdkNTUzLjk4NGQyNzUuNDU2ZDYzMy44NTZkMjc1LjQ1NmQ3MTMuNzI4ZDI3NS40NTZkNzcyLjA5NmQzMDQuMTI3ZDgzMC40NjRkMzMyLjc5OWQ4NjguODY0ZDM4My40ODdkOTA3LjI2NGQ0MzQuMTc1ZDkyNS42OTZkNTAzLjgwOGQ5NDQuMTI4ZDU3My40NGQ5NDQuMTI4ZDY1Ni4zODRkOTQ0LjEyOGQ3MzkuMzI4ZDkyNS42OTZkODA4Ljk2ZDkwNy4yNjRkODc4LjU5MmQ4NjguODY0ZDkyOS4yOGQ4MzAuNDY0ZDk3OS45NjhkNzcyLjA5NmQxMDA4LjEyOGQ3MTMuNzI4ZDEwMzYuMjg4ZDYzMy44NTZkMTAzNi4yODhkNjMzLjg1NmQ5NDYuMTc2ZDY4NS4wNTZkOTQ2LjE3NmQ3MjIuNDMyZDkyNi4yMDhkNzU5LjgwOGQ5MDYuMjRkNzg0LjM4NGQ4NjguMzUyZDgwOC45NmQ4MzAuNDY0ZDgyMS4yNDhkNzc3LjIxNmQ4MzMuNTM2ZDcyMy45NjhkODMzLjUzNmQ2NTYuMzg0ZDgzMy41MzZkNTg5LjgyNGQ4MjEuMjQ4ZDUzNi4wNjRkODA4Ljk2ZDQ4Mi4zMDRkNzg0LjM4NGQ0NDQuOTI4ZDc1OS44MDhkNDA3LjU1MmQ3MjIuNDMyZDM4Ny41ODNkNjg1LjA1NmQzNjcuNjE2ZDYzMy44NTZkMzY3LjYxNmQ1ODIuNjU2ZDM2Ny42MTZkNTQ1LjI4ZDM4Ny41ODNkNTA3LjkwNGQ0MDcuNTUyZDQ4My4zMjhkNDQ0LjkyOGQ0NTguNzUyZDQ4Mi4zMDRkNDQ2LjQ2NGQ1MzYuMDY0ZDQzNC4xNzZkNTg5LjgyNGQ0MzQuMTc2ZDY1Ni4zODRkNDM0LjE3NmQ3MjMuOTY4ZDQ0Ni40NjRkNzc3LjIxNmQ0NTguNzUyZDgzMC40NjRkNDgzLjMyOGQ4NjguMzUyZDUwNy45MDRkOTA2LjI0ZDU0NS4yOGQ5MjYuMjA4ZDU4Mi42NTZkOTQ2LjE3NmQ2MzMuODU2ZDk0Ni4xNzZkMTg5LjQ0ZDE0NC4zODRkMjA1LjgyNGQxMjUuOTUyZDIzMi40NDhkMTA5LjA1NWQyNTkuMDcyZDkyLjE1OWQyOTIuODY0ZDkyLjE1OWQzMTQuMzY4ZDkyLjE1OWQzMzUuODcyZDEwMC4zNTFkMzU3LjM3NmQxMDguNTQzZDM3Ny44NTZkMTE3Ljc1OWQzOTguMzM2ZDEyNi45NzZkNDE4LjMwNGQxMzUuMTY4ZDQzOC4yNzJkMTQzLjM2ZDQ1OC43NTJkMTQzLjM2ZDQ3OC4yMDhkMTQzLjM2ZDQ5My4wNTZkMTM1LjY3OWQ1MDcuOTA0ZDEyOGQ1MjguMzg0ZDEwOC41NDNkNTUxLjkzNmQxMzcuMjE2ZDU2Mi4xNzZkMTY4Ljk2ZDU0NC43NjhkMTg2LjM2N2Q1MTguNjU2ZDIwMi4yNGQ0OTIuNTQ0ZDIxOC4xMTFkNDU5Ljc3NmQyMTguMTExZDQzNy4yNDhkMjE4LjExMWQ0MTUuNzQ0ZDIxMC40MzJkMzk0LjI0ZDIwMi43NTFkMzczLjc2ZDE5My4wMjRkMzUzLjI4ZDE4My4yOTVkMzMzLjMxMmQxNzUuNjE2ZDMxMy4zNDRkMTY3LjkzNmQyOTMuODg4ZDE2Ny45MzZkMjcyLjM4NGQxNjcuOTM2ZDI1Ny41MzZkMTc2LjY0ZDI0Mi42ODhkMTg1LjM0M2QyMjMuMjMyZDIwMi43NTFkMjExLjk2OGQxODguNDE1ZDIwMi43NTJkMTc0LjU5MWQxOTMuNTM2ZDE2MC43NjhkMTg5LjQ0ZDE0NC4zODRoUjNkNzQxLjM3NlI0ZDY4MS45ODRSNWQ2MC40MTZSNmQ5MzEuODRSN2QtMTIuMjg4UjhkODcxLjQyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIxM1IxMmQ2MC40MTZSMTNkNzQxLjM3NlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMDBvUjFkOTU4LjQ2NFIyYWQ0MTguODE2ZDI3My40MDhkNDMwLjA4ZDI3MS4zNmQ0NDQuNDE2ZDI3MC4zMzZkNDU4Ljc1MmQyNjkuMzEyZDQ2OC45OTJkMjY5LjMxMmQ0ODAuMjU2ZDI2OS4zMTJkNDk0LjA4ZDI3MC4zMzZkNTA3LjkwNGQyNzEuMzZkNTE5LjE2OGQyNzMuNDA4ZDUxOS4xNjhkMTAwOS42NjRkNDgwLjI1NmQxMDIwLjkyOGQ0MzIuMTI4ZDEwMjguNjA4ZDM4NGQxMDM2LjI4OGQzMjQuNjA4ZDEwMzYuMjg4ZDI2OS4zMTJkMTAzNi4yODhkMjE5LjY0OGQxMDIyLjQ2NGQxNjkuOTg0ZDEwMDguNjRkMTMzLjEyZDk3Ni44OTZkOTYuMjU2ZDk0NS4xNTJkNzQuNzUyZDg5NC45NzZkNTMuMjQ4ZDg0NC44ZDUzLjI0OGQ3NzEuMDcyZDUzLjI0OGQ3MDcuNTg0ZDcyLjE5MmQ2NTUuMzZkOTEuMTM2ZDYwMy4xMzZkMTI1Ljk1MmQ1NjUuNzZkMTYwLjc2OGQ1MjguMzg0ZDIwOS40MDhkNTA3LjkwNGQyNTguMDQ4ZDQ4Ny40MjRkMzE3LjQ0ZDQ4Ny40MjRkMzQ0LjA2NGQ0ODcuNDI0ZDM3MS4yZDQ5MS41MmQzOTguMzM2ZDQ5NS42MTZkNDE4LjgxNmQ1MDEuNzZkNDE4LjgxNmQyNzMuNDA4ZDQxOC44MTZkNTg3Ljc3NmQzOTguMzM2ZDU3OS41ODRkMzc0Ljc4NGQ1NzUuNDg4ZDM1MS4yMzJkNTcxLjM5MmQzMjMuNTg0ZDU3MS4zOTJkMjgxLjZkNTcxLjM5MmQyNTAuODhkNTg2Ljc1MmQyMjAuMTZkNjAyLjExMmQyMDAuMTkyZDYyOC43MzZkMTgwLjIyNGQ2NTUuMzZkMTcwLjQ5NmQ2OTEuNzEyZDE2MC43NjhkNzI4LjA2NGQxNjAuNzY4ZDc3MS4wNzJkMTYxLjc5MmQ4NjguMzUyZDIwNi44NDhkOTEwLjMzNmQyNTEuOTA0ZDk1Mi4zMTlkMzI5LjcyOGQ5NTIuMzE5ZDM1Ni4zNTJkOTUyLjMxOWQzNzguODhkOTQ5Ljc2ZDQwMS40MDhkOTQ3LjJkNDE4LjgxNmQ5NDIuMDhkNDE4LjgxNmQ1ODcuNzc2aFIzZDYwMC4wNjRSNGQ1MTkuMTY4UjVkNTMuMjQ4UjZkNzU0LjY4OFI3ZC0xMi4yODhSOGQ3MDEuNDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMDBSMTJkNTMuMjQ4UjEzZDYwMC4wNjRSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzoyMTJvUjFkOTU4LjQ2NFIyYWQ2MzMuODU2ZDEwMzYuMjg4ZDU1My45ODRkMTAzNi4yODhkNDk1LjYxNmQxMDA4LjEyOGQ0MzcuMjQ4ZDk3OS45NjhkMzk4Ljg0OGQ5MjkuMjhkMzYwLjQ0OGQ4NzguNTkyZDM0MS41MDRkODA4Ljk2ZDMyMi41NmQ3MzkuMzI4ZDMyMi41NmQ2NTYuMzg0ZDMyMi41NmQ1NzMuNDRkMzQxLjUwNGQ1MDMuODA4ZDM2MC40NDhkNDM0LjE3NWQzOTguODQ4ZDM4My40ODdkNDM3LjI0OGQzMzIuNzk5ZDQ5NS42MTZkMzA0LjEyN2Q1NTMuOTg0ZDI3NS40NTZkNjMzLjg1NmQyNzUuNDU2ZDcxMy43MjhkMjc1LjQ1NmQ3NzIuMDk2ZDMwNC4xMjdkODMwLjQ2NGQzMzIuNzk5ZDg2OC44NjRkMzgzLjQ4N2Q5MDcuMjY0ZDQzNC4xNzVkOTI1LjY5NmQ1MDMuODA4ZDk0NC4xMjhkNTczLjQ0ZDk0NC4xMjhkNjU2LjM4NGQ5NDQuMTI4ZDczOS4zMjhkOTI1LjY5NmQ4MDguOTZkOTA3LjI2NGQ4NzguNTkyZDg2OC44NjRkOTI5LjI4ZDgzMC40NjRkOTc5Ljk2OGQ3NzIuMDk2ZDEwMDguMTI4ZDcxMy43MjhkMTAzNi4yODhkNjMzLjg1NmQxMDM2LjI4OGQ2MzMuODU2ZDk0Ni4xNzZkNjg1LjA1NmQ5NDYuMTc2ZDcyMi40MzJkOTI2LjIwOGQ3NTkuODA4ZDkwNi4yNGQ3ODQuMzg0ZDg2OC4zNTJkODA4Ljk2ZDgzMC40NjRkODIxLjI0OGQ3NzcuMjE2ZDgzMy41MzZkNzIzLjk2OGQ4MzMuNTM2ZDY1Ni4zODRkODMzLjUzNmQ1ODkuODI0ZDgyMS4yNDhkNTM2LjA2NGQ4MDguOTZkNDgyLjMwNGQ3ODQuMzg0ZDQ0NC45MjhkNzU5LjgwOGQ0MDcuNTUyZDcyMi40MzJkMzg3LjU4M2Q2ODUuMDU2ZDM2Ny42MTZkNjMzLjg1NmQzNjcuNjE2ZDU4Mi42NTZkMzY3LjYxNmQ1NDUuMjhkMzg3LjU4M2Q1MDcuOTA0ZDQwNy41NTJkNDgzLjMyOGQ0NDQuOTI4ZDQ1OC43NTJkNDgyLjMwNGQ0NDYuNDY0ZDUzNi4wNjRkNDM0LjE3NmQ1ODkuODI0ZDQzNC4xNzZkNjU2LjM4NGQ0MzQuMTc2ZDcyMy45NjhkNDQ2LjQ2NGQ3NzcuMjE2ZDQ1OC43NTJkODMwLjQ2NGQ0ODMuMzI4ZDg2OC4zNTJkNTA3LjkwNGQ5MDYuMjRkNTQ1LjI4ZDkyNi4yMDhkNTgyLjY1NmQ5NDYuMTc2ZDYzMy44NTZkOTQ2LjE3NmQ1NDcuODRkMjI2LjMwM2Q1MzguNjI0ZDIyOC4zNTFkNTI3LjM2ZDIyOS4zNzVkNTE2LjA5NmQyMzAuMzk5ZDUwNS44NTZkMjMwLjM5OWQ0ODMuMzI4ZDIzMC4zOTlkNDcyLjA2NGQyMzAuMzk5ZDQ1OC4yNGQyMjkuMzc1ZDQ0NC40MTZkMjI4LjM1MWQ0MzYuMjI0ZDIyNi4zMDNkMzY5LjY2NGQxNjMuODRkMzAzLjEwNGQyMjYuMzAzZDI5My44ODhkMjI4LjM1MWQyNzkuNTUyZDIyOS4zNzVkMjY1LjIxNmQyMzAuMzk5ZDI1NC45NzZkMjMwLjM5OWQyMzEuNDI0ZDIzMC4zOTlkMjIxLjE4NGQyMzAuMzk5ZDIxMC40MzJkMjI5LjM3NWQxOTkuNjhkMjI4LjM1MWQxODkuNDRkMjI2LjMwM2QzMTAuMjcyZDExNS43MTFkMzIxLjUzNmQxMTMuNjYzZDMzNi44OTZkMTEyLjYzOWQzNTIuMjU2ZDExMS42MTVkMzY5LjY2NGQxMTEuNjE1ZDM4Ny4wNzJkMTExLjYxNWQ0MDEuOTJkMTEyLjYzOWQ0MTYuNzY4ZDExMy42NjNkNDMwLjA4ZDExNS43MTFkNTQ3Ljg0ZDIyNi4zMDNoUjNkNzQxLjM3NlI0ZDY4MS45ODRSNWQ2MC40MTZSNmQ5MTIuMzg0UjdkLTEyLjI4OFI4ZDg1MS45NjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMTJSMTJkNjAuNDE2UjEzZDc0MS4zNzZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpMmkzaTNpMmkyaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmhnOjk5b1IxZDk1OC40NjRSMmFkNDMyLjEyOGQ5MzIuODY0ZDQ0MC4zMmQ5NDcuMmQ0NDYuNDY0ZDk2OC43MDRkNDUyLjYwOGQ5OTAuMjA4ZDQ1My42MzJkMTAxMi43MzZkMzkzLjIxNmQxMDM2LjI4OGQzMTUuMzkyZDEwMzYuMjg4ZDE4NC4zMmQxMDM2LjI4OGQxMTcuNzZkOTYyLjA0OGQ1MS4yZDg4Ny44MDhkNTEuMmQ3NjEuODU2ZDUxLjJkNzAzLjQ4OGQ2Ny41ODRkNjUzLjMxMmQ4My45NjhkNjAzLjEzNmQxMTYuMjI0ZDU2Ni4yNzFkMTQ4LjQ4ZDUyOS40MDhkMTk2LjYwOGQ1MDcuOTA0ZDI0NC43MzZkNDg2LjRkMzA4LjIyNGQ0ODYuNGQzNTEuMjMyZDQ4Ni40ZDM4NGQ0OTEuNTJkNDE2Ljc2OGQ0OTYuNjRkNDQ2LjQ2NGQ1MDcuOTA0ZDQ0Ni40NjRkNTI1LjMxMmQ0NDEuODU2ZDU0OC4zNTJkNDM3LjI0OGQ1NzEuMzkyZDQyOS4wNTZkNTg4LjhkMzc4Ljg4ZDU3MS4zOTJkMzE0LjM2OGQ1NzEuMzkyZDIzNS41MmQ1NzEuMzkyZDE5Ni42MDhkNjIzLjYxNmQxNTcuNjk2ZDY3NS44MzlkMTU3LjY5NmQ3NjEuODU2ZDE1Ny42OTZkODYwLjE2ZDIwMS43MjhkOTA1LjcyOGQyNDUuNzZkOTUxLjI5NmQzMjIuNTZkOTUxLjI5NmQzNTMuMjhkOTUxLjI5NmQzNzkuMzkyZDk0Ny4yZDQwNS41MDRkOTQzLjEwNGQ0MzIuMTI4ZDkzMi44NjRoUjNkNDg5LjQ3MlI0ZDQ1My42MzJSNWQ1MS4yUjZkNTM3LjZSN2QtMTIuMjg4UjhkNDg2LjRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk5OVIxMmQ1MS4yUjEzZDQ4OS40NzJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjExb1IxZDk1OC40NjRSMmFkNjMzLjg1NmQxMDM2LjI4OGQ1NTMuOTg0ZDEwMzYuMjg4ZDQ5NS42MTZkMTAwOC4xMjhkNDM3LjI0OGQ5NzkuOTY4ZDM5OC44NDhkOTI5LjI4ZDM2MC40NDhkODc4LjU5MmQzNDEuNTA0ZDgwOC45NmQzMjIuNTZkNzM5LjMyOGQzMjIuNTZkNjU2LjM4NGQzMjIuNTZkNTczLjQ0ZDM0MS41MDRkNTAzLjgwOGQzNjAuNDQ4ZDQzNC4xNzVkMzk4Ljg0OGQzODMuNDg3ZDQzNy4yNDhkMzMyLjc5OWQ0OTUuNjE2ZDMwNC4xMjdkNTUzLjk4NGQyNzUuNDU2ZDYzMy44NTZkMjc1LjQ1NmQ3MTMuNzI4ZDI3NS40NTZkNzcyLjA5NmQzMDQuMTI3ZDgzMC40NjRkMzMyLjc5OWQ4NjguODY0ZDM4My40ODdkOTA3LjI2NGQ0MzQuMTc1ZDkyNS42OTZkNTAzLjgwOGQ5NDQuMTI4ZDU3My40NGQ5NDQuMTI4ZDY1Ni4zODRkOTQ0LjEyOGQ3MzkuMzI4ZDkyNS42OTZkODA4Ljk2ZDkwNy4yNjRkODc4LjU5MmQ4NjguODY0ZDkyOS4yOGQ4MzAuNDY0ZDk3OS45NjhkNzcyLjA5NmQxMDA4LjEyOGQ3MTMuNzI4ZDEwMzYuMjg4ZDYzMy44NTZkMTAzNi4yODhkNjMzLjg1NmQ5NDYuMTc2ZDY4NS4wNTZkOTQ2LjE3NmQ3MjIuNDMyZDkyNi4yMDhkNzU5LjgwOGQ5MDYuMjRkNzg0LjM4NGQ4NjguMzUyZDgwOC45NmQ4MzAuNDY0ZDgyMS4yNDhkNzc3LjIxNmQ4MzMuNTM2ZDcyMy45NjhkODMzLjUzNmQ2NTYuMzg0ZDgzMy41MzZkNTg5LjgyNGQ4MjEuMjQ4ZDUzNi4wNjRkODA4Ljk2ZDQ4Mi4zMDRkNzg0LjM4NGQ0NDQuOTI4ZDc1OS44MDhkNDA3LjU1MmQ3MjIuNDMyZDM4Ny41ODNkNjg1LjA1NmQzNjcuNjE2ZDYzMy44NTZkMzY3LjYxNmQ1ODIuNjU2ZDM2Ny42MTZkNTQ1LjI4ZDM4Ny41ODNkNTA3LjkwNGQ0MDcuNTUyZDQ4My4zMjhkNDQ0LjkyOGQ0NTguNzUyZDQ4Mi4zMDRkNDQ2LjQ2NGQ1MzYuMDY0ZDQzNC4xNzZkNTg5LjgyNGQ0MzQuMTc2ZDY1Ni4zODRkNDM0LjE3NmQ3MjMuOTY4ZDQ0Ni40NjRkNzc3LjIxNmQ0NTguNzUyZDgzMC40NjRkNDgzLjMyOGQ4NjguMzUyZDUwNy45MDRkOTA2LjI0ZDU0NS4yOGQ5MjYuMjA4ZDU4Mi42NTZkOTQ2LjE3NmQ2MzMuODU2ZDk0Ni4xNzZkMzk2LjI4OGQyMjYuMzAzZDM4Mi45NzZkMjI4LjM1MWQzNjguNjRkMjI5LjM3NWQzNTQuMzA0ZDIzMC4zOTlkMzM5Ljk2OGQyMzAuMzk5ZDMyNS42MzJkMjMwLjM5OWQzMTMuMzQ0ZDIyOS4zNzVkMzAxLjA1NmQyMjguMzUxZDI4Ni43MmQyMjYuMzAzZDM5NS4yNjRkMTE1LjcxMWQ0MTEuNjQ4ZDExMy42NjNkNDMwLjA4ZDExMi4xMjdkNDQ4LjUxMmQxMTAuNTkxZDQ2Ni45NDRkMTEwLjU5MWQ0ODYuNGQxMTAuNTkxZDUwMy44MDhkMTEyLjEyN2Q1MjEuMjE2ZDExMy42NjNkNTM1LjU1MmQxMTUuNzExZDM5Ni4yODhkMjI2LjMwM2hSM2Q3NDEuMzc2UjRkNjgxLjk4NFI1ZDYwLjQxNlI2ZDkxMy40MDhSN2QtMTIuMjg4UjhkODUyLjk5MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIxMVIxMmQ2MC40MTZSMTNkNzQxLjM3NlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzo5OG9SMWQ5NTguNDY0UjJhZDgwLjg5NmQyNzMuNDA4ZDkyLjE2ZDI3MS4zNmQxMDUuOTg0ZDI3MC4zMzZkMTE5LjgwOGQyNjkuMzEyZDEzMS4wNzJkMjY5LjMxMmQxNDIuMzM2ZDI2OS4zMTJkMTU2LjY3MmQyNzAuMzM2ZDE3MS4wMDhkMjcxLjM2ZDE4Mi4yNzJkMjczLjQwOGQxODIuMjcyZDU2Mi4xNzVkMjAwLjcwNGQ1MzEuNDU2ZDIzOS42MTZkNTA4LjkyOGQyNzguNTI4ZDQ4Ni40ZDMzMy44MjRkNDg2LjRkMzgwLjkyOGQ0ODYuNGQ0MjAuODY0ZDUwMS43NmQ0NjAuOGQ1MTcuMTJkNDg5LjQ3MmQ1NDkuMzc2ZDUxOC4xNDRkNTgxLjYzMmQ1MzQuMDE2ZDYzMS4yOTZkNTQ5Ljg4OGQ2ODAuOTZkNTQ5Ljg4OGQ3NDguNTQ0ZDU0OS44ODhkODgzLjcxMmQ0NzMuNmQ5NjBkMzk3LjMxMmQxMDM2LjI4OGQyNTMuOTUyZDEwMzYuMjg4ZDIwOC44OTZkMTAzNi4yODhkMTYxLjI4ZDEwMjcuNTg0ZDExMy42NjRkMTAxOC44OGQ4MC44OTZkMTAwNy42MTZkODAuODk2ZDI3My40MDhkMTgyLjI3MmQ5MzkuMDA4ZDIwMC43MDRkOTQ1LjE1MmQyMjEuNjk2ZDk0Ny43MTJkMjQyLjY4OGQ5NTAuMjcxZDI2NS4yMTZkOTUwLjI3MWQzMDMuMTA0ZDk1MC4yNzFkMzM1LjM2ZDkzOC40OTZkMzY3LjYxNmQ5MjYuNzJkMzkxLjE2OGQ5MDIuNjU2ZDQxNC43MmQ4NzguNTkyZDQyOC41NDRkODQxLjIxNmQ0NDIuMzY4ZDgwMy44NGQ0NDIuMzY4ZDc1Mi42NGQ0NDIuMzY4ZDY2Ny42NDdkNDEyLjY3MmQ2MjAuNTQ0ZDM4Mi45NzZkNTczLjQ0ZDMxNC4zNjhkNTczLjQ0ZDI5MC44MTZkNTczLjQ0ZDI2Ny43NzZkNTgxLjEyZDI0NC43MzZkNTg4LjhkMjI1LjI4ZDYwNS42OTVkMjA1LjgyNGQ2MjIuNTkyZDE5NC4wNDhkNjUwLjc1MmQxODIuMjcyZDY3OC45MTJkMTgyLjI3MmQ3MTguODQ4ZDE4Mi4yNzJkOTM5LjAwOGhSM2Q2MDQuMTZSNGQ1NDkuODg4UjVkODAuODk2UjZkNzU0LjY4OFI3ZC0xMi4yODhSOGQ2NzMuNzkyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpOThSMTJkODAuODk2UjEzZDYwNC4xNlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjIxMG9SMWQ5NTguNDY0UjJhZDYzMy44NTZkMTAzNi4yODhkNTUzLjk4NGQxMDM2LjI4OGQ0OTUuNjE2ZDEwMDguMTI4ZDQzNy4yNDhkOTc5Ljk2OGQzOTguODQ4ZDkyOS4yOGQzNjAuNDQ4ZDg3OC41OTJkMzQxLjUwNGQ4MDguOTZkMzIyLjU2ZDczOS4zMjhkMzIyLjU2ZDY1Ni4zODRkMzIyLjU2ZDU3My40NGQzNDEuNTA0ZDUwMy44MDhkMzYwLjQ0OGQ0MzQuMTc1ZDM5OC44NDhkMzgzLjQ4N2Q0MzcuMjQ4ZDMzMi43OTlkNDk1LjYxNmQzMDQuMTI3ZDU1My45ODRkMjc1LjQ1NmQ2MzMuODU2ZDI3NS40NTZkNzEzLjcyOGQyNzUuNDU2ZDc3Mi4wOTZkMzA0LjEyN2Q4MzAuNDY0ZDMzMi43OTlkODY4Ljg2NGQzODMuNDg3ZDkwNy4yNjRkNDM0LjE3NWQ5MjUuNjk2ZDUwMy44MDhkOTQ0LjEyOGQ1NzMuNDRkOTQ0LjEyOGQ2NTYuMzg0ZDk0NC4xMjhkNzM5LjMyOGQ5MjUuNjk2ZDgwOC45NmQ5MDcuMjY0ZDg3OC41OTJkODY4Ljg2NGQ5MjkuMjhkODMwLjQ2NGQ5NzkuOTY4ZDc3Mi4wOTZkMTAwOC4xMjhkNzEzLjcyOGQxMDM2LjI4OGQ2MzMuODU2ZDEwMzYuMjg4ZDYzMy44NTZkOTQ2LjE3NmQ2ODUuMDU2ZDk0Ni4xNzZkNzIyLjQzMmQ5MjYuMjA4ZDc1OS44MDhkOTA2LjI0ZDc4NC4zODRkODY4LjM1MmQ4MDguOTZkODMwLjQ2NGQ4MjEuMjQ4ZDc3Ny4yMTZkODMzLjUzNmQ3MjMuOTY4ZDgzMy41MzZkNjU2LjM4NGQ4MzMuNTM2ZDU4OS44MjRkODIxLjI0OGQ1MzYuMDY0ZDgwOC45NmQ0ODIuMzA0ZDc4NC4zODRkNDQ0LjkyOGQ3NTkuODA4ZDQwNy41NTJkNzIyLjQzMmQzODcuNTgzZDY4NS4wNTZkMzY3LjYxNmQ2MzMuODU2ZDM2Ny42MTZkNTgyLjY1NmQzNjcuNjE2ZDU0NS4yOGQzODcuNTgzZDUwNy45MDRkNDA3LjU1MmQ0ODMuMzI4ZDQ0NC45MjhkNDU4Ljc1MmQ0ODIuMzA0ZDQ0Ni40NjRkNTM2LjA2NGQ0MzQuMTc2ZDU4OS44MjRkNDM0LjE3NmQ2NTYuMzg0ZDQzNC4xNzZkNzIzLjk2OGQ0NDYuNDY0ZDc3Ny4yMTZkNDU4Ljc1MmQ4MzAuNDY0ZDQ4My4zMjhkODY4LjM1MmQ1MDcuOTA0ZDkwNi4yNGQ1NDUuMjhkOTI2LjIwOGQ1ODIuNjU2ZDk0Ni4xNzZkNjMzLjg1NmQ5NDYuMTc2ZDE4OS40NGQxMTUuNzExZDIwMy43NzZkMTEzLjY2M2QyMjEuNjk2ZDExMi4xMjdkMjM5LjYxNmQxMTAuNTkxZDI1OC4wNDhkMTEwLjU5MWQyNzYuNDhkMTEwLjU5MWQyOTUuNDI0ZDExMi4xMjdkMzE0LjM2OGQxMTMuNjYzZDMzMC43NTJkMTE1LjcxMWQ0MzguMjcyZDIyNi4zMDNkNDE0LjcyZDIzMC4zOTlkMzg2LjA0OGQyMzAuMzk5ZDM3MS43MTJkMjMwLjM5OWQzNTcuMzc2ZDIyOS4zNzVkMzQzLjA0ZDIyOC4zNTFkMzI5LjcyOGQyMjYuMzAzZDE4OS40NGQxMTUuNzExaFIzZDc0MS4zNzZSNGQ2ODEuOTg0UjVkNjAuNDE2UjZkOTEzLjQwOFI3ZC0xMi4yODhSOGQ4NTIuOTkyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjEwUjEyZDYwLjQxNlIxM2Q3NDEuMzc2UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kyaTNpM2kzaTJoZzo5N29SMWQ5NTguNDY0UjJhZDM1OS40MjRkNzc3LjIxNmQzNDQuMDY0ZDc3NS4xNjhkMzIwLjUxMmQ3NzMuMTJkMjk2Ljk2ZDc3MS4wNzJkMjgwLjU3NmQ3NzEuMDcyZDIxNy4wODhkNzcxLjA3MmQxODMuODA4ZDc5NC42MjRkMTUwLjUyOGQ4MTguMTc1ZDE1MC41MjhkODY2LjMwNGQxNTAuNTI4ZDg5Ny4wMjRkMTYxLjc5MmQ5MTQuNDMyZDE3My4wNTZkOTMxLjg0ZDE4OS45NTJkOTQxLjA1NmQyMDYuODQ4ZDk1MC4yNzFkMjI3LjMyOGQ5NTIuMzE5ZDI0Ny44MDhkOTU0LjM2N2QyNjYuMjRkOTU0LjM2N2QyODkuNzkyZDk1NC4zNjdkMzE0Ljg4ZDk1MS44MDhkMzM5Ljk2OGQ5NDkuMjQ4ZDM1OS40MjRkOTQ0LjEyOGQzNTkuNDI0ZDc3Ny4yMTZkMzU5LjQyNGQ2NzcuODg3ZDM1OS40MjRkNjE3LjQ3MmQzMjguNzA0ZDU5My45MmQyOTcuOTg0ZDU3MC4zNjdkMjM5LjYxNmQ1NzAuMzY3ZDIwMy43NzZkNTcwLjM2N2QxNzIuNTQ0ZDU3NmQxNDEuMzEyZDU4MS42MzJkMTExLjYxNmQ1OTAuODQ4ZDkyLjE2ZDU1Ny4wNTZkOTIuMTZkNTA5Ljk1MmQxMjYuOTc2ZDQ5OC42ODhkMTY4Ljk2ZDQ5Mi41NDRkMjEwLjk0NGQ0ODYuNGQyNDkuODU2ZDQ4Ni40ZDM1Mi4yNTZkNDg2LjRkNDA1LjUwNGQ1MzIuOTkyZDQ1OC43NTJkNTc5LjU4NGQ0NTguNzUyZDY4MS45ODNkNDU4Ljc1MmQxMDEwLjY4OGQ0MjIuOTEyZDEwMTguODhkMzcxLjcxMmQxMDI3LjU4NGQzMjAuNTEyZDEwMzYuMjg4ZDI2Ny4yNjRkMTAzNi4yODhkMjE3LjA4OGQxMDM2LjI4OGQxNzYuNjRkMTAyNy4wNzFkMTM2LjE5MmQxMDE3Ljg1NmQxMDguMDMyZDk5Ny4zNzZkNzkuODcyZDk3Ni44OTZkNjQuNTEyZDk0NS4xNTJkNDkuMTUyZDkxMy40MDhkNDkuMTUyZDg2OC4zNTJkNDkuMTUyZDgyNC4zMTlkNjcuMDcyZDc5MS4wNGQ4NC45OTJkNzU3Ljc2ZDExNS43MTJkNzM1Ljc0M2QxNDYuNDMyZDcxMy43MjhkMTg2LjM2OGQ3MDIuOTc2ZDIyNi4zMDRkNjkyLjIyM2QyNzAuMzM2ZDY5Mi4yMjNkMzAzLjEwNGQ2OTIuMjIzZDMyNC4wOTZkNjkzLjc2ZDM0NS4wODhkNjk1LjI5NmQzNTkuNDI0ZDY5Ny4zNDRkMzU5LjQyNGQ2NzcuODg3aFIzZDUyOS40MDhSNGQ0NTguNzUyUjVkNDkuMTUyUjZkNTM3LjZSN2QtMTIuMjg4UjhkNDg4LjQ0OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTk3UjEyZDQ5LjE1MlIxM2Q1MjkuNDA4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjIwOW9SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDEwMS4zNzZkMjg1LjY5NmQxMTQuMTc2ZDI4NC42NzJkMTI2Ljk3NmQyODMuNjQ4ZDEzOC4yNGQyODMuNjQ4ZDE0OS41MDRkMjgzLjY0OGQxNjIuMzA0ZDI4NC42NzJkMTc1LjEwNGQyODUuNjk2ZDE4Ni4zNjhkMjg3Ljc0NGQ1MDYuODhkODQwLjcwNGQ1MDYuODhkMjg3Ljc0NGQ1MTkuMTY4ZDI4NS42OTZkNTMyLjQ4ZDI4NC42NzJkNTQ1Ljc5MmQyODMuNjQ4ZDU1OS4xMDRkMjgzLjY0OGQ1NzAuMzY4ZDI4My42NDhkNTgyLjY1NmQyODQuNjcyZDU5NC45NDRkMjg1LjY5NmQ2MDYuMjA4ZDI4Ny43NDRkNjA2LjIwOGQxMDI0ZDU5NC45NDRkMTAyNi4wNDhkNTgyLjE0NGQxMDI3LjA3MWQ1NjkuMzQ0ZDEwMjguMDk2ZDU1OC4wOGQxMDI4LjA5NmQ1NDYuODE2ZDEwMjguMDk2ZDUzNC4wMTZkMTAyNy4wNzFkNTIxLjIxNmQxMDI2LjA0OGQ1MDkuOTUyZDEwMjRkMTg4LjQxNmQ0NzQuMTExZDE4OC40MTZkMTAyNGQxNzcuMTUyZDEwMjYuMDQ4ZDE2NC4zNTJkMTAyNy4wNzFkMTUxLjU1MmQxMDI4LjA5NmQxMzkuMjY0ZDEwMjguMDk2ZDEyNS45NTJkMTAyOC4wOTZkMTEzLjE1MmQxMDI3LjA3MWQxMDAuMzUyZDEwMjYuMDQ4ZDkwLjExMmQxMDI0ZDkwLjExMmQyODcuNzQ0ZDE2NS44ODhkMTQ0LjM4NGQxODIuMjcyZDEyNS45NTJkMjA4Ljg5NmQxMDkuMDU1ZDIzNS41MmQ5Mi4xNTlkMjY5LjMxMmQ5Mi4xNTlkMjkwLjgxNmQ5Mi4xNTlkMzEyLjMyZDEwMC4zNTFkMzMzLjgyNGQxMDguNTQzZDM1NC4zMDRkMTE3Ljc1OWQzNzQuNzg0ZDEyNi45NzZkMzk0Ljc1MmQxMzUuMTY4ZDQxNC43MmQxNDMuMzZkNDM1LjJkMTQzLjM2ZDQ1NC42NTZkMTQzLjM2ZDQ2OS41MDRkMTM1LjY3OWQ0ODQuMzUyZDEyOGQ1MDQuODMyZDEwOC41NDNkNTI4LjM4NGQxMzcuMjE2ZDUzOC42MjRkMTY4Ljk2ZDUyMS4yMTZkMTg2LjM2N2Q0OTUuMTA0ZDIwMi4yNGQ0NjguOTkyZDIxOC4xMTFkNDM2LjIyNGQyMTguMTExZDQxMy42OTZkMjE4LjExMWQzOTIuMTkyZDIxMC40MzJkMzcwLjY4OGQyMDIuNzUxZDM1MC4yMDhkMTkzLjAyNGQzMjkuNzI4ZDE4My4yOTVkMzA5Ljc2ZDE3NS42MTZkMjg5Ljc5MmQxNjcuOTM2ZDI3MC4zMzZkMTY3LjkzNmQyNDguODMyZDE2Ny45MzZkMjMzLjk4NGQxNzYuNjRkMjE5LjEzNmQxODUuMzQzZDE5OS42OGQyMDIuNzUxZDE4OC40MTZkMTg4LjQxNWQxNzkuMmQxNzQuNTkxZDE2OS45ODRkMTYwLjc2OGQxNjUuODg4ZDE0NC4zODRoUjNkNjk2LjMyUjRkNjA2LjIwOFI1ZDkwLjExMlI2ZDkzMS44NFI3ZC00LjA5NlI4ZDg0MS43MjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMDlSMTJkOTAuMTEyUjEzZDY5Ni4zMlIxNGFpMWkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjk2b1IxZDk1OC40NjRSMmFkMTMyLjA5NmQyODUuNjk2ZDE0Ny40NTZkMjgzLjY0OGQxNjIuODE2ZDI4Mi42MjRkMTc4LjE3NmQyODEuNmQxOTYuNjA4ZDI4MS42ZDIxMi45OTJkMjgxLjZkMjI5Ljg4OGQyODIuNjI0ZDI0Ni43ODRkMjgzLjY0OGQyNjIuMTQ0ZDI4NS42OTZkMzc5LjkwNGQ0MTUuNzQ0ZDM1Ni4zNTJkNDE5Ljg0ZDMzMS43NzZkNDE5Ljg0ZDMxNi40MTZkNDE5Ljg0ZDMwMi41OTJkNDE4LjgxNmQyODguNzY4ZDQxNy43OTJkMjc3LjUwNGQ0MTUuNzQ0ZDEzMi4wOTZkMjg1LjY5NmhSM2Q1MTJSNGQzNzkuOTA0UjVkMTMyLjA5NlI2ZDc0Mi40UjdkNjA0LjE2UjhkNjEwLjMwNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTk2UjEyZDEzMi4wOTZSMTNkNTEyUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kyaGc6MjA4b1IxZDk1OC40NjRSMmFkMTAwLjM1MmQ2ODUuMDU2ZDE2LjM4NGQ2ODUuMDU2ZDE0LjMzNmQ2NzYuODY0ZDEzLjMxMmQ2NjYuNjI0ZDEyLjI4OGQ2NTYuMzg0ZDEyLjI4OGQ2NDcuMTY4ZDEyLjI4OGQ2MzcuOTUyZDEzLjMxMmQ2MjcuMmQxNC4zMzZkNjE2LjQ0OGQxNi4zODRkNjA4LjI1NmQxMDAuMzUyZDYwOC4yNTZkMTAwLjM1MmQyODcuNzQ0ZDEzNS4xNjhkMjgzLjY0OGQxODQuMzJkMjgwLjA2M2QyMzMuNDcyZDI3Ni40OGQyODAuNTc2ZDI3Ni40OGQ0NzQuMTEyZDI3Ni40OGQ1NjkuODU2ZDM3NC43ODRkNjY1LjZkNDczLjA4N2Q2NjUuNmQ2NTcuNDA4ZDY2NS42ZDg0OS45MmQ1NjcuODA4ZDk0My4xMDRkNDcwLjAxNmQxMDM2LjI4OGQyNzYuNDhkMTAzNi4yODhkMjI4LjM1MmQxMDM2LjI4OGQxODEuMjQ4ZDEwMzIuNzA0ZDEzNC4xNDRkMTAyOS4xMTlkMTAwLjM1MmQxMDI0ZDEwMC4zNTJkNjg1LjA1NmQyMDQuOGQ2MDguMjU2ZDM3MC42ODhkNjA4LjI1NmQzNzIuNzM2ZDYxNi40NDhkMzczLjc2ZDYyNy4yZDM3NC43ODRkNjM3Ljk1MmQzNzQuNzg0ZDY0Ny4xNjhkMzc0Ljc4NGQ2NTUuMzZkMzczLjc2ZDY2Ni4xMTJkMzcyLjczNmQ2NzYuODY0ZDM3MC42ODhkNjg1LjA1NmQyMDQuOGQ2ODUuMDU2ZDIwNC44ZDkzNy45ODRkMjE5LjEzNmQ5NDAuMDMyZDI0MC4xMjhkOTQxLjU2OGQyNjEuMTJkOTQzLjEwNGQyODQuNjcyZDk0My4xMDRkMzQ1LjA4OGQ5NDMuMTA0ZDM5NC43NTJkOTI5LjI4ZDQ0NC40MTZkOTE1LjQ1NmQ0ODAuMjU2ZDg4Mi42ODhkNTE2LjA5NmQ4NDkuOTJkNTM1LjU1MmQ3OTQuMTEyZDU1NS4wMDhkNzM4LjMwNGQ1NTUuMDA4ZDY1NC4zMzZkNTU1LjAwOGQ1NzcuNTM2ZDUzNS41NTJkNTIzLjI2NGQ1MTYuMDk2ZDQ2OC45OTFkNDgwLjc2OGQ0MzQuNjg4ZDQ0NS40NGQ0MDAuMzg0ZDM5Ni4yODhkMzg1LjAyNGQzNDcuMTM2ZDM2OS42NjRkMjg3Ljc0NGQzNjkuNjY0ZDI2OC4yODhkMzY5LjY2NGQyNDUuMjQ4ZDM3MC4xNzVkMjIyLjIwOGQzNzAuNjg4ZDIwNC44ZDM3My43NmQyMDQuOGQ2MDguMjU2aFIzZDcyNC45OTJSNGQ2NjUuNlI1ZDEyLjI4OFI2ZDc0Ny41MlI3ZC0xMi4yODhSOGQ3MzUuMjMyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjA4UjEyZDEyLjI4OFIxM2Q3MjQuOTkyUjE0YWkxaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTJpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzo5NW9SMWQ5NTguNDY0UjJhZDUxMmQxMDM5LjM1OWQ1MTYuMDk2ZDEwNTYuNzY4ZDUxNi4wOTZkMTA3Ny4yNDhkNTE2LjA5NmQxMDk2LjcwNGQ1MTJkMTExNC4xMTJkNi4xNDRkMTExNC4xMTJkMy4wNzJkMTEwMy44NzJkMi4wNDhkMTA5NC42NTZkMS4wMjRkMTA4NS40NGQxLjAyNGQxMDc1LjJkMS4wMjRkMTA2Ny4wMDhkMi4wNDhkMTA1Ny43OTJkMy4wNzJkMTA0OC41NzZkNi4xNDRkMTAzOS4zNTlkNTEyZDEwMzkuMzU5aFIzZDUxNy4xMlI0ZDUxNi4wOTZSNWQxLjAyNFI2ZC0xNS4zNlI3ZC05MC4xMTJSOGQtMTYuMzg0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpOTVSMTJkMS4wMjRSMTNkNTE3LjEyUjE0YWkxaTNpM2kyaTNpM2kzaTNpMmhnOjIwN29SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDEwMi40ZDI4NS42OTZkMTE1LjcxMmQyODQuNjcyZDEyOS4wMjRkMjgzLjY0OGQxNDIuMzM2ZDI4My42NDhkMTU1LjY0OGQyODMuNjQ4ZDE2OC45NmQyODQuNjcyZDE4Mi4yNzJkMjg1LjY5NmQxOTQuNTZkMjg3Ljc0NGQxOTQuNTZkMTAyNGQxODIuMjcyZDEwMjYuMDQ4ZDE2OS40NzJkMTAyNy4wNzFkMTU2LjY3MmQxMDI4LjA5NmQxNDIuMzM2ZDEwMjguMDk2ZDEyOS4wMjRkMTAyOC4wOTZkMTE1LjJkMTAyNy4wNzFkMTAxLjM3NmQxMDI2LjA0OGQ5MC4xMTJkMTAyNGQ5MC4xMTJkMjg3Ljc0NGQyNDEuNjY0ZDIxNi4wNjNkMjM4LjU5MmQxOTAuNDYzZDIzOC41OTJkMTY0Ljg2NGQyMzguNTkyZDEzOS4yNjRkMjQxLjY2NGQxMTIuNjM5ZDI1NmQxMTAuNTkxZDI2OS4zMTJkMTA5LjU2N2QyODIuNjI0ZDEwOC41NDNkMjk0LjkxMmQxMDguNTQzZDMwOC4yMjRkMTA4LjU0M2QzMjIuNTZkMTA5LjU2N2QzMzYuODk2ZDExMC41OTFkMzQ5LjE4NGQxMTIuNjM5ZDM1My4yOGQxMzYuMTkyZDM1My4yOGQxNjMuODRkMzUzLjI4ZDE5Mi41MTFkMzQ5LjE4NGQyMTYuMDYzZDMzNi44OTZkMjE4LjExMWQzMjMuMDcyZDIxOS4xMzVkMzA5LjI0OGQyMjAuMTU5ZDI5NS45MzZkMjIwLjE1OWQyODMuNjQ4ZDIyMC4xNTlkMjY5LjgyNGQyMTkuMTM1ZDI1NmQyMTguMTExZDI0MS42NjRkMjE2LjA2M2Q0NjEuODI0ZDIxNi4wNjNkNDU5Ljc3NmQyMDIuNzUxZDQ1OC4yNGQxOTAuNDYzZDQ1Ni43MDRkMTc4LjE3NWQ0NTYuNzA0ZDE2NC44NjRkNDU2LjcwNGQxNDEuMzEyZDQ2MS44MjRkMTEyLjYzOWQ0NzQuMTEyZDExMC41OTFkNDg3LjkzNmQxMDkuNTY3ZDUwMS43NmQxMDguNTQzZDUxNS4wNzJkMTA4LjU0M2Q1MjcuMzZkMTA4LjU0M2Q1NDEuMTg0ZDEwOS41NjdkNTU1LjAwOGQxMTAuNTkxZDU2OS4zNDRkMTEyLjYzOWQ1NzIuNDE2ZDEzOS4yNjRkNTcyLjQxNmQxNjMuODRkNTcyLjQxNmQxOTAuNDYzZDU2OS4zNDRkMjE2LjA2M2Q1NTUuMDA4ZDIxOC4xMTFkNTQxLjY5NmQyMTkuMTM1ZDUyOC4zODRkMjIwLjE1OWQ1MTUuMDcyZDIyMC4xNTlkNTAyLjc4NGQyMjAuMTU5ZDQ4OC40NDhkMjE5LjEzNWQ0NzQuMTEyZDIxOC4xMTFkNDYxLjgyNGQyMTYuMDYzaFIzZDI4NC42NzJSNGQzMTAuMjcyUjVkLTIzLjU1MlI2ZDkxNS40NTZSN2QtNC4wOTZSOGQ5MzkuMDA4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjA3UjEyZC0yMy41NTJSMTNkMjg0LjY3MlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6OTRvUjFkOTU4LjQ2NFIyYWQyMjguMzUyZDI4Ny43NDRkMjQwLjY0ZDI4NS42OTZkMjU0LjQ2NGQyODQuNjcyZDI2OC4yODhkMjgzLjY0OGQyNzkuNTUyZDI4My42NDhkMjkyLjg2NGQyODMuNjQ4ZDMwNi42ODhkMjg0LjY3MmQzMjAuNTEyZDI4NS42OTZkMzM0Ljg0OGQyODcuNzQ0ZDQ5OC42ODhkNjQ3LjE2OGQ0ODQuMzUyZDY0OS4yMTZkNDcyLjU3NmQ2NDkuNzI4ZDQ2MC44ZDY1MC4yNGQ0NDkuNTM2ZDY1MC4yNGQ0MzguMjcyZDY1MC4yNGQ0MjYuNDk2ZDY1MC4yNGQ0MTQuNzJkNjUwLjI0ZDQwMy40NTZkNjQ4LjE5MmQyNzguNTI4ZDM3My43NmQxNTguNzJkNjQ4LjE5MmQxNDcuNDU2ZDY1MC4yNGQxMzUuMTY4ZDY1MC4yNGQxMjIuODhkNjUwLjI0ZDExMS42MTZkNjUwLjI0ZDEwMS4zNzZkNjUwLjI0ZDg5LjA4OGQ2NDkuNzI4ZDc2LjhkNjQ5LjIxNmQ2Mi40NjRkNjQ3LjE2OGQyMjguMzUyZDI4Ny43NDRoUjNkNTYzLjJSNGQ0OTguNjg4UjVkNjIuNDY0UjZkNzQwLjM1MlI3ZDM3My43NlI4ZDY3Ny44ODhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk5NFIxMmQ2Mi40NjRSMTNkNTYzLjJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjIwNm9SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDEwMi40ZDI4NS42OTZkMTE1LjcxMmQyODQuNjcyZDEyOS4wMjRkMjgzLjY0OGQxNDIuMzM2ZDI4My42NDhkMTU1LjY0OGQyODMuNjQ4ZDE2OC45NmQyODQuNjcyZDE4Mi4yNzJkMjg1LjY5NmQxOTQuNTZkMjg3Ljc0NGQxOTQuNTZkMTAyNGQxODIuMjcyZDEwMjYuMDQ4ZDE2OS40NzJkMTAyNy4wNzFkMTU2LjY3MmQxMDI4LjA5NmQxNDIuMzM2ZDEwMjguMDk2ZDEyOS4wMjRkMTAyOC4wOTZkMTE1LjJkMTAyNy4wNzFkMTAxLjM3NmQxMDI2LjA0OGQ5MC4xMTJkMTAyNGQ5MC4xMTJkMjg3Ljc0NGQ1ODMuNjhkMjI2LjMwM2Q1NzQuNDY0ZDIyOC4zNTFkNTYzLjJkMjI5LjM3NWQ1NTEuOTM2ZDIzMC4zOTlkNTQxLjY5NmQyMzAuMzk5ZDUxOS4xNjhkMjMwLjM5OWQ1MDcuOTA0ZDIzMC4zOTlkNDk0LjA4ZDIyOS4zNzVkNDgwLjI1NmQyMjguMzUxZDQ3Mi4wNjRkMjI2LjMwM2Q0MDUuNTA0ZDE2My44NGQzMzguOTQ0ZDIyNi4zMDNkMzI5LjcyOGQyMjguMzUxZDMxNS4zOTJkMjI5LjM3NWQzMDEuMDU2ZDIzMC4zOTlkMjkwLjgxNmQyMzAuMzk5ZDI2Ny4yNjRkMjMwLjM5OWQyNTcuMDI0ZDIzMC4zOTlkMjQ2LjI3MmQyMjkuMzc1ZDIzNS41MmQyMjguMzUxZDIyNS4yOGQyMjYuMzAzZDM0Ni4xMTJkMTE1LjcxMWQzNTcuMzc2ZDExMy42NjNkMzcyLjczNmQxMTIuNjM5ZDM4OC4wOTZkMTExLjYxNWQ0MDUuNTA0ZDExMS42MTVkNDIyLjkxMmQxMTEuNjE1ZDQzNy43NmQxMTIuNjM5ZDQ1Mi42MDhkMTEzLjY2M2Q0NjUuOTJkMTE1LjcxMWQ1ODMuNjhkMjI2LjMwM2hSM2QyODQuNjcyUjRkMzIxLjUzNlI1ZC0zNi44NjRSNmQ5MTIuMzg0UjdkLTQuMDk2UjhkOTQ5LjI0OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIwNlIxMmQtMzYuODY0UjEzZDI4NC42NzJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmkxaTNpM2kyaTNpM2kyaTJpM2kzaTJpM2kzaTJpM2kzaTNpM2kyaGc6OTNvUjFkOTU4LjQ2NFIyYWQ1NS4yOTZkMTE5Ni4wMzJkNTEuMmQxMTc2LjU3NmQ1MS4yZDExNTQuMDQ4ZDUxLjJkMTEzMC40OTZkNTUuMjk2ZDExMTMuMDg4ZDE3NS4xMDRkMTExMy4wODhkMTc1LjEwNGQzMjkuNzI3ZDU1LjI5NmQzMjkuNzI3ZDUzLjI0OGQzMjEuNTM1ZDUyLjIyNGQzMTMuMzQzZDUxLjJkMzA1LjE1MWQ1MS4yZDI5Ni45NmQ1MS4yZDI2OS4zMTJkNTUuMjk2ZDI0NS43NmQyNzUuNDU2ZDI0NS43NmQyNzUuNDU2ZDExOTYuMDMyZDU1LjI5NmQxMTk2LjAzMmhSM2QzMjYuNjU2UjRkMjc1LjQ1NlI1ZDUxLjJSNmQ3NzguMjRSN2QtMTcyLjAzMlI4ZDcyNy4wNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTkzUjEyZDUxLjJSMTNkMzI2LjY1NlIxNGFpMWkzaTNpMmkyaTJpM2kzaTNpMmkyaTJoZzoyMDVvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkMjg3Ljc0NGQxMDIuNGQyODUuNjk2ZDExNS43MTJkMjg0LjY3MmQxMjkuMDI0ZDI4My42NDhkMTQyLjMzNmQyODMuNjQ4ZDE1NS42NDhkMjgzLjY0OGQxNjguOTZkMjg0LjY3MmQxODIuMjcyZDI4NS42OTZkMTk0LjU2ZDI4Ny43NDRkMTk0LjU2ZDEwMjRkMTgyLjI3MmQxMDI2LjA0OGQxNjkuNDcyZDEwMjcuMDcxZDE1Ni42NzJkMTAyOC4wOTZkMTQyLjMzNmQxMDI4LjA5NmQxMjkuMDI0ZDEwMjguMDk2ZDExNS4yZDEwMjcuMDcxZDEwMS4zNzZkMTAyNi4wNDhkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRkNDM2LjIyNGQyMjYuMzAzZDQyMi45MTJkMjI4LjM1MWQ0MDguNTc2ZDIyOS4zNzVkMzk0LjI0ZDIzMC4zOTlkMzc5LjkwNGQyMzAuMzk5ZDM2NS41NjhkMjMwLjM5OWQzNTMuMjhkMjI5LjM3NWQzNDAuOTkyZDIyOC4zNTFkMzI2LjY1NmQyMjYuMzAzZDQzNS4yZDExNS43MTFkNDUxLjU4NGQxMTMuNjYzZDQ3MC4wMTZkMTEyLjEyN2Q0ODguNDQ4ZDExMC41OTFkNTA2Ljg4ZDExMC41OTFkNTI2LjMzNmQxMTAuNTkxZDU0My43NDRkMTEyLjEyN2Q1NjEuMTUyZDExMy42NjNkNTc1LjQ4OGQxMTUuNzExZDQzNi4yMjRkMjI2LjMwM2hSM2QyODQuNjcyUjRkMzEzLjM0NFI1ZDY0LjUxMlI2ZDkxMy40MDhSN2QtNC4wOTZSOGQ4NDguODk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjA1UjEyZDY0LjUxMlIxM2QyODQuNjcyUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaGc6OTJvUjFkOTU4LjQ2NFIyYWQzODEuOTUyZDEwMjRkMzY5LjY2NGQxMDI2LjA0OGQzNTcuMzc2ZDEwMjcuMDcxZDM0NS4wODhkMTAyOC4wOTZkMzMzLjgyNGQxMDI4LjA5NmQzMjAuNTEyZDEwMjguMDk2ZDMwNy43MTJkMTAyNy4wNzFkMjk0LjkxMmQxMDI2LjA0OGQyODIuNjI0ZDEwMjRkMzIuNzY4ZDI4Ny43NDRkNDQuMDMyZDI4NS42OTZkNTcuMzQ0ZDI4NC42NzJkNzAuNjU2ZDI4My42NDhkODIuOTQ0ZDI4My42NDhkOTUuMjMyZDI4My42NDhkMTA4LjU0NGQyODQuNjcyZDEyMS44NTZkMjg1LjY5NmQxMzMuMTJkMjg3Ljc0NGQzODEuOTUyZDEwMjRoUjNkNDIxLjg4OFI0ZDM4MS45NTJSNWQzMi43NjhSNmQ3NDAuMzUyUjdkLTQuMDk2UjhkNzA3LjU4NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTkyUjEyZDMyLjc2OFIxM2Q0MjEuODg4UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoyMDRvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkMjg3Ljc0NGQxMDIuNGQyODUuNjk2ZDExNS43MTJkMjg0LjY3MmQxMjkuMDI0ZDI4My42NDhkMTQyLjMzNmQyODMuNjQ4ZDE1NS42NDhkMjgzLjY0OGQxNjguOTZkMjg0LjY3MmQxODIuMjcyZDI4NS42OTZkMTk0LjU2ZDI4Ny43NDRkMTk0LjU2ZDEwMjRkMTgyLjI3MmQxMDI2LjA0OGQxNjkuNDcyZDEwMjcuMDcxZDE1Ni42NzJkMTAyOC4wOTZkMTQyLjMzNmQxMDI4LjA5NmQxMjkuMDI0ZDEwMjguMDk2ZDExNS4yZDEwMjcuMDcxZDEwMS4zNzZkMTAyNi4wNDhkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRkLTIxLjUwNGQxMTUuNzExZC03LjE2OGQxMTMuNjYzZDEwLjc1MmQxMTIuMTI3ZDI4LjY3MmQxMTAuNTkxZDQ3LjEwNGQxMTAuNTkxZDY1LjUzNmQxMTAuNTkxZDg0LjQ4ZDExMi4xMjdkMTAzLjQyNGQxMTMuNjYzZDExOS44MDhkMTE1LjcxMWQyMjcuMzI4ZDIyNi4zMDNkMjAzLjc3NmQyMzAuMzk5ZDE3NS4xMDRkMjMwLjM5OWQxNjAuNzY4ZDIzMC4zOTlkMTQ2LjQzMmQyMjkuMzc1ZDEzMi4wOTZkMjI4LjM1MWQxMTguNzg0ZDIyNi4zMDNkLTIxLjUwNGQxMTUuNzExaFIzZDI4NC42NzJSNGQyMjcuMzI4UjVkLTIxLjUwNFI2ZDkxMy40MDhSN2QtNC4wOTZSOGQ5MzQuOTEyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjA0UjEyZC0yMS41MDRSMTNkMjg0LjY3MlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kyaTNpM2kzaTJoZzo5MW9SMWQ5NTguNDY0UjJhZDUxLjJkMjQ1Ljc2ZDI3MS4zNmQyNDUuNzZkMjczLjQwOGQyNTcuMDI0ZDI3NC40MzJkMjY2Ljc1MWQyNzUuNDU2ZDI3Ni40OGQyNzUuNDU2ZDI4Ny43NDRkMjc1LjQ1NmQyOTkuMDA4ZDI3NC40MzJkMzA5LjI0N2QyNzMuNDA4ZDMxOS40ODdkMjcxLjM2ZDMyOC43MDNkMTUxLjU1MmQzMjguNzAzZDE1MS41NTJkMTExMy4wODhkMjcxLjM2ZDExMTMuMDg4ZDI3My40MDhkMTEyMy4zMjhkMjc0LjQzMmQxMTMzLjA1NmQyNzUuNDU2ZDExNDIuNzg0ZDI3NS40NTZkMTE1NC4wNDhkMjc1LjQ1NmQxMTY1LjMxMmQyNzQuNDMyZDExNzUuNTUyZDI3My40MDhkMTE4NS43OTJkMjcxLjM2ZDExOTYuMDMyZDUxLjJkMTE5Ni4wMzJkNTEuMmQyNDUuNzZoUjNkMzI2LjY1NlI0ZDI3NS40NTZSNWQ1MS4yUjZkNzc4LjI0UjdkLTE3Mi4wMzJSOGQ3MjcuMDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk5MVIxMmQ1MS4yUjEzZDMyNi42NTZSMTRhaTFpMmkzaTNpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaGc6MjAzb1IxZDk1OC40NjRSMmFkOTAuMTEyZDI4Ny43NDRkNDk0LjU5MmQyODcuNzQ0ZDQ5Ny42NjRkMzA4LjIyM2Q0OTcuNjY0ZDMzMi43OTlkNDk3LjY2NGQzNDQuMDYzZDQ5Ny4xNTJkMzU2LjM1MmQ0OTYuNjRkMzY4LjY0ZDQ5NC41OTJkMzc4Ljg4ZDE5NC41NmQzNzguODhkMTk0LjU2ZDU4OS44MjRkNDM0LjE3NmQ1ODkuODI0ZDQzNi4yMjRkNjAwLjA2NGQ0MzcuMjQ4ZDYxMS44MzlkNDM4LjI3MmQ2MjMuNjE2ZDQzOC4yNzJkNjM0Ljg4ZDQzOC4yNzJkNjQ2LjE0NGQ0MzcuMjQ4ZDY1OC40MzJkNDM2LjIyNGQ2NzAuNzJkNDM0LjE3NmQ2ODAuOTZkMTk0LjU2ZDY4MC45NmQxOTQuNTZkOTMyLjg2NGQ1MDIuNzg0ZDkzMi44NjRkNTA1Ljg1NmQ5NTMuMzQ0ZDUwNS44NTZkOTc3LjkyZDUwNS44NTZkOTg5LjE4NGQ1MDUuMzQ0ZDEwMDEuNDcyZDUwNC44MzJkMTAxMy43NmQ1MDIuNzg0ZDEwMjRkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRkMTI1Ljk1MmQyMTYuMDYzZDEyMi44OGQxOTAuNDYzZDEyMi44OGQxNjQuODY0ZDEyMi44OGQxMzkuMjY0ZDEyNS45NTJkMTEyLjYzOWQxNDAuMjg4ZDExMC41OTFkMTUzLjZkMTA5LjU2N2QxNjYuOTEyZDEwOC41NDNkMTc5LjJkMTA4LjU0M2QxOTIuNTEyZDEwOC41NDNkMjA2Ljg0OGQxMDkuNTY3ZDIyMS4xODRkMTEwLjU5MWQyMzMuNDcyZDExMi42MzlkMjM3LjU2OGQxMzYuMTkyZDIzNy41NjhkMTYzLjg0ZDIzNy41NjhkMTkyLjUxMWQyMzMuNDcyZDIxNi4wNjNkMjIxLjE4NGQyMTguMTExZDIwNy4zNmQyMTkuMTM1ZDE5My41MzZkMjIwLjE1OWQxODAuMjI0ZDIyMC4xNTlkMTY3LjkzNmQyMjAuMTU5ZDE1NC4xMTJkMjE5LjEzNWQxNDAuMjg4ZDIxOC4xMTFkMTI1Ljk1MmQyMTYuMDYzZDM0Ni4xMTJkMjE2LjA2M2QzNDQuMDY0ZDIwMi43NTFkMzQyLjUyOGQxOTAuNDYzZDM0MC45OTJkMTc4LjE3NWQzNDAuOTkyZDE2NC44NjRkMzQwLjk5MmQxNDEuMzEyZDM0Ni4xMTJkMTEyLjYzOWQzNTguNGQxMTAuNTkxZDM3Mi4yMjRkMTA5LjU2N2QzODYuMDQ4ZDEwOC41NDNkMzk5LjM2ZDEwOC41NDNkNDExLjY0OGQxMDguNTQzZDQyNS40NzJkMTA5LjU2N2Q0MzkuMjk2ZDExMC41OTFkNDUzLjYzMmQxMTIuNjM5ZDQ1Ni43MDRkMTM5LjI2NGQ0NTYuNzA0ZDE2My44NGQ0NTYuNzA0ZDE5MC40NjNkNDUzLjYzMmQyMTYuMDYzZDQzOS4yOTZkMjE4LjExMWQ0MjUuOTg0ZDIxOS4xMzVkNDEyLjY3MmQyMjAuMTU5ZDM5OS4zNmQyMjAuMTU5ZDM4Ny4wNzJkMjIwLjE1OWQzNzIuNzM2ZDIxOS4xMzVkMzU4LjRkMjE4LjExMWQzNDYuMTEyZDIxNi4wNjNoUjNkNTQ4Ljg2NFI0ZDUwNS44NTZSNWQ5MC4xMTJSNmQ5MTUuNDU2UjdkMFI4ZDgyNS4zNDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMDNSMTJkOTAuMTEyUjEzZDU0OC44NjRSMTRhaTFpMmkzaTNpM2kyaTJpMmkzaTNpM2kzaTJpMmkyaTNpM2kzaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjkwb1IxZDk1OC40NjRSMmFkMjQuNTc2ZDEwMTQuNzg0ZDM5NS4yNjRkMzc4Ljg4ZDcwLjY1NmQzNzguODhkNjguNjA4ZDM2OS42NjRkNjcuNTg0ZDM1Ny4zNzZkNjYuNTZkMzQ1LjA4N2Q2Ni41NmQzMzMuODIzZDY2LjU2ZDMyMi41NTlkNjcuNTg0ZDMxMC4yNzFkNjguNjA4ZDI5Ny45ODRkNzAuNjU2ZDI4Ny43NDRkNTQ4Ljg2NGQyODcuNzQ0ZDU1Ni4wMzJkMjk2Ljk2ZDE4NC4zMmQ5MzIuODY0ZDUyOS40MDhkOTMyLjg2NGQ1MzEuNDU2ZDk0Mi4wOGQ1MzIuNDhkOTU0Ljg4ZDUzMy41MDRkOTY3LjY4ZDUzMy41MDRkOTc4Ljk0NGQ1MzMuNTA0ZDk5MC4yMDhkNTMyLjQ4ZDEwMDIuNDk2ZDUzMS40NTZkMTAxNC43ODRkNTI5LjQwOGQxMDI0ZDMwLjcyZDEwMjRkMjQuNTc2ZDEwMTQuNzg0aFIzZDU3OS41ODRSNGQ1NTYuMDMyUjVkMjQuNTc2UjZkNzM2LjI1NlI3ZDBSOGQ3MTEuNjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk5MFIxMmQyNC41NzZSMTNkNTc5LjU4NFIxNGFpMWkyaTJpM2kzaTNpM2kyaTJpMmkyaTNpM2kzaTNpMmkyaGc6MjAyb1IxZDk1OC40NjRSMmFkOTAuMTEyZDI4Ny43NDRkNDk0LjU5MmQyODcuNzQ0ZDQ5Ny42NjRkMzA4LjIyM2Q0OTcuNjY0ZDMzMi43OTlkNDk3LjY2NGQzNDQuMDYzZDQ5Ny4xNTJkMzU2LjM1MmQ0OTYuNjRkMzY4LjY0ZDQ5NC41OTJkMzc4Ljg4ZDE5NC41NmQzNzguODhkMTk0LjU2ZDU4OS44MjRkNDM0LjE3NmQ1ODkuODI0ZDQzNi4yMjRkNjAwLjA2NGQ0MzcuMjQ4ZDYxMS44MzlkNDM4LjI3MmQ2MjMuNjE2ZDQzOC4yNzJkNjM0Ljg4ZDQzOC4yNzJkNjQ2LjE0NGQ0MzcuMjQ4ZDY1OC40MzJkNDM2LjIyNGQ2NzAuNzJkNDM0LjE3NmQ2ODAuOTZkMTk0LjU2ZDY4MC45NmQxOTQuNTZkOTMyLjg2NGQ1MDIuNzg0ZDkzMi44NjRkNTA1Ljg1NmQ5NTMuMzQ0ZDUwNS44NTZkOTc3LjkyZDUwNS44NTZkOTg5LjE4NGQ1MDUuMzQ0ZDEwMDEuNDcyZDUwNC44MzJkMTAxMy43NmQ1MDIuNzg0ZDEwMjRkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRkNDcwLjAxNmQyMjYuMzAzZDQ2MC44ZDIyOC4zNTFkNDQ5LjUzNmQyMjkuMzc1ZDQzOC4yNzJkMjMwLjM5OWQ0MjguMDMyZDIzMC4zOTlkNDA1LjUwNGQyMzAuMzk5ZDM5NC4yNGQyMzAuMzk5ZDM4MC40MTZkMjI5LjM3NWQzNjYuNTkyZDIyOC4zNTFkMzU4LjRkMjI2LjMwM2QyOTEuODRkMTYzLjg0ZDIyNS4yOGQyMjYuMzAzZDIxNi4wNjRkMjI4LjM1MWQyMDEuNzI4ZDIyOS4zNzVkMTg3LjM5MmQyMzAuMzk5ZDE3Ny4xNTJkMjMwLjM5OWQxNTMuNmQyMzAuMzk5ZDE0My4zNmQyMzAuMzk5ZDEzMi42MDhkMjI5LjM3NWQxMjEuODU2ZDIyOC4zNTFkMTExLjYxNmQyMjYuMzAzZDIzMi40NDhkMTE1LjcxMWQyNDMuNzEyZDExMy42NjNkMjU5LjA3MmQxMTIuNjM5ZDI3NC40MzJkMTExLjYxNWQyOTEuODRkMTExLjYxNWQzMDkuMjQ4ZDExMS42MTVkMzI0LjA5NmQxMTIuNjM5ZDMzOC45NDRkMTEzLjY2M2QzNTIuMjU2ZDExNS43MTFkNDcwLjAxNmQyMjYuMzAzaFIzZDU0OC44NjRSNGQ1MDUuODU2UjVkOTAuMTEyUjZkOTEyLjM4NFI3ZDBSOGQ4MjIuMjcyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjAyUjEyZDkwLjExMlIxM2Q1NDguODY0UjE0YWkxaTJpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTJpMmkzaTNpM2kyaTJpMWkzaTNpMmkzaTNpMmkyaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmhnOjg5b1IxZDk1OC40NjRSMmFkMjUxLjkwNGQ3NTQuNjg4ZDE4LjQzMmQyODcuNzQ0ZDMxLjc0NGQyODUuNjk2ZDQ3LjEwNGQyODQuNjcyZDYyLjQ2NGQyODMuNjQ4ZDc3LjgyNGQyODMuNjQ4ZDkxLjEzNmQyODMuNjQ4ZDEwNy4wMDhkMjg0LjY3MmQxMjIuODhkMjg1LjY5NmQxMzUuMTY4ZDI4Ny43NDRkMzA3LjJkNjUzLjMxMmQ0NzcuMTg0ZDI4Ny43NDRkNDkwLjQ5NmQyODUuNjk2ZDUwMy44MDhkMjg0LjY3MmQ1MTcuMTJkMjgzLjY0OGQ1MzEuNDU2ZDI4My42NDhkNTQ1Ljc5MmQyODMuNjQ4ZDU2MC4xMjhkMjg0LjY3MmQ1NzQuNDY0ZDI4NS42OTZkNTg3Ljc3NmQyODcuNzQ0ZDM1Ny4zNzZkNzU0LjY4OGQzNTcuMzc2ZDEwMjRkMzQ0LjA2NGQxMDI2LjA0OGQzMzAuNzUyZDEwMjcuMDcxZDMxNy40NGQxMDI4LjA5NmQzMDQuMTI4ZDEwMjguMDk2ZDI5MC44MTZkMTAyOC4wOTZkMjc2Ljk5MmQxMDI3LjA3MWQyNjMuMTY4ZDEwMjYuMDQ4ZDI1MS45MDRkMTAyNGQyNTEuOTA0ZDc1NC42ODhoUjNkNjA2LjIwOFI0ZDU4Ny43NzZSNWQxOC40MzJSNmQ3NDAuMzUyUjdkLTQuMDk2UjhkNzIxLjkyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpODlSMTJkMTguNDMyUjEzZDYwNi4yMDhSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJoZzoyMDFvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkMjg3Ljc0NGQ0OTQuNTkyZDI4Ny43NDRkNDk3LjY2NGQzMDguMjIzZDQ5Ny42NjRkMzMyLjc5OWQ0OTcuNjY0ZDM0NC4wNjNkNDk3LjE1MmQzNTYuMzUyZDQ5Ni42NGQzNjguNjRkNDk0LjU5MmQzNzguODhkMTk0LjU2ZDM3OC44OGQxOTQuNTZkNTg5LjgyNGQ0MzQuMTc2ZDU4OS44MjRkNDM2LjIyNGQ2MDAuMDY0ZDQzNy4yNDhkNjExLjgzOWQ0MzguMjcyZDYyMy42MTZkNDM4LjI3MmQ2MzQuODhkNDM4LjI3MmQ2NDYuMTQ0ZDQzNy4yNDhkNjU4LjQzMmQ0MzYuMjI0ZDY3MC43MmQ0MzQuMTc2ZDY4MC45NmQxOTQuNTZkNjgwLjk2ZDE5NC41NmQ5MzIuODY0ZDUwMi43ODRkOTMyLjg2NGQ1MDUuODU2ZDk1My4zNDRkNTA1Ljg1NmQ5NzcuOTJkNTA1Ljg1NmQ5ODkuMTg0ZDUwNS4zNDRkMTAwMS40NzJkNTA0LjgzMmQxMDEzLjc2ZDUwMi43ODRkMTAyNGQ5MC4xMTJkMTAyNGQ5MC4xMTJkMjg3Ljc0NGQzMDcuMmQyMjYuMzAzZDI5My44ODhkMjI4LjM1MWQyNzkuNTUyZDIyOS4zNzVkMjY1LjIxNmQyMzAuMzk5ZDI1MC44OGQyMzAuMzk5ZDIzNi41NDRkMjMwLjM5OWQyMjQuMjU2ZDIyOS4zNzVkMjExLjk2OGQyMjguMzUxZDE5Ny42MzJkMjI2LjMwM2QzMDYuMTc2ZDExNS43MTFkMzIyLjU2ZDExMy42NjNkMzQwLjk5MmQxMTIuMTI3ZDM1OS40MjRkMTEwLjU5MWQzNzcuODU2ZDExMC41OTFkMzk3LjMxMmQxMTAuNTkxZDQxNC43MmQxMTIuMTI3ZDQzMi4xMjhkMTEzLjY2M2Q0NDYuNDY0ZDExNS43MTFkMzA3LjJkMjI2LjMwM2hSM2Q1NDguODY0UjRkNTA1Ljg1NlI1ZDkwLjExMlI2ZDkxMy40MDhSN2QwUjhkODIzLjI5NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIwMVIxMmQ5MC4xMTJSMTNkNTQ4Ljg2NFIxNGFpMWkyaTNpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaTJpM2kzaTNpMmkyaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjg4b1IxZDk1OC40NjRSMmFkMzA3LjJkNjM4Ljk3NmQxMzIuMDk2ZDEwMjRkMTAyLjRkMTAyNy4wNzFkNzcuODI0ZDEwMjcuMDcxZDUyLjIyNGQxMDI3LjA3MWQyMS41MDRkMTAyNGQyMDMuNzc2ZDYzOC45NzZkNTAuMTc2ZDI4OC43NjhkNjUuNTM2ZDI4Ni43MmQ3OC44NDhkMjg2LjIwN2Q5Mi4xNmQyODUuNjk2ZDEwNi40OTZkMjg1LjY5NmQxMzQuMTQ0ZDI4NS42OTZkMTYwLjc2OGQyODguNzY4ZDMwNy4yZDYzOC45NzZkMzE1LjM5MmQ2MzguOTc2ZDQ2MS44MjRkMjg4Ljc2OGQ0NzMuMDg4ZDI4Ny43NDRkNDgzLjMyOGQyODYuNzJkNDkzLjU2OGQyODUuNjk2ZDUwNC44MzJkMjg1LjY5NmQ1MzIuNDhkMjg1LjY5NmQ1NDMuNzQ0ZDI4NS42OTZkNTUxLjkzNmQyODYuMjA3ZDU2MC4xMjhkMjg2LjcyZDU3MS4zOTJkMjg4Ljc2OGQ0MTcuNzkyZDYzNS45MDRkNjAxLjA4OGQxMDI0ZDU3MC4zNjhkMTAyNy4wNzFkNTQ0Ljc2OGQxMDI3LjA3MWQ1MjIuMjRkMTAyNy4wNzFkNDkwLjQ5NmQxMDI0ZDMxNS4zOTJkNjM4Ljk3NmhSM2Q2MjMuNjE2UjRkNjAxLjA4OFI1ZDIxLjUwNFI2ZDczOC4zMDRSN2QtMy4wNzJSOGQ3MTYuOFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTg4UjEyZDIxLjUwNFIxM2Q2MjMuNjE2UjE0YWkxaTJpM2kzaTJpMmkzaTNpM2kyaTFpMmkzaTNpMmkzaTNpMmkyaTNpM2kyaGc6MjAwb1IxZDk1OC40NjRSMmFkOTAuMTEyZDI4Ny43NDRkNDk0LjU5MmQyODcuNzQ0ZDQ5Ny42NjRkMzA4LjIyM2Q0OTcuNjY0ZDMzMi43OTlkNDk3LjY2NGQzNDQuMDYzZDQ5Ny4xNTJkMzU2LjM1MmQ0OTYuNjRkMzY4LjY0ZDQ5NC41OTJkMzc4Ljg4ZDE5NC41NmQzNzguODhkMTk0LjU2ZDU4OS44MjRkNDM0LjE3NmQ1ODkuODI0ZDQzNi4yMjRkNjAwLjA2NGQ0MzcuMjQ4ZDYxMS44MzlkNDM4LjI3MmQ2MjMuNjE2ZDQzOC4yNzJkNjM0Ljg4ZDQzOC4yNzJkNjQ2LjE0NGQ0MzcuMjQ4ZDY1OC40MzJkNDM2LjIyNGQ2NzAuNzJkNDM0LjE3NmQ2ODAuOTZkMTk0LjU2ZDY4MC45NmQxOTQuNTZkOTMyLjg2NGQ1MDIuNzg0ZDkzMi44NjRkNTA1Ljg1NmQ5NTMuMzQ0ZDUwNS44NTZkOTc3LjkyZDUwNS44NTZkOTg5LjE4NGQ1MDUuMzQ0ZDEwMDEuNDcyZDUwNC44MzJkMTAxMy43NmQ1MDIuNzg0ZDEwMjRkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRkMTMxLjA3MmQxMTUuNzExZDE0NS40MDhkMTEzLjY2M2QxNjMuMzI4ZDExMi4xMjdkMTgxLjI0OGQxMTAuNTkxZDE5OS42OGQxMTAuNTkxZDIxOC4xMTJkMTEwLjU5MWQyMzcuMDU2ZDExMi4xMjdkMjU2ZDExMy42NjNkMjcyLjM4NGQxMTUuNzExZDM3OS45MDRkMjI2LjMwM2QzNTYuMzUyZDIzMC4zOTlkMzI3LjY4ZDIzMC4zOTlkMzEzLjM0NGQyMzAuMzk5ZDI5OS4wMDhkMjI5LjM3NWQyODQuNjcyZDIyOC4zNTFkMjcxLjM2ZDIyNi4zMDNkMTMxLjA3MmQxMTUuNzExaFIzZDU0OC44NjRSNGQ1MDUuODU2UjVkOTAuMTEyUjZkOTEzLjQwOFI3ZDBSOGQ4MjMuMjk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjAwUjEyZDkwLjExMlIxM2Q1NDguODY0UjE0YWkxaTJpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTJpMmkzaTNpM2kyaTJpMWkzaTNpM2kzaTJpM2kzaTNpMmhnOjg3b1IxZDk1OC40NjRSMmFkMjcuNjQ4ZDI4Ny43NDRkMzguOTEyZDI4NS42OTZkNTUuODA4ZDI4NC42NzJkNzIuNzA0ZDI4My42NDhkODcuMDRkMjgzLjY0OGQxMDEuMzc2ZDI4My42NDhkMTE2LjIyNGQyODQuNjcyZDEzMS4wNzJkMjg1LjY5NmQxNDMuMzZkMjg3Ljc0NGQyNjkuMzEyZDkwMS4xMmQ0MjAuODY0ZDI4Ny43NDRkNDMzLjE1MmQyODUuNjk2ZDQ0OGQyODQuNjcyZDQ2Mi44NDhkMjgzLjY0OGQ0NzYuMTZkMjgzLjY0OGQ0ODguNDQ4ZDI4My42NDhkNTAzLjgwOGQyODQuNjcyZDUxOS4xNjhkMjg1LjY5NmQ1MzAuNDMyZDI4Ny43NDRkNjgzLjAwOGQ5MDcuMjY0ZDgxMS4wMDhkMjg3Ljc0NGQ4MjIuMjcyZDI4NS42OTZkODM1LjA3MmQyODQuNjcyZDg0Ny44NzJkMjgzLjY0OGQ4NjAuMTZkMjgzLjY0OGQ4NzQuNDk2ZDI4My42NDhkODg5LjM0NGQyODQuNjcyZDkwNC4xOTJkMjg1LjY5NmQ5MTUuNDU2ZDI4Ny43NDRkNzM4LjMwNGQxMDI0ZDcyNi4wMTZkMTAyNi4wNDhkNzA5LjYzMmQxMDI3LjA3MWQ2OTMuMjQ4ZDEwMjguMDk2ZDY3OS45MzZkMTAyOC4wOTZkNjY1LjZkMTAyOC4wOTZkNjQ4LjE5MmQxMDI3LjA3MWQ2MzAuNzg0ZDEwMjYuMDQ4ZDYxNi40NDhkMTAyNGQ0NzEuMDRkNDQ3LjQ4N2QzMjMuNTg0ZDEwMjRkMzA5LjI0OGQxMDI2LjA0OGQyOTIuMzUyZDEwMjcuMDcxZDI3NS40NTZkMTAyOC4wOTZkMjYxLjEyZDEwMjguMDk2ZDI0OC44MzJkMTAyOC4wOTZkMjMyLjk2ZDEwMjcuMDcxZDIxNy4wODhkMTAyNi4wNDhkMjA0LjhkMTAyNGQyNy42NDhkMjg3Ljc0NGhSM2Q5NDMuMTA0UjRkOTE1LjQ1NlI1ZDI3LjY0OFI2ZDc0MC4zNTJSN2QtNC4wOTZSOGQ3MTIuNzA0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpODdSMTJkMjcuNjQ4UjEzZDk0My4xMDRSMTRhaTFpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjE5OW9SMWQ5NTguNDY0UjJhZDU2MC4xMjhkOTE2LjQ4ZDU3MC4zNjhkOTM3Ljk4NGQ1NzcuNTM2ZDk1OC45NzZkNTg0LjcwNGQ5NzkuOTY4ZDU4OC44ZDEwMDIuNDk2ZDUwNy45MDRkMTAzNS4yNjNkNDEzLjY5NmQxMDM1LjI2M2QzOTYuMjg4ZDEwMzUuMjYzZDM3OC44OGQxMDc5LjI5NmQzODRkMTA3OC4yNzJkMzg4LjYwOGQxMDc3Ljc2ZDM5My4yMTZkMTA3Ny4yNDhkMzk4LjMzNmQxMDc3LjI0OGQ0NTQuNjU2ZDEwNzcuMjQ4ZDQ4MC43NjhkMTEwMy44NzJkNTA2Ljg4ZDExMzAuNDk2ZDUwNi44OGQxMTY4LjM4NGQ1MDYuODhkMTIxOC41NmQ0NjYuOTQ0ZDEyNDQuNjcyZDQyNy4wMDhkMTI3MC43ODRkMzU3LjM3NmQxMjcwLjc4NGQzNDIuMDE2ZDEyNzAuNzg0ZDMxOS40ODhkMTI2OC43MzZkMjk2Ljk2ZDEyNjYuNjg4ZDI3NS40NTZkMTI1OC40OTZkMjc2LjQ4ZDEyNDMuMTM2ZDI3OS4wNGQxMjI2Ljc1MmQyODEuNmQxMjEwLjM2OGQyOTAuODE2ZDExOTcuMDU2ZDMyNi42NTZkMTIwOC4zMmQzNTUuMzI4ZDEyMDguMzJkNDI3LjAwOGQxMjA4LjMyZDQyNy4wMDhkMTE2OC4zODRkNDI3LjAwOGQxMTQ4LjkyOGQ0MDkuNmQxMTQxLjI0OGQzOTIuMTkyZDExMzMuNTY4ZDM2MS40NzJkMTEzMy41NjhkMzQ3LjEzNmQxMTMzLjU2OGQzMzIuOGQxMTM1LjEwNGQzMTguNDY0ZDExMzYuNjRkMzAzLjEwNGQxMTQxLjc2ZDI5NC45MTJkMTEzMi41NDRkMzA1LjE1MmQxMTA2Ljk0NGQzMTQuODhkMTA4MS44NTZkMzI0LjYwOGQxMDU2Ljc2OGQzMzMuODI0ZDEwMzAuMTQ0ZDI2OS4zMTJkMTAxOS45MDRkMjE4LjYyNGQ5ODkuNjk2ZDE2Ny45MzZkOTU5LjQ4OGQxMzIuNjA4ZDkxMi4zODRkOTcuMjhkODY1LjI4ZDc4LjMzNmQ4MDEuNzkyZDU5LjM5MmQ3MzguMzA0ZDU5LjM5MmQ2NjEuNTA0ZDU5LjM5MmQ1NzMuNDRkODIuOTQ0ZDUwMi4yNzFkMTA2LjQ5NmQ0MzEuMTA0ZDE1MS4wNGQzODAuNDE1ZDE5NS41ODRkMzI5LjcyN2QyNTkuMDcyZDMwMi41OTJkMzIyLjU2ZDI3NS40NTZkNDAxLjQwOGQyNzUuNDU2ZDQ1OS43NzZkMjc1LjQ1NmQ1MDEuNzZkMjgzLjY0OGQ1NDMuNzQ0ZDI5MS44NGQ1NzUuNDg4ZDMwNC4xMjdkNTczLjQ0ZDMyNy42NzlkNTY3LjI5NmQzNDcuMTM1ZDU2MS4xNTJkMzY2LjU5MmQ1NTAuOTEyZDM4OS4xMmQ1MzUuNTUyZDM4NGQ1MjEuMjE2ZDM3OS45MDRkNTA2Ljg4ZDM3NS44MDhkNDkwLjQ5NmQzNzIuNzM2ZDQ3NC4xMTJkMzY5LjY2NGQ0NTQuMTQ0ZDM2OC4xMjhkNDM0LjE3NmQzNjYuNTkyZDQwOC41NzZkMzY2LjU5MmQyOTcuOTg0ZDM2Ni41OTJkMjM1LjAwOGQ0NDIuODhkMTcyLjAzMmQ1MTkuMTY4ZDE3Mi4wMzJkNjYxLjUwNGQxNzIuMDMyZDczMy4xODRkMTg5LjQ0ZDc4Ni40MzJkMjA2Ljg0OGQ4MzkuNjhkMjM5LjEwNGQ4NzUuMDA4ZDI3MS4zNmQ5MTAuMzM2ZDMxNi40MTZkOTI3Ljc0NGQzNjEuNDcyZDk0NS4xNTJkNDE1Ljc0NGQ5NDUuMTUyZDQ1OS43NzZkOTQ1LjE1MmQ0OTQuNTkyZDkzNy45ODRkNTI5LjQwOGQ5MzAuODE2ZDU2MC4xMjhkOTE2LjQ4aFIzZDYzMi44MzJSNGQ1ODguOFI1ZDU5LjM5MlI2ZDc0OC41NDRSN2QtMjQ2Ljc4NFI4ZDY4OS4xNTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxOTlSMTJkNTkuMzkyUjEzZDYzMi44MzJSMTRhaTFpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo4Nm9SMWQ5NTguNDY0UjJhZDIyLjUyOGQyODcuNzQ0ZDMzLjc5MmQyODUuNjk2ZDQ5LjY2NGQyODQuNjcyZDY1LjUzNmQyODMuNjQ4ZDc5Ljg3MmQyODMuNjQ4ZDkzLjE4NGQyODMuNjQ4ZDEwOS4wNTZkMjg0LjY3MmQxMjQuOTI4ZDI4NS42OTZkMTM4LjI0ZDI4Ny43NDRkMzI0LjYwOGQ5MTcuNTA0ZDUwOS45NTJkMjg3Ljc0NGQ1MzcuNmQyODQuNjcyZDU2Ni4yNzJkMjg0LjY3MmQ1NzkuNTg0ZDI4NC42NzJkNTk0LjQzMmQyODUuMTgzZDYwOS4yOGQyODUuNjk2ZDYyMS41NjhkMjg3Ljc0NGQzODEuOTUyZDEwMjRkMzY4LjY0ZDEwMjYuMDQ4ZDM1Mi4yNTZkMTAyNy4wNzFkMzM1Ljg3MmQxMDI4LjA5NmQzMjEuNTM2ZDEwMjguMDk2ZDMwNy4yZDEwMjguMDk2ZDI5MS4zMjhkMTAyNy4wNzFkMjc1LjQ1NmQxMDI2LjA0OGQyNjEuMTJkMTAyNGQyMi41MjhkMjg3Ljc0NGhSM2Q2NDQuMDk2UjRkNjIxLjU2OFI1ZDIyLjUyOFI2ZDc0MC4zNTJSN2QtNC4wOTZSOGQ3MTcuODI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpODZSMTJkMjIuNTI4UjEzZDY0NC4wOTZSMTRhaTFpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTNpM2kzaTJoZzoxOThvUjFkOTU4LjQ2NFIyYWQxMTEuNjE2ZDEwMjRkOTcuMjhkMTAyNi4wNDhkODIuNDMyZDEwMjcuMDcxZDY3LjU4NGQxMDI4LjA5NmQ1My4yNDhkMTAyOC4wOTZkMzYuODY0ZDEwMjguMDk2ZDIyLjAxNmQxMDI3LjA3MWQ3LjE2OGQxMDI2LjA0OGQtNS4xMmQxMDI0ZDQyNy4wMDhkMjg3Ljc0NGQ4ODguODMyZDI4Ny43NDRkODkwLjg4ZDI5OS4wMDhkODkxLjkwNGQzMTAuMjcxZDg5Mi45MjhkMzIxLjUzNWQ4OTIuOTI4ZDMzMi43OTlkODkyLjkyOGQzNDQuMDYzZDg5MS45MDRkMzU2Ljg2NGQ4OTAuODhkMzY5LjY2NGQ4ODguODMyZDM3OS45MDRkNTg4LjhkMzc5LjkwNGQ1ODguOGQ2MDIuMTEyZDgyOS40NGQ2MDIuMTEyZDgzMi41MTJkNjIyLjU5MmQ4MzIuNTEyZDY0Ny4xNjhkODMyLjUxMmQ2NTguNDMyZDgzMmQ2NzAuNzJkODMxLjQ4OGQ2ODMuMDA4ZDgyOS40NGQ2OTMuMjQ4ZDU4OC44ZDY5My4yNDhkNTg4LjhkOTMyLjg2NGQ4OTcuMDI0ZDkzMi44NjRkODk5LjA3MmQ5NDMuMTA0ZDkwMC4wOTZkOTU0Ljg4ZDkwMS4xMmQ5NjYuNjU2ZDkwMS4xMmQ5NzcuOTJkOTAxLjEyZDk4OS4xODRkOTAwLjA5NmQxMDAxLjQ3MmQ4OTkuMDcyZDEwMTMuNzZkODk3LjAyNGQxMDI0ZDQ4NC4zNTJkMTAyNGQ0ODQuMzUyZDg1MS45NjhkMjA4Ljg5NmQ4NTEuOTY4ZDExMS42MTZkMTAyNGQ0ODQuMzUyZDM3MS43MTJkNDc5LjIzMmQzNzEuNzEyZDI1OC4wNDhkNzYxLjg1NmQ0ODQuMzUyZDc2MS44NTZkNDg0LjM1MmQzNzEuNzEyaFIzZDk0NC4xMjhSNGQ5MDEuMTJSNWQtNS4xMlI2ZDczNi4yNTZSN2QtNC4wOTZSOGQ3NDEuMzc2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTk4UjEyZC01LjEyUjEzZDk0NC4xMjhSMTRhaTFpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTJpMmkzaTNpM2kyaTJpMmkzaTNpM2kzaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODVvUjFkOTU4LjQ2NFIyYWQ4Mi45NDRkMjg3Ljc0NGQxMDcuNTJkMjg0LjY3MmQxMzYuMTkyZDI4NC42NzJkMTYzLjg0ZDI4NC42NzJkMTg3LjM5MmQyODcuNzQ0ZDE4Ny4zOTJkNzA1LjUzNmQxODcuMzkyZDc2OS4wMjRkMTk1LjU4NGQ4MTQuMDc5ZDIwMy43NzZkODU5LjEzNmQyMjIuMjA4ZDg4Ny4yOTZkMjQwLjY0ZDkxNS40NTZkMjcwLjg0OGQ5MjguNzY4ZDMwMS4wNTZkOTQyLjA4ZDM0NS4wODhkOTQyLjA4ZDM4OS4xMmQ5NDIuMDhkNDE4LjgxNmQ5MjguNzY4ZDQ0OC41MTJkOTE1LjQ1NmQ0NjYuOTQ0ZDg4Ny4yOTZkNDg1LjM3NmQ4NTkuMTM2ZDQ5My41NjhkODE0LjA3OWQ1MDEuNzZkNzY5LjAyNGQ1MDEuNzZkNzA1LjUzNmQ1MDEuNzZkMjg3Ljc0NGQ1MjcuMzZkMjg0LjY3MmQ1NTMuOTg0ZDI4NC42NzJkNTgyLjY1NmQyODQuNjcyZDYwNy4yMzJkMjg3Ljc0NGQ2MDcuMjMyZDcyMy45NjhkNjA3LjIzMmQ3OTcuNjk2ZDU5My40MDhkODU2LjA2NGQ1NzkuNTg0ZDkxNC40MzJkNTQ4LjM1MmQ5NTQuMzY3ZDUxNy4xMmQ5OTQuMzA0ZDQ2Ni45NDRkMTAxNS4yOTZkNDE2Ljc2OGQxMDM2LjI4OGQzNDUuMDg4ZDEwMzYuMjg4ZDI3My40MDhkMTAzNi4yODhkMjIzLjIzMmQxMDE1LjI5NmQxNzMuMDU2ZDk5NC4zMDRkMTQxLjgyNGQ5NTQuMzY3ZDExMC41OTJkOTE0LjQzMmQ5Ni43NjhkODU2LjA2NGQ4Mi45NDRkNzk3LjY5NmQ4Mi45NDRkNzIzLjk2OGQ4Mi45NDRkMjg3Ljc0NGhSM2Q2OTAuMTc2UjRkNjA3LjIzMlI1ZDgyLjk0NFI2ZDczOS4zMjhSN2QtMTIuMjg4UjhkNjU2LjM4NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTg1UjEyZDgyLjk0NFIxM2Q2OTAuMTc2UjE0YWkxaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaGc6MTk3b1IxZDk1OC40NjRSMmFkMTkzLjUzNmQxODUuMzQzZDE5My41MzZkMTMzLjEyZDIyNy4zMjhkOTkuMzI3ZDI2MS4xMmQ2NS41MzVkMzE1LjM5MmQ2NS41MzVkMzY4LjY0ZDY1LjUzNWQ0MDIuOTQ0ZDk5LjMyN2Q0MzcuMjQ4ZDEzMy4xMmQ0MzcuMjQ4ZDE4NS4zNDNkNDM3LjI0OGQyMjEuMTgzZDQyMC4zNTJkMjQ4LjMxOWQ0MDMuNDU2ZDI3NS40NTZkMzc0Ljc4NGQyODkuNzkyZDYxNC40ZDEwMjRkNjAyLjExMmQxMDI2LjA0OGQ1ODYuNzUyZDEwMjcuMDcxZDU3MS4zOTJkMTAyOC4wOTZkNTU3LjA1NmQxMDI4LjA5NmQ1NDMuNzQ0ZDEwMjguMDk2ZDUyOS45MmQxMDI3LjA3MWQ1MTYuMDk2ZDEwMjYuMDQ4ZDUwMy44MDhkMTAyNGQ0NTEuNTg0ZDg1NC4wMTZkMTc0LjA4ZDg1NC4wMTZkMTIyLjg4ZDEwMjRkMTA5LjU2OGQxMDI2LjA0OGQ5Ni4yNTZkMTAyNy4wNzFkODIuOTQ0ZDEwMjguMDk2ZDY5LjYzMmQxMDI4LjA5NmQ1NS4yOTZkMTAyOC4wOTZkNDEuNDcyZDEwMjcuMDcxZDI3LjY0OGQxMDI2LjA0OGQxNi4zODRkMTAyNGQyNTZkMjg5Ljc5MmQyMjcuMzI4ZDI3NS40NTZkMjEwLjQzMmQyNDguMzE5ZDE5My41MzZkMjIxLjE4M2QxOTMuNTM2ZDE4NS4zNDNkNDI0Ljk2ZDc2Mi44OGQzMTIuMzJkMzkxLjE2OGQyMDAuNzA0ZDc2Mi44OGQ0MjQuOTZkNzYyLjg4ZDMxNS4zOTJkMjUxLjkwNGQzNDIuMDE2ZDI1MS45MDRkMzU2LjM1MmQyMzMuNDcxZDM3MC42ODhkMjE1LjAzOWQzNzAuNjg4ZDE4NS4zNDNkMzcwLjY4OGQxNTUuNjQ4ZDM1Ni4zNTJkMTM3LjIxNmQzNDIuMDE2ZDExOC43ODNkMzE1LjM5MmQxMTguNzgzZDI4OC43NjhkMTE4Ljc4M2QyNzMuOTJkMTM3LjIxNmQyNTkuMDcyZDE1NS42NDhkMjU5LjA3MmQxODUuMzQzZDI1OS4wNzJkMjE1LjAzOWQyNzMuOTJkMjMzLjQ3MWQyODguNzY4ZDI1MS45MDRkMzE1LjM5MmQyNTEuOTA0aFIzZDYzMS44MDhSNGQ2MTQuNFI1ZDE2LjM4NFI2ZDk1OC40NjRSN2QtNC4wOTZSOGQ5NDIuMDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxOTdSMTJkMTYuMzg0UjEzZDYzMS44MDhSMTRhaTFpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJpMmkyaTNpM2kzaTNpMmkzaTNpMWkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2hnOjg0b1IxZDk1OC40NjRSMmFkMjE3LjA4OGQzNzguODhkMjUuNmQzNzguODhkMjMuNTUyZDM2OC42NGQyMi41MjhkMzU2LjM1MmQyMS41MDRkMzQ0LjA2M2QyMS41MDRkMzMyLjc5OWQyMS41MDRkMzIxLjUzNWQyMi41MjhkMzA5Ljc2ZDIzLjU1MmQyOTcuOTg0ZDI1LjZkMjg3Ljc0NGQ1MTMuMDI0ZDI4Ny43NDRkNTE1LjA3MmQyOTcuOTg0ZDUxNi4wOTZkMzA5LjI0N2Q1MTcuMTJkMzIwLjUxMWQ1MTcuMTJkMzMxLjc3NWQ1MTcuMTJkMzQzLjAzOWQ1MTYuMDk2ZDM1NS44NGQ1MTUuMDcyZDM2OC42NGQ1MTMuMDI0ZDM3OC44OGQzMjEuNTM2ZDM3OC44OGQzMjEuNTM2ZDEwMjRkMjk3Ljk4NGQxMDI3LjA3MWQyNzAuMzM2ZDEwMjcuMDcxZDI0MS42NjRkMTAyNy4wNzFkMjE3LjA4OGQxMDI0ZDIxNy4wODhkMzc4Ljg4aFIzZDUzOC42MjRSNGQ1MTcuMTJSNWQyMS41MDRSNmQ3MzYuMjU2UjdkLTMuMDcyUjhkNzE0Ljc1MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTg0UjEyZDIxLjUwNFIxM2Q1MzguNjI0UjE0YWkxaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkyaTNpM2kyaGc6MTk2b1IxZDk1OC40NjRSMmFkNDUyLjYwOGQ4NTQuMDE2ZDE3My4wNTZkODU0LjAxNmQxMjIuODhkMTAyNGQxMDkuNTY4ZDEwMjYuMDQ4ZDk2LjI1NmQxMDI3LjA3MWQ4Mi45NDRkMTAyOC4wOTZkNjkuNjMyZDEwMjguMDk2ZDU1LjI5NmQxMDI4LjA5NmQ0MS40NzJkMTAyNy4wNzFkMjcuNjQ4ZDEwMjYuMDQ4ZDE2LjM4NGQxMDI0ZDI1NmQyODcuNzQ0ZDI2OS4zMTJkMjg1LjY5NmQyODQuNjcyZDI4NC42NzJkMzAwLjAzMmQyODMuNjQ4ZDMxNi40MTZkMjgzLjY0OGQzMzAuNzUyZDI4My42NDhkMzQ2LjExMmQyODQuNjcyZDM2MS40NzJkMjg1LjY5NmQzNzUuODA4ZDI4Ny43NDRkNjE0LjRkMTAyNGQ2MDIuMTEyZDEwMjYuMDQ4ZDU4Ni43NTJkMTAyNy4wNzFkNTcxLjM5MmQxMDI4LjA5NmQ1NTcuMDU2ZDEwMjguMDk2ZDU0My43NDRkMTAyOC4wOTZkNTI5LjkyZDEwMjcuMDcxZDUxNi4wOTZkMTAyNi4wNDhkNTAzLjgwOGQxMDI0ZDQ1Mi42MDhkODU0LjAxNmQyMDAuNzA0ZDc2Mi44OGQ0MjQuOTZkNzYyLjg4ZDMxMi4zMmQzODcuMDcyZDIwMC43MDRkNzYyLjg4ZDE1MC41MjhkMjE2LjA2M2QxNDcuNDU2ZDE5MC40NjNkMTQ3LjQ1NmQxNjQuODY0ZDE0Ny40NTZkMTM5LjI2NGQxNTAuNTI4ZDExMi42MzlkMTY0Ljg2NGQxMTAuNTkxZDE3OC4xNzZkMTA5LjU2N2QxOTEuNDg4ZDEwOC41NDNkMjAzLjc3NmQxMDguNTQzZDIxNy4wODhkMTA4LjU0M2QyMzEuNDI0ZDEwOS41NjdkMjQ1Ljc2ZDExMC41OTFkMjU4LjA0OGQxMTIuNjM5ZDI2Mi4xNDRkMTM2LjE5MmQyNjIuMTQ0ZDE2My44NGQyNjIuMTQ0ZDE5Mi41MTFkMjU4LjA0OGQyMTYuMDYzZDI0NS43NmQyMTguMTExZDIzMS45MzZkMjE5LjEzNWQyMTguMTEyZDIyMC4xNTlkMjA0LjhkMjIwLjE1OWQxOTIuNTEyZDIyMC4xNTlkMTc4LjY4OGQyMTkuMTM1ZDE2NC44NjRkMjE4LjExMWQxNTAuNTI4ZDIxNi4wNjNkMzcwLjY4OGQyMTYuMDYzZDM2OC42NGQyMDIuNzUxZDM2Ny4xMDRkMTkwLjQ2M2QzNjUuNTY4ZDE3OC4xNzVkMzY1LjU2OGQxNjQuODY0ZDM2NS41NjhkMTQxLjMxMmQzNzAuNjg4ZDExMi42MzlkMzgyLjk3NmQxMTAuNTkxZDM5Ni44ZDEwOS41NjdkNDEwLjYyNGQxMDguNTQzZDQyMy45MzZkMTA4LjU0M2Q0MzYuMjI0ZDEwOC41NDNkNDUwLjA0OGQxMDkuNTY3ZDQ2My44NzJkMTEwLjU5MWQ0NzguMjA4ZDExMi42MzlkNDgxLjI4ZDEzOS4yNjRkNDgxLjI4ZDE2My44NGQ0ODEuMjhkMTkwLjQ2M2Q0NzguMjA4ZDIxNi4wNjNkNDYzLjg3MmQyMTguMTExZDQ1MC41NmQyMTkuMTM1ZDQzNy4yNDhkMjIwLjE1OWQ0MjMuOTM2ZDIyMC4xNTlkNDExLjY0OGQyMjAuMTU5ZDM5Ny4zMTJkMjE5LjEzNWQzODIuOTc2ZDIxOC4xMTFkMzcwLjY4OGQyMTYuMDYzaFIzZDYzMS44MDhSNGQ2MTQuNFI1ZDE2LjM4NFI2ZDkxNS40NTZSN2QtNC4wOTZSOGQ4OTkuMDcyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTk2UjEyZDE2LjM4NFIxM2Q2MzEuODA4UjE0YWkxaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkxaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6ODNvUjFkOTU4LjQ2NFIyYWQ3MS42OGQ5MTIuMzg0ZDEwNS40NzJkOTI0LjY3MmQxNDIuMzM2ZDkzMy44ODhkMTc5LjJkOTQzLjEwNGQyMzIuNDQ4ZDk0My4xMDRkMzE2LjQxNmQ5NDMuMTA0ZDM1Ny44ODhkOTA4LjhkMzk5LjM2ZDg3NC40OTZkMzk5LjM2ZDgxNi4xMjdkMzk5LjM2ZDc4Ny40NTZkMzkwLjY1NmQ3NjYuOTc2ZDM4MS45NTJkNzQ2LjQ5NmQzNjQuNTQ0ZDczMS42NDdkMzQ3LjEzNmQ3MTYuOGQzMjEuMDI0ZDcwNC41MTJkMjk0LjkxMmQ2OTIuMjIzZDI2MC4wOTZkNjc3Ljg4N2QyMDEuNzI4ZDY1NC4zMzZkMTcyLjAzMmQ2NDIuMDQ4ZDE0Ny40NTZkNjI3LjJkMTIyLjg4ZDYxMi4zNTJkMTA0Ljk2ZDU5MC44NDhkODcuMDRkNTY5LjM0NGQ3Ni44ZDU0MS4xODRkNjYuNTZkNTEzLjAyNGQ2Ni41NmQ0NzQuMTExZDY2LjU2ZDM4MC45MjhkMTMwLjA0OGQzMjguMTkyZDE5My41MzZkMjc1LjQ1NmQzMDguMjI0ZDI3NS40NTZkMzU3LjM3NmQyNzUuNDU2ZDQwMS40MDhkMjgzLjY0OGQ0NDUuNDRkMjkxLjg0ZDQ3OS4yMzJkMzA0LjEyN2Q0NzQuMTEyZDM0Ny4xMzVkNDU2LjcwNGQzODkuMTJkNDI5LjA1NmQzNzguODhkMzkyLjcwNGQzNzAuNjg4ZDM1Ni4zNTJkMzYyLjQ5NmQzMTAuMjcyZDM2Mi40OTZkMjQ1Ljc2ZDM2Mi40OTZkMjEwLjk0NGQzODguNjA3ZDE3Ni4xMjhkNDE0LjcyZDE3Ni4xMjhkNDY2Ljk0M2QxNzYuMTI4ZDQ4OC40NDhkMTg0LjgzMmQ1MDUuMzQzZDE5My41MzZkNTIyLjI0ZDIwNy44NzJkNTM1LjA0ZDIyMi4yMDhkNTQ3LjgzOWQyNDEuNjY0ZDU1OC4wNzlkMjYxLjEyZDU2OC4zMTlkMjgyLjYyNGQ1NzYuNTEyZDMzOS45NjhkNTk5LjA0ZDM4MC45MjhkNjE1LjQyNGQ0MTIuNjcyZDYzMy4zNDRkNDQ0LjQxNmQ2NTEuMjY0ZDQ2Ni45NDRkNjc1LjMyOGQ0ODkuNDcyZDY5OS4zOTJkNTAxLjI0OGQ3MzIuMTZkNTEzLjAyNGQ3NjQuOTI4ZDUxMy4wMjRkODA4Ljk2ZDUxMy4wMjRkOTE0LjQzMmQ0NDAuMzJkOTc1LjM2ZDM2Ny42MTZkMTAzNi4yODhkMjM2LjU0NGQxMDM2LjI4OGQyMDQuOGQxMDM2LjI4OGQxNzkuMmQxMDM0LjI0ZDE1My42ZDEwMzIuMTkyZDEzMS41ODRkMTAyOC4wOTZkMTA5LjU2OGQxMDI0ZDg5LjA4OGQxMDE3Ljg1NmQ2OC42MDhkMTAxMS43MTJkNDcuMTA0ZDEwMDQuNTQ0ZDQ5LjE1MmQ5ODIuMDE2ZDU2LjMyZDk1OC40NjRkNjMuNDg4ZDkzNC45MTJkNzEuNjhkOTEyLjM4NGhSM2Q1NTguMDhSNGQ1MTMuMDI0UjVkNDcuMTA0UjZkNzQ4LjU0NFI3ZC0xMi4yODhSOGQ3MDEuNDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk4M1IxMmQ0Ny4xMDRSMTNkNTU4LjA4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTk1b1IxZDk1OC40NjRSMmFkNDUyLjYwOGQ4NTQuMDE2ZDE3My4wNTZkODU0LjAxNmQxMjIuODhkMTAyNGQxMDkuNTY4ZDEwMjYuMDQ4ZDk2LjI1NmQxMDI3LjA3MWQ4Mi45NDRkMTAyOC4wOTZkNjkuNjMyZDEwMjguMDk2ZDU1LjI5NmQxMDI4LjA5NmQ0MS40NzJkMTAyNy4wNzFkMjcuNjQ4ZDEwMjYuMDQ4ZDE2LjM4NGQxMDI0ZDI1NmQyODcuNzQ0ZDI2OS4zMTJkMjg1LjY5NmQyODQuNjcyZDI4NC42NzJkMzAwLjAzMmQyODMuNjQ4ZDMxNi40MTZkMjgzLjY0OGQzMzAuNzUyZDI4My42NDhkMzQ2LjExMmQyODQuNjcyZDM2MS40NzJkMjg1LjY5NmQzNzUuODA4ZDI4Ny43NDRkNjE0LjRkMTAyNGQ2MDIuMTEyZDEwMjYuMDQ4ZDU4Ni43NTJkMTAyNy4wNzFkNTcxLjM5MmQxMDI4LjA5NmQ1NTcuMDU2ZDEwMjguMDk2ZDU0My43NDRkMTAyOC4wOTZkNTI5LjkyZDEwMjcuMDcxZDUxNi4wOTZkMTAyNi4wNDhkNTAzLjgwOGQxMDI0ZDQ1Mi42MDhkODU0LjAxNmQyMDAuNzA0ZDc2Mi44OGQ0MjQuOTZkNzYyLjg4ZDMxMi4zMmQzODcuMDcyZDIwMC43MDRkNzYyLjg4ZDEzMS4wNzJkMTQ0LjM4NGQxNDcuNDU2ZDEyNS45NTJkMTc0LjA4ZDEwOS4wNTVkMjAwLjcwNGQ5Mi4xNTlkMjM0LjQ5NmQ5Mi4xNTlkMjU2ZDkyLjE1OWQyNzcuNTA0ZDEwMC4zNTFkMjk5LjAwOGQxMDguNTQzZDMxOS40ODhkMTE3Ljc1OWQzMzkuOTY4ZDEyNi45NzZkMzU5LjkzNmQxMzUuMTY4ZDM3OS45MDRkMTQzLjM2ZDQwMC4zODRkMTQzLjM2ZDQxOS44NGQxNDMuMzZkNDM0LjY4OGQxMzUuNjc5ZDQ0OS41MzZkMTI4ZDQ3MC4wMTZkMTA4LjU0M2Q0OTMuNTY4ZDEzNy4yMTZkNTAzLjgwOGQxNjguOTZkNDg2LjRkMTg2LjM2N2Q0NjAuMjg4ZDIwMi4yNGQ0MzQuMTc2ZDIxOC4xMTFkNDAxLjQwOGQyMTguMTExZDM3OC44OGQyMTguMTExZDM1Ny4zNzZkMjEwLjQzMmQzMzUuODcyZDIwMi43NTFkMzE1LjM5MmQxOTMuMDI0ZDI5NC45MTJkMTgzLjI5NWQyNzQuOTQ0ZDE3NS42MTZkMjU0Ljk3NmQxNjcuOTM2ZDIzNS41MmQxNjcuOTM2ZDIxNC4wMTZkMTY3LjkzNmQxOTkuMTY4ZDE3Ni42NGQxODQuMzJkMTg1LjM0M2QxNjQuODY0ZDIwMi43NTFkMTUzLjZkMTg4LjQxNWQxNDQuMzg0ZDE3NC41OTFkMTM1LjE2OGQxNjAuNzY4ZDEzMS4wNzJkMTQ0LjM4NGhSM2Q2MzEuODA4UjRkNjE0LjRSNWQxNi4zODRSNmQ5MzEuODRSN2QtNC4wOTZSOGQ5MTUuNDU2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTk1UjEyZDE2LjM4NFIxM2Q2MzEuODA4UjE0YWkxaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkxaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjgyb1IxZDk1OC40NjRSMmFkOTIuMTZkMjg2LjcyZDExNC42ODhkMjg0LjY3MmQxMzMuMTJkMjgyLjYyNGQxNTEuNTUyZDI4MC41NzZkMTY5LjQ3MmQyNzkuMDM5ZDE4Ny4zOTJkMjc3LjUwNGQyMDYuODQ4ZDI3Ni40OGQyMjYuMzA0ZDI3NS40NTZkMjQ5Ljg1NmQyNzUuNDU2ZDMwMi4wOGQyNzUuNDU2ZDM1My4yOGQyODUuNjk2ZDQwNC40OGQyOTUuOTM2ZDQ0NC40MTZkMzIxLjUzNWQ0ODQuMzUyZDM0Ny4xMzVkNTA5LjQ0ZDM5MC42NTVkNTM0LjUyOGQ0MzQuMTc1ZDUzNC41MjhkNTAwLjczNmQ1MzQuNTI4ZDU0MC42NzJkNTIxLjIxNmQ1NzMuNDRkNTA3LjkwNGQ2MDYuMjA4ZDQ4Ny40MjRkNjMxLjgwOGQ0NjYuOTQ0ZDY1Ny40MDhkNDQwLjgzMmQ2NzYuMzUyZDQxNC43MmQ2OTUuMjk2ZDM5MC4xNDRkNzA3LjU4NGQzNzcuODU2ZDcxMy43MjhkNTkxLjg3MmQxMDI0ZDU2NC4yMjRkMTAyNy4wNzFkNTI5LjQwOGQxMDI3LjA3MWQ1MDEuNzZkMTAyNy4wNzFkNDc0LjExMmQxMDI0ZDIzOC41OTJkNjgzLjAwOGQyMzguNTkyZDY3OC45MTJkMjQ2Ljc4NGQ2NzYuODY0ZDI3NC40MzJkNjY5LjY5NWQzMDUuMTUyZDY1Ny40MDhkMzM1Ljg3MmQ2NDUuMTJkMzYxLjk4NGQ2MjUuMTUyZDM4OC4wOTZkNjA1LjE4NGQ0MDUuNTA0ZDU3Ny4wMjRkNDIyLjkxMmQ1NDguODY0ZDQyMi45MTJkNTA4LjkyOGQ0MjIuOTEyZDQzNS4xOTlkMzc5LjM5MmQzOTkuMzZkMzM1Ljg3MmQzNjMuNTJkMjYyLjE0NGQzNjMuNTJkMjQ0LjczNmQzNjMuNTJkMjI5Ljg4OGQzNjQuNTQ0ZDIxNS4wNGQzNjUuNTY4ZDE5Ni42MDhkMzY3LjYxNmQxOTYuNjA4ZDEwMjRkMTg1LjM0NGQxMDI1LjAyM2QxNzEuNTJkMTAyNi4wNDhkMTU3LjY5NmQxMDI3LjA3MWQxNDUuNDA4ZDEwMjcuMDcxZDEzMy4xMmQxMDI3LjA3MWQxMTguNzg0ZDEwMjYuNTZkMTA0LjQ0OGQxMDI2LjA0OGQ5Mi4xNmQxMDI0ZDkyLjE2ZDI4Ni43MmhSM2Q2MTEuMzI4UjRkNTkxLjg3MlI1ZDkyLjE2UjZkNzQ4LjU0NFI3ZC0zLjA3MlI4ZDY1Ni4zODRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk4MlIxMmQ5Mi4xNlIxM2Q2MTEuMzI4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaGc6MTk0b1IxZDk1OC40NjRSMmFkNDUyLjYwOGQ4NTQuMDE2ZDE3My4wNTZkODU0LjAxNmQxMjIuODhkMTAyNGQxMDkuNTY4ZDEwMjYuMDQ4ZDk2LjI1NmQxMDI3LjA3MWQ4Mi45NDRkMTAyOC4wOTZkNjkuNjMyZDEwMjguMDk2ZDU1LjI5NmQxMDI4LjA5NmQ0MS40NzJkMTAyNy4wNzFkMjcuNjQ4ZDEwMjYuMDQ4ZDE2LjM4NGQxMDI0ZDI1NmQyODcuNzQ0ZDI2OS4zMTJkMjg1LjY5NmQyODQuNjcyZDI4NC42NzJkMzAwLjAzMmQyODMuNjQ4ZDMxNi40MTZkMjgzLjY0OGQzMzAuNzUyZDI4My42NDhkMzQ2LjExMmQyODQuNjcyZDM2MS40NzJkMjg1LjY5NmQzNzUuODA4ZDI4Ny43NDRkNjE0LjRkMTAyNGQ2MDIuMTEyZDEwMjYuMDQ4ZDU4Ni43NTJkMTAyNy4wNzFkNTcxLjM5MmQxMDI4LjA5NmQ1NTcuMDU2ZDEwMjguMDk2ZDU0My43NDRkMTAyOC4wOTZkNTI5LjkyZDEwMjcuMDcxZDUxNi4wOTZkMTAyNi4wNDhkNTAzLjgwOGQxMDI0ZDQ1Mi42MDhkODU0LjAxNmQyMDAuNzA0ZDc2Mi44OGQ0MjQuOTZkNzYyLjg4ZDMxMi4zMmQzODcuMDcyZDIwMC43MDRkNzYyLjg4ZDQ5Mi41NDRkMjI2LjMwM2Q0ODMuMzI4ZDIyOC4zNTFkNDcyLjA2NGQyMjkuMzc1ZDQ2MC44ZDIzMC4zOTlkNDUwLjU2ZDIzMC4zOTlkNDI4LjAzMmQyMzAuMzk5ZDQxNi43NjhkMjMwLjM5OWQ0MDIuOTQ0ZDIyOS4zNzVkMzg5LjEyZDIyOC4zNTFkMzgwLjkyOGQyMjYuMzAzZDMxNC4zNjhkMTYzLjg0ZDI0Ny44MDhkMjI2LjMwM2QyMzguNTkyZDIyOC4zNTFkMjI0LjI1NmQyMjkuMzc1ZDIwOS45MmQyMzAuMzk5ZDE5OS42OGQyMzAuMzk5ZDE3Ni4xMjhkMjMwLjM5OWQxNjUuODg4ZDIzMC4zOTlkMTU1LjEzNmQyMjkuMzc1ZDE0NC4zODRkMjI4LjM1MWQxMzQuMTQ0ZDIyNi4zMDNkMjU0Ljk3NmQxMTUuNzExZDI2Ni4yNGQxMTMuNjYzZDI4MS42ZDExMi42MzlkMjk2Ljk2ZDExMS42MTVkMzE0LjM2OGQxMTEuNjE1ZDMzMS43NzZkMTExLjYxNWQzNDYuNjI0ZDExMi42MzlkMzYxLjQ3MmQxMTMuNjYzZDM3NC43ODRkMTE1LjcxMWQ0OTIuNTQ0ZDIyNi4zMDNoUjNkNjMxLjgwOFI0ZDYxNC40UjVkMTYuMzg0UjZkOTEyLjM4NFI3ZC00LjA5NlI4ZDg5NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE5NFIxMmQxNi4zODRSMTNkNjMxLjgwOFIxNGFpMWkyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkyaTJpMmkxaTNpM2kyaTNpM2kyaTJpM2kzaTJpM2kzaTJpM2kzaTNpM2kyaGc6ODFvUjFkOTU4LjQ2NFIyYWQ2OTEuMmQxMDkwLjU2ZDY5MC4xNzZkMTExNC4xMTJkNjg2LjU5MmQxMTM3LjE1MmQ2ODMuMDA4ZDExNjAuMTkyZDY3My43OTJkMTE4MS42OTZkNDM4LjI3MmQxMTM3LjY2NGQ0NDAuMzJkMTEwOC45OTJkNDQ0LjQxNmQxMDkwLjU2ZDQ0OC41MTJkMTA3Mi4xMjhkNDU2LjcwNGQxMDQ5LjZkNjkxLjJkMTA5MC41NmQzNzAuNjg4ZDEwMzYuMjg4ZDI5MC44MTZkMTAzNi4yODhkMjMyLjQ0OGQxMDA4LjEyOGQxNzQuMDhkOTc5Ljk2OGQxMzUuNjhkOTI5LjI4ZDk3LjI4ZDg3OC41OTJkNzguMzM2ZDgwOC45NmQ1OS4zOTJkNzM5LjMyOGQ1OS4zOTJkNjU2LjM4NGQ1OS4zOTJkNTczLjQ0ZDc4LjMzNmQ1MDMuODA4ZDk3LjI4ZDQzNC4xNzVkMTM1LjY4ZDM4My40ODdkMTc0LjA4ZDMzMi43OTlkMjMyLjQ0OGQzMDQuMTI3ZDI5MC44MTZkMjc1LjQ1NmQzNzAuNjg4ZDI3NS40NTZkNDUwLjU2ZDI3NS40NTZkNTA4LjkyOGQzMDQuMTI3ZDU2Ny4yOTZkMzMyLjc5OWQ2MDUuNjk2ZDM4My40ODdkNjQ0LjA5NmQ0MzQuMTc1ZDY2Mi41MjhkNTAzLjgwOGQ2ODAuOTZkNTczLjQ0ZDY4MC45NmQ2NTYuMzg0ZDY4MC45NmQ3MzkuMzI4ZDY2Mi41MjhkODA4Ljk2ZDY0NC4wOTZkODc4LjU5MmQ2MDUuNjk2ZDkyOS4yOGQ1NjcuMjk2ZDk3OS45NjhkNTA4LjkyOGQxMDA4LjEyOGQ0NTAuNTZkMTAzNi4yODhkMzcwLjY4OGQxMDM2LjI4OGQzNzAuNjg4ZDk0Ni4xNzZkNDIxLjg4OGQ5NDYuMTc2ZDQ1OS4yNjRkOTI2LjIwOGQ0OTYuNjRkOTA2LjI0ZDUyMS4yMTZkODY4LjM1MmQ1NDUuNzkyZDgzMC40NjRkNTU4LjA4ZDc3Ny4yMTZkNTcwLjM2OGQ3MjMuOTY4ZDU3MC4zNjhkNjU2LjM4NGQ1NzAuMzY4ZDU4OS44MjRkNTU4LjA4ZDUzNi4wNjRkNTQ1Ljc5MmQ0ODIuMzA0ZDUyMS4yMTZkNDQ0LjkyOGQ0OTYuNjRkNDA3LjU1MmQ0NTkuMjY0ZDM4Ny41ODNkNDIxLjg4OGQzNjcuNjE2ZDM3MC42ODhkMzY3LjYxNmQzMTkuNDg4ZDM2Ny42MTZkMjgyLjExMmQzODcuNTgzZDI0NC43MzZkNDA3LjU1MmQyMjAuMTZkNDQ0LjkyOGQxOTUuNTg0ZDQ4Mi4zMDRkMTgzLjI5NmQ1MzYuMDY0ZDE3MS4wMDhkNTg5LjgyNGQxNzEuMDA4ZDY1Ni4zODRkMTcxLjAwOGQ3MjMuOTY4ZDE4My4yOTZkNzc3LjIxNmQxOTUuNTg0ZDgzMC40NjRkMjIwLjE2ZDg2OC4zNTJkMjQ0LjczNmQ5MDYuMjRkMjgyLjExMmQ5MjYuMjA4ZDMxOS40ODhkOTQ2LjE3NmQzNzAuNjg4ZDk0Ni4xNzZoUjNkNzQxLjM3NlI0ZDY5MS4yUjVkNTkuMzkyUjZkNzQ4LjU0NFI3ZC0xNTcuNjk2UjhkNjg5LjE1MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTgxUjEyZDU5LjM5MlIxM2Q3NDEuMzc2UjE0YWkxaTNpM2kyaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxOTNvUjFkOTU4LjQ2NFIyYWQ0NTIuNjA4ZDg1NC4wMTZkMTczLjA1NmQ4NTQuMDE2ZDEyMi44OGQxMDI0ZDEwOS41NjhkMTAyNi4wNDhkOTYuMjU2ZDEwMjcuMDcxZDgyLjk0NGQxMDI4LjA5NmQ2OS42MzJkMTAyOC4wOTZkNTUuMjk2ZDEwMjguMDk2ZDQxLjQ3MmQxMDI3LjA3MWQyNy42NDhkMTAyNi4wNDhkMTYuMzg0ZDEwMjRkMjU2ZDI4Ny43NDRkMjY5LjMxMmQyODUuNjk2ZDI4NC42NzJkMjg0LjY3MmQzMDAuMDMyZDI4My42NDhkMzE2LjQxNmQyODMuNjQ4ZDMzMC43NTJkMjgzLjY0OGQzNDYuMTEyZDI4NC42NzJkMzYxLjQ3MmQyODUuNjk2ZDM3NS44MDhkMjg3Ljc0NGQ2MTQuNGQxMDI0ZDYwMi4xMTJkMTAyNi4wNDhkNTg2Ljc1MmQxMDI3LjA3MWQ1NzEuMzkyZDEwMjguMDk2ZDU1Ny4wNTZkMTAyOC4wOTZkNTQzLjc0NGQxMDI4LjA5NmQ1MjkuOTJkMTAyNy4wNzFkNTE2LjA5NmQxMDI2LjA0OGQ1MDMuODA4ZDEwMjRkNDUyLjYwOGQ4NTQuMDE2ZDIwMC43MDRkNzYyLjg4ZDQyNC45NmQ3NjIuODhkMzEyLjMyZDM4Ny4wNzJkMjAwLjcwNGQ3NjIuODhkMzM5Ljk2OGQyMjYuMzAzZDMyNi42NTZkMjI4LjM1MWQzMTIuMzJkMjI5LjM3NWQyOTcuOTg0ZDIzMC4zOTlkMjgzLjY0OGQyMzAuMzk5ZDI2OS4zMTJkMjMwLjM5OWQyNTcuMDI0ZDIyOS4zNzVkMjQ0LjczNmQyMjguMzUxZDIzMC40ZDIyNi4zMDNkMzM4Ljk0NGQxMTUuNzExZDM1NS4zMjhkMTEzLjY2M2QzNzMuNzZkMTEyLjEyN2QzOTIuMTkyZDExMC41OTFkNDEwLjYyNGQxMTAuNTkxZDQzMC4wOGQxMTAuNTkxZDQ0Ny40ODhkMTEyLjEyN2Q0NjQuODk2ZDExMy42NjNkNDc5LjIzMmQxMTUuNzExZDMzOS45NjhkMjI2LjMwM2hSM2Q2MzEuODA4UjRkNjE0LjRSNWQxNi4zODRSNmQ5MTMuNDA4UjdkLTQuMDk2UjhkODk3LjAyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE5M1IxMmQxNi4zODRSMTNkNjMxLjgwOFIxNGFpMWkyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkyaTJpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzo4MG9SMWQ5NTguNDY0UjJhZDkwLjExMmQyODYuNzJkMTA1LjQ3MmQyODQuNjcyZDEyNi40NjRkMjgyLjYyNGQxNDcuNDU2ZDI4MC41NzZkMTcwLjQ5NmQyNzkuMDM5ZDE5My41MzZkMjc3LjUwNGQyMTYuNTc2ZDI3Ni40OGQyMzkuNjE2ZDI3NS40NTZkMjYxLjEyZDI3NS40NTZkMzE3LjQ0ZDI3NS40NTZkMzY4LjEyOGQyODYuNzJkNDE4LjgxNmQyOTcuOTg0ZDQ1Ny4yMTZkMzI1LjYzMWQ0OTUuNjE2ZDM1My4yOGQ1MTguMTQ0ZDM5OC44NDdkNTQwLjY3MmQ0NDQuNDE1ZDU0MC42NzJkNTEzLjAyNGQ1NDAuNjcyZDU4NC43MDRkNTE2LjYwOGQ2MzIuMzE5ZDQ5Mi41NDRkNjc5LjkzNWQ0NTMuMTJkNzA4LjYwOGQ0MTMuNjk2ZDczNy4yOGQzNjMuNTJkNzQ5LjA1NmQzMTMuMzQ0ZDc2MC44MzJkMjYxLjEyZDc2MC44MzJkMjQxLjY2NGQ3NjAuODMyZDIyNi44MTZkNzYwLjMxOWQyMTEuOTY4ZDc1OS44MDhkMTk0LjU2ZDc1Ny43NmQxOTQuNTZkMTAyNGQxNjkuOTg0ZDEwMjcuMDcxZDE0Mi4zMzZkMTAyNy4wNzFkMTMwLjA0OGQxMDI3LjA3MWQxMTYuMjI0ZDEwMjYuNTZkMTAyLjRkMTAyNi4wNDhkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ni43MmQxOTQuNTZkNjY2LjYyNGQyMTAuOTQ0ZDY2OC42NzJkMjIzLjIzMmQ2NjkuNjk1ZDIzNS41MmQ2NzAuNzJkMjU5LjA3MmQ2NzAuNzJkMjkwLjgxNmQ2NzAuNzJkMzIyLjA0OGQ2NjQuMDY0ZDM1My4yOGQ2NTcuNDA4ZDM3Ny44NTZkNjQwZDQwMi40MzJkNjIyLjU5MmQ0MTcuMjhkNTkyLjM4NGQ0MzIuMTI4ZDU2Mi4xNzVkNDMyLjEyOGQ1MTQuMDQ4ZDQzMi4xMjhkNDcyLjA2M2Q0MTkuMzI4ZDQ0My4zOTFkNDA2LjUyOGQ0MTQuNzJkMzg0ZDM5Ny4zMTJkMzYxLjQ3MmQzNzkuOTA0ZDMyOS43MjhkMzcyLjczNmQyOTcuOTg0ZDM2NS41NjhkMjYxLjEyZDM2NS41NjhkMjIzLjIzMmQzNjUuNTY4ZDE5NC41NmQzNjguNjRkMTk0LjU2ZDY2Ni42MjRoUjNkNTc5LjU4NFI0ZDU0MC42NzJSNWQ5MC4xMTJSNmQ3NDguNTQ0UjdkLTMuMDcyUjhkNjU4LjQzMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTgwUjEyZDkwLjExMlIxM2Q1NzkuNTg0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjE5Mm9SMWQ5NTguNDY0UjJhZDQ1Mi42MDhkODU0LjAxNmQxNzMuMDU2ZDg1NC4wMTZkMTIyLjg4ZDEwMjRkMTA5LjU2OGQxMDI2LjA0OGQ5Ni4yNTZkMTAyNy4wNzFkODIuOTQ0ZDEwMjguMDk2ZDY5LjYzMmQxMDI4LjA5NmQ1NS4yOTZkMTAyOC4wOTZkNDEuNDcyZDEwMjcuMDcxZDI3LjY0OGQxMDI2LjA0OGQxNi4zODRkMTAyNGQyNTZkMjg3Ljc0NGQyNjkuMzEyZDI4NS42OTZkMjg0LjY3MmQyODQuNjcyZDMwMC4wMzJkMjgzLjY0OGQzMTYuNDE2ZDI4My42NDhkMzMwLjc1MmQyODMuNjQ4ZDM0Ni4xMTJkMjg0LjY3MmQzNjEuNDcyZDI4NS42OTZkMzc1LjgwOGQyODcuNzQ0ZDYxNC40ZDEwMjRkNjAyLjExMmQxMDI2LjA0OGQ1ODYuNzUyZDEwMjcuMDcxZDU3MS4zOTJkMTAyOC4wOTZkNTU3LjA1NmQxMDI4LjA5NmQ1NDMuNzQ0ZDEwMjguMDk2ZDUyOS45MmQxMDI3LjA3MWQ1MTYuMDk2ZDEwMjYuMDQ4ZDUwMy44MDhkMTAyNGQ0NTIuNjA4ZDg1NC4wMTZkMjAwLjcwNGQ3NjIuODhkNDI0Ljk2ZDc2Mi44OGQzMTIuMzJkMzg3LjA3MmQyMDAuNzA0ZDc2Mi44OGQxMzcuMjE2ZDExNS43MTFkMTUxLjU1MmQxMTMuNjYzZDE2OS40NzJkMTEyLjEyN2QxODcuMzkyZDExMC41OTFkMjA1LjgyNGQxMTAuNTkxZDIyNC4yNTZkMTEwLjU5MWQyNDMuMmQxMTIuMTI3ZDI2Mi4xNDRkMTEzLjY2M2QyNzguNTI4ZDExNS43MTFkMzg2LjA0OGQyMjYuMzAzZDM2Mi40OTZkMjMwLjM5OWQzMzMuODI0ZDIzMC4zOTlkMzE5LjQ4OGQyMzAuMzk5ZDMwNS4xNTJkMjI5LjM3NWQyOTAuODE2ZDIyOC4zNTFkMjc3LjUwNGQyMjYuMzAzZDEzNy4yMTZkMTE1LjcxMWhSM2Q2MzEuODA4UjRkNjE0LjRSNWQxNi4zODRSNmQ5MTMuNDA4UjdkLTQuMDk2UjhkODk3LjAyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE5MlIxMmQxNi4zODRSMTNkNjMxLjgwOFIxNGFpMWkyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkyaTJpMmkxaTNpM2kzaTNpMmkzaTNpM2kyaGc6NzlvUjFkOTU4LjQ2NFIyYWQzNzMuNzZkMTAzNi4yODhkMjkzLjg4OGQxMDM2LjI4OGQyMzUuNTJkMTAwOC4xMjhkMTc3LjE1MmQ5NzkuOTY4ZDEzOC43NTJkOTI5LjI4ZDEwMC4zNTJkODc4LjU5MmQ4MS40MDhkODA4Ljk2ZDYyLjQ2NGQ3MzkuMzI4ZDYyLjQ2NGQ2NTYuMzg0ZDYyLjQ2NGQ1NzMuNDRkODEuNDA4ZDUwMy44MDhkMTAwLjM1MmQ0MzQuMTc1ZDEzOC43NTJkMzgzLjQ4N2QxNzcuMTUyZDMzMi43OTlkMjM1LjUyZDMwNC4xMjdkMjkzLjg4OGQyNzUuNDU2ZDM3My43NmQyNzUuNDU2ZDQ1My42MzJkMjc1LjQ1NmQ1MTJkMzA0LjEyN2Q1NzAuMzY4ZDMzMi43OTlkNjA4Ljc2OGQzODMuNDg3ZDY0Ny4xNjhkNDM0LjE3NWQ2NjUuNmQ1MDMuODA4ZDY4NC4wMzJkNTczLjQ0ZDY4NC4wMzJkNjU2LjM4NGQ2ODQuMDMyZDczOS4zMjhkNjY1LjZkODA4Ljk2ZDY0Ny4xNjhkODc4LjU5MmQ2MDguNzY4ZDkyOS4yOGQ1NzAuMzY4ZDk3OS45NjhkNTEyZDEwMDguMTI4ZDQ1My42MzJkMTAzNi4yODhkMzczLjc2ZDEwMzYuMjg4ZDM3My43NmQ5NDYuMTc2ZDQyNC45NmQ5NDYuMTc2ZDQ2Mi4zMzZkOTI2LjIwOGQ0OTkuNzEyZDkwNi4yNGQ1MjQuMjg4ZDg2OC4zNTJkNTQ4Ljg2NGQ4MzAuNDY0ZDU2MS4xNTJkNzc3LjIxNmQ1NzMuNDRkNzIzLjk2OGQ1NzMuNDRkNjU2LjM4NGQ1NzMuNDRkNTg5LjgyNGQ1NjEuMTUyZDUzNi4wNjRkNTQ4Ljg2NGQ0ODIuMzA0ZDUyNC4yODhkNDQ0LjkyOGQ0OTkuNzEyZDQwNy41NTJkNDYyLjMzNmQzODcuNTgzZDQyNC45NmQzNjcuNjE2ZDM3My43NmQzNjcuNjE2ZDMyMi41NmQzNjcuNjE2ZDI4NS4xODRkMzg3LjU4M2QyNDcuODA4ZDQwNy41NTJkMjIzLjIzMmQ0NDQuOTI4ZDE5OC42NTZkNDgyLjMwNGQxODYuMzY4ZDUzNi4wNjRkMTc0LjA4ZDU4OS44MjRkMTc0LjA4ZDY1Ni4zODRkMTc0LjA4ZDcyMy45NjhkMTg2LjM2OGQ3NzcuMjE2ZDE5OC42NTZkODMwLjQ2NGQyMjMuMjMyZDg2OC4zNTJkMjQ3LjgwOGQ5MDYuMjRkMjg1LjE4NGQ5MjYuMjA4ZDMyMi41NmQ5NDYuMTc2ZDM3My43NmQ5NDYuMTc2aFIzZDc0Ni40OTZSNGQ2ODQuMDMyUjVkNjIuNDY0UjZkNzQ4LjU0NFI3ZC0xMi4yODhSOGQ2ODYuMDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk3OVIxMmQ2Mi40NjRSMTNkNzQ2LjQ5NlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE5MW9SMWQ5NTguNDY0UjJhZDMzNS44NzJkODgxLjY2NGQyOTYuOTZkODkxLjkwNGQyNjYuMjRkOTA0LjcwNGQyMzUuNTJkOTE3LjUwNGQyMTQuMDE2ZDkzNS40MjRkMTkyLjUxMmQ5NTMuMzQ0ZDE4MS4yNDhkOTc3LjQwOGQxNjkuOTg0ZDEwMDEuNDcyZDE2OS45ODRkMTAzMy4yMTVkMTY5Ljk4NGQxMDg1LjQ0ZDIwOC44OTZkMTExNS4xMzZkMjQ3LjgwOGQxMTQ0LjgzMmQzMjAuNTEyZDExNDQuODMyZDM2Ni41OTJkMTE0NC44MzJkMzk0Ljc1MmQxMTM4LjE3NmQ0MjIuOTEyZDExMzEuNTJkNDUyLjYwOGQxMTIwLjI1NmQ0NjEuODI0ZDExMzkuNzEyZDQ2OC40OGQxMTYwLjcwNGQ0NzUuMTM2ZDExODEuNjk2ZDQ3OC4yMDhkMTIwNS4yNDhkNDUzLjYzMmQxMjEzLjQ0ZDQzMi42NGQxMjE5LjA3MmQ0MTEuNjQ4ZDEyMjQuNzA0ZDM5MS42OGQxMjI3Ljc3NmQzNzEuNzEyZDEyMzAuODQ4ZDM1MS4yMzJkMTIzMi4zODRkMzMwLjc1MmQxMjMzLjkyZDMwNy4yZDEyMzMuOTJkMTg2LjM2OGQxMjMzLjkyZDEyNC40MTZkMTE3OS4xMzZkNjIuNDY0ZDExMjQuMzUyZDYyLjQ2NGQxMDM0LjI0ZDYyLjQ2NGQ5ODIuMDE2ZDgzLjQ1NmQ5NDQuNjRkMTA0LjQ0OGQ5MDcuMjY0ZDEzMi42MDhkODgyLjE3NWQxNjAuNzY4ZDg1Ny4wODhkMTkwLjQ2NGQ4NDIuMjRkMjIwLjE2ZDgyNy4zOTJkMjM4LjU5MmQ4MjEuMjQ4ZDIzOC41OTJkNzE1Ljc3NmQyNjIuMTQ0ZDcxMS42OGQyODguNzY4ZDcxMS42OGQzMDAuMDMyZDcxMS42OGQzMTIuMzJkNzEyLjcwNGQzMjQuNjA4ZDcxMy43MjhkMzM1Ljg3MmQ3MTUuNzc2ZDMzNS44NzJkODgxLjY2NGQzNDUuMDg4ZDQ5Ny42NjRkMzQ3LjEzNmQ1MTJkMzQ4LjE2ZDUyNS44MjRkMzQ5LjE4NGQ1MzkuNjQ3ZDM0OS4xODRkNTUzLjk4M2QzNDkuMTg0ZDU2OC4zMTlkMzQ4LjE2ZDU4Mi42NTZkMzQ3LjEzNmQ1OTYuOTkyZDM0NS4wODhkNjExLjMyOGQzMzAuNzUyZDYxMy4zNzZkMzE2LjQxNmQ2MTQuOTEyZDMwMi4wOGQ2MTYuNDQ4ZDI4Ny43NDRkNjE2LjQ0OGQyNzMuNDA4ZDYxNi40NDhkMjU5LjA3MmQ2MTQuOTEyZDI0NC43MzZkNjEzLjM3NmQyMzAuNGQ2MTEuMzI4ZDIyOC4zNTJkNTk2Ljk5MmQyMjcuMzI4ZDU4My4xNjhkMjI2LjMwNGQ1NjkuMzQ0ZDIyNi4zMDRkNTU1LjAwOGQyMjYuMzA0ZDU0MC42NzJkMjI3LjMyOGQ1MjYuMzM2ZDIyOC4zNTJkNTEyZDIzMC40ZDQ5Ny42NjRkMjQzLjcxMmQ0OTUuNjE2ZDI1OC4wNDhkNDk0LjU5MmQyNzIuMzg0ZDQ5My41NjhkMjg2LjcyZDQ5My41NjhkMzAxLjA1NmQ0OTMuNTY4ZDMxNy40NGQ0OTQuNTkyZDMzMy44MjRkNDk1LjYxNmQzNDUuMDg4ZDQ5Ny42NjRoUjNkNDk5LjcxMlI0ZDQ3OC4yMDhSNWQ2Mi40NjRSNmQ1MzAuNDMyUjdkLTIwOS45MlI4ZDQ2Ny45NjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxOTFSMTJkNjIuNDY0UjEzZDQ5OS43MTJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo3OG9SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDEwMS4zNzZkMjg1LjY5NmQxMTQuMTc2ZDI4NC42NzJkMTI2Ljk3NmQyODMuNjQ4ZDEzOC4yNGQyODMuNjQ4ZDE0OS41MDRkMjgzLjY0OGQxNjIuMzA0ZDI4NC42NzJkMTc1LjEwNGQyODUuNjk2ZDE4Ni4zNjhkMjg3Ljc0NGQ1MDYuODhkODQwLjcwNGQ1MDYuODhkMjg3Ljc0NGQ1MTkuMTY4ZDI4NS42OTZkNTMyLjQ4ZDI4NC42NzJkNTQ1Ljc5MmQyODMuNjQ4ZDU1OS4xMDRkMjgzLjY0OGQ1NzAuMzY4ZDI4My42NDhkNTgyLjY1NmQyODQuNjcyZDU5NC45NDRkMjg1LjY5NmQ2MDYuMjA4ZDI4Ny43NDRkNjA2LjIwOGQxMDI0ZDU5NC45NDRkMTAyNi4wNDhkNTgyLjE0NGQxMDI3LjA3MWQ1NjkuMzQ0ZDEwMjguMDk2ZDU1OC4wOGQxMDI4LjA5NmQ1NDYuODE2ZDEwMjguMDk2ZDUzNC4wMTZkMTAyNy4wNzFkNTIxLjIxNmQxMDI2LjA0OGQ1MDkuOTUyZDEwMjRkMTg4LjQxNmQ0NzQuMTExZDE4OC40MTZkMTAyNGQxNzcuMTUyZDEwMjYuMDQ4ZDE2NC4zNTJkMTAyNy4wNzFkMTUxLjU1MmQxMDI4LjA5NmQxMzkuMjY0ZDEwMjguMDk2ZDEyNS45NTJkMTAyOC4wOTZkMTEzLjE1MmQxMDI3LjA3MWQxMDAuMzUyZDEwMjYuMDQ4ZDkwLjExMmQxMDI0ZDkwLjExMmQyODcuNzQ0aFIzZDY5Ni4zMlI0ZDYwNi4yMDhSNWQ5MC4xMTJSNmQ3NDAuMzUyUjdkLTQuMDk2UjhkNjUwLjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNzhSMTJkOTAuMTEyUjEzZDY5Ni4zMlIxNGFpMWkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaGc6MTkwb1IxZDk1OC40NjRSMmFkNzU4Ljc4NGQyOTkuMDA4ZDc3MS4wNzJkMjk2Ljk2ZDc4My44NzJkMjk1LjkzNmQ3OTYuNjcyZDI5NC45MTJkODA4Ljk2ZDI5NC45MTJkODIyLjI3MmQyOTQuOTEyZDgzNi4wOTZkMjk1LjkzNmQ4NDkuOTJkMjk2Ljk2ZDg2Mi4yMDhkMjk5LjAwOGQzNjcuNjE2ZDEwMjIuOTc2ZDM1My4yOGQxMDI1LjAyM2QzNDAuOTkyZDEwMjYuMDQ4ZDMyOC43MDRkMTAyNy4wNzFkMzE2LjQxNmQxMDI3LjA3MWQyODcuNzQ0ZDEwMjcuMDcxZDI2NC4xOTJkMTAyMi45NzZkNzU4Ljc4NGQyOTkuMDA4ZDc3Mi4wOTZkODYzLjIzMmQ4NzIuNDQ4ZDg2My4yMzJkODcyLjQ0OGQ3ODIuMzM2ZDg5MC44OGQ3NzkuMjY0ZDkxMi4zODRkNzc5LjI2NGQ5MzIuODY0ZDc3OS4yNjRkOTUzLjM0NGQ3ODIuMzM2ZDk1My4zNDRkODYzLjIzMmQxMDAyLjQ5NmQ4NjMuMjMyZDEwMDQuNTQ0ZDg3MS40MjRkMTAwNS41NjhkODgwLjY0ZDEwMDYuNTkyZDg4OS44NTZkMTAwNi41OTJkOTAxLjEyZDEwMDYuNTkyZDkyMy42NDhkMTAwMi40OTZkOTM1LjkzNmQ5NTMuMzQ0ZDkzNS45MzZkOTUzLjM0NGQxMDE0Ljc4NGQ5MzIuODY0ZDEwMTcuODU2ZDkxNC40MzJkMTAxNy44NTZkODkxLjkwNGQxMDE3Ljg1NmQ4NzIuNDQ4ZDEwMTQuNzg0ZDg3Mi40NDhkOTM1LjkzNmQ2NTkuNDU2ZDkzNS45MzZkNjUxLjI2NGQ5MjIuNjI0ZDgxOS4yZDU4OS44MjRkODYwLjE2ZDU5NC45NDRkODkzLjk1MmQ2MTQuNGQ3NzIuMDk2ZDg2My4yMzJoUjNkMTA3NS4yUjRkMTAwNi41OTJSNWQ4Ny4wNFI2ZDcyOS4wODhSN2QtMy4wNzJSOGQ2NDIuMDQ4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTkwUjEyZDg3LjA0UjEzZDEwNzUuMlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpMmkxaTJpMmkzaTNpMmkyaTNpM2kzaTJpMmkzaTNpMmkyaTJpMmkzaTJoZzo3N29SMWQ5NTguNDY0UjJhZDExMC41OTJkMjg3Ljc0NGQxMjIuODhkMjg1LjY5NmQxMzguNzUyZDI4NC42NzJkMTU0LjYyNGQyODMuNjQ4ZDE2OC45NmQyODMuNjQ4ZDE4My4yOTZkMjgzLjY0OGQyMDAuMTkyZDI4NC42NzJkMjE3LjA4OGQyODUuNjk2ZDIyOC4zNTJkMjg3Ljc0NGQ0MTguODE2ZDc0OC41NDRkNjEwLjMwNGQyODcuNzQ0ZDYyMC41NDRkMjg1LjY5NmQ2MzUuOTA0ZDI4NC42NzJkNjUxLjI2NGQyODMuNjQ4ZDY2NS42ZDI4My42NDhkNjc4LjkxMmQyODMuNjQ4ZDY5NS4yOTZkMjg0LjY3MmQ3MTEuNjhkMjg1LjY5NmQ3MjIuOTQ0ZDI4Ny43NDRkNzU3Ljc2ZDEwMjRkNzQ1LjQ3MmQxMDI2LjA0OGQ3MzIuNjcyZDEwMjcuMDcxZDcxOS44NzJkMTAyOC4wOTZkNzA2LjU2ZDEwMjguMDk2ZDY5My4yNDhkMTAyOC4wOTZkNjgwLjQ0OGQxMDI3LjA3MWQ2NjcuNjQ4ZDEwMjYuMDQ4ZDY1Ni4zODRkMTAyNGQ2MzIuODMyZDQ1MS41ODNkNDUyLjYwOGQ4NzEuNDI0ZDQzMi4xMjhkODc0LjQ5NmQ0MTAuNjI0ZDg3NC40OTZkMzkxLjE2OGQ4NzQuNDk2ZDM3MS43MTJkODcxLjQyNGQxOTcuNjMyZDQ0OC41MTFkMTc0LjA4ZDEwMjRkMTYyLjgxNmQxMDI2LjA0OGQxNTAuNTI4ZDEwMjcuMDcxZDEzOC4yNGQxMDI4LjA5NmQxMjYuOTc2ZDEwMjguMDk2ZDExMy42NjRkMTAyOC4wOTZkMTAxLjM3NmQxMDI3LjA3MWQ4OS4wODhkMTAyNi4wNDhkNzcuODI0ZDEwMjRkMTEwLjU5MmQyODcuNzQ0aFIzZDgzNS41ODRSNGQ3NTcuNzZSNWQ3Ny44MjRSNmQ3NDAuMzUyUjdkLTQuMDk2UjhkNjYyLjUyOFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTc3UjEyZDc3LjgyNFIxM2Q4MzUuNTg0UjE0YWkxaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkzaTNpM2kzaTJpMmkzaTNpMmkyaTNpM2kzaTNpMmhnOjE4OW9SMWQ5NTguNDY0UjJhZDczNS4yMzJkMjk5LjAwOGQ3NDcuNTJkMjk2Ljk2ZDc2MC4zMmQyOTUuOTM2ZDc3My4xMmQyOTQuOTEyZDc4NS40MDhkMjk0LjkxMmQ3OTguNzJkMjk0LjkxMmQ4MTIuNTQ0ZDI5NS45MzZkODI2LjM2OGQyOTYuOTZkODM4LjY1NmQyOTkuMDA4ZDM0NC4wNjRkMTAyMi45NzZkMzI5LjcyOGQxMDI1LjAyM2QzMTcuNDRkMTAyNi4wNDhkMzA1LjE1MmQxMDI3LjA3MWQyOTIuODY0ZDEwMjcuMDcxZDI2NC4xOTJkMTAyNy4wNzFkMjQwLjY0ZDEwMjIuOTc2ZDczNS4yMzJkMjk5LjAwOGQzNTkuNDI0ZDQ0Mi4zNjdkMzQ2LjExMmQ0MjkuMDU2ZDMzOC40MzJkNDEyLjY3MmQzMzAuNzUyZDM5Ni4yODhkMzI1LjYzMmQzNzYuODMyZDUyMy4yNjRkMjk1LjkzNmQ1NDAuNjcyZDI5NS45MzZkNTQwLjY3MmQ2MzcuOTUyZDYzNS45MDRkNjM3Ljk1MmQ2NDBkNjU1LjM2ZDY0MGQ2NzMuNzkxZDY0MGQ2OTMuMjQ4ZDYzNS45MDRkNzEwLjY1NmQzNTYuMzUyZDcxMC42NTZkMzUzLjI4ZDcwMS40NGQzNTIuMjU2ZDY5My4yNDhkMzUxLjIzMmQ2ODUuMDU2ZDM1MS4yMzJkNjczLjc5MWQzNTEuMjMyZDY2NC41NzZkMzUyLjI1NmQ2NTUuODcyZDM1My4yOGQ2NDcuMTY4ZDM1Ni4zNTJkNjM3Ljk1MmQ0NTQuNjU2ZDYzNy45NTJkNDU0LjY1NmQ0MDMuNDU2ZDM1OS40MjRkNDQyLjM2N2hSM2QxMDc1LjJSNGQ5OTkuNDI0UjVkNjMuNDg4UjZkNzI5LjA4OFI3ZC0zLjA3MlI4ZDY2NS42UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTg5UjEyZDYzLjQ4OFIxM2QxMDc1LjJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTJpMWkzaTNpMmkyaTJpMmkzaTNpMmkzaTNpM2kzaTJpMmkyaGc6NzZvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkMjg3Ljc0NGQxMDEuMzc2ZDI4NS42OTZkMTE0LjE3NmQyODQuNjcyZDEyNi45NzZkMjgzLjY0OGQxNDEuMzEyZDI4My42NDhkMTU0LjYyNGQyODMuNjQ4ZDE2Ny45MzZkMjg0LjY3MmQxODEuMjQ4ZDI4NS42OTZkMTkzLjUzNmQyODcuNzQ0ZDE5My41MzZkOTMxLjg0ZDQ4Mi4zMDRkOTMxLjg0ZDQ4NC4zNTJkOTQzLjEwNGQ0ODQuODY0ZDk1NS4zOTJkNDg1LjM3NmQ5NjcuNjhkNDg1LjM3NmQ5NzcuOTJkNDg1LjM3NmQxMDAyLjQ5NmQ0ODIuMzA0ZDEwMjRkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRoUjNkNTA2Ljg4UjRkNDg1LjM3NlI1ZDkwLjExMlI2ZDc0MC4zNTJSN2QwUjhkNjUwLjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNzZSMTJkOTAuMTEyUjEzZDUwNi44OFIxNGFpMWkzaTNpM2kzaTJpMmkzaTNpM2kyaTJoZzoxODhvUjFkOTU4LjQ2NFIyYWQ3NTIuNjRkMjk5LjAwOGQ3NjQuOTI4ZDI5Ni45NmQ3NzcuNzI4ZDI5NS45MzZkNzkwLjUyOGQyOTQuOTEyZDgwMi44MTZkMjk0LjkxMmQ4MTYuMTI4ZDI5NC45MTJkODI5Ljk1MmQyOTUuOTM2ZDg0My43NzZkMjk2Ljk2ZDg1Ni4wNjRkMjk5LjAwOGQzNjEuNDcyZDEwMjIuOTc2ZDM0Ny4xMzZkMTAyNS4wMjNkMzM0Ljg0OGQxMDI2LjA0OGQzMjIuNTZkMTAyNy4wNzFkMzEwLjI3MmQxMDI3LjA3MWQyODEuNmQxMDI3LjA3MWQyNTguMDQ4ZDEwMjIuOTc2ZDc1Mi42NGQyOTkuMDA4ZDM2Mi40OTZkNDQyLjM2N2QzNDkuMTg0ZDQyOS4wNTZkMzQxLjUwNGQ0MTIuNjcyZDMzMy44MjRkMzk2LjI4OGQzMjguNzA0ZDM3Ni44MzJkNTI2LjMzNmQyOTUuOTM2ZDU0My43NDRkMjk1LjkzNmQ1NDMuNzQ0ZDYzNy45NTJkNjM4Ljk3NmQ2MzcuOTUyZDY0My4wNzJkNjU1LjM2ZDY0My4wNzJkNjczLjc5MWQ2NDMuMDcyZDY5My4yNDhkNjM4Ljk3NmQ3MTAuNjU2ZDM1OS40MjRkNzEwLjY1NmQzNTYuMzUyZDcwMS40NGQzNTUuMzI4ZDY5My4yNDhkMzU0LjMwNGQ2ODUuMDU2ZDM1NC4zMDRkNjczLjc5MWQzNTQuMzA0ZDY2NC41NzZkMzU1LjMyOGQ2NTUuODcyZDM1Ni4zNTJkNjQ3LjE2OGQzNTkuNDI0ZDYzNy45NTJkNDU3LjcyOGQ2MzcuOTUyZDQ1Ny43MjhkNDAzLjQ1NmQzNjIuNDk2ZDQ0Mi4zNjdoUjNkMTA3NS4yUjRkOTk3LjM3NlI1ZDY2LjU2UjZkNzI5LjA4OFI3ZC0zLjA3MlI4ZDY2Mi41MjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxODhSMTJkNjYuNTZSMTNkMTA3NS4yUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kyaTFpM2kzaTJpMmkyaTJpM2kzaTJpM2kzaTNpM2kyaTJpMmhnOjc1b1IxZDk1OC40NjRSMmFkMjI1LjI4ZDY1MC4yNGQ0NjEuODI0ZDI4Ny43NDRkNDc2LjE2ZDI4NS42OTZkNDg5Ljk4NGQyODQuNjcyZDUwMy44MDhkMjgzLjY0OGQ1MTUuMDcyZDI4My42NDhkNTI4LjM4NGQyODMuNjQ4ZDU0My43NDRkMjg0LjY3MmQ1NTkuMTA0ZDI4NS42OTZkNTc1LjQ4OGQyODcuNzQ0ZDM0Mi4wMTZkNjQxLjAyNGQ2MDUuMTg0ZDEwMjRkNTg4LjhkMTAyNi4wNDhkNTcyLjkyOGQxMDI3LjA3MWQ1NTcuMDU2ZDEwMjguMDk2ZDU0Mi43MmQxMDI4LjA5NmQ1MzAuNDMyZDEwMjguMDk2ZDUxNi4wOTZkMTAyNy4wNzFkNTAxLjc2ZDEwMjYuMDQ4ZDQ4Ni40ZDEwMjRkMjI1LjI4ZDY1MC4yNGQ5MC4xMTJkMjg3Ljc0NGQxMDIuNGQyODUuNjk2ZDExNS43MTJkMjg0LjY3MmQxMjkuMDI0ZDI4My42NDhkMTQyLjMzNmQyODMuNjQ4ZDE1NS42NDhkMjgzLjY0OGQxNjguOTZkMjg0LjY3MmQxODIuMjcyZDI4NS42OTZkMTk0LjU2ZDI4Ny43NDRkMTk0LjU2ZDEwMjRkMTgyLjI3MmQxMDI2LjA0OGQxNjguOTZkMTAyNy4wNzFkMTU1LjY0OGQxMDI4LjA5NmQxNDIuMzM2ZDEwMjguMDk2ZDEyOGQxMDI4LjA5NmQxMTQuNjg4ZDEwMjcuMDcxZDEwMS4zNzZkMTAyNi4wNDhkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRoUjNkNjE1LjQyNFI0ZDYwNS4xODRSNWQ5MC4xMTJSNmQ3NDAuMzUyUjdkLTQuMDk2UjhkNjUwLjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNzVSMTJkOTAuMTEyUjEzZDYxNS40MjRSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaGc6MTg3b1IxZDk1OC40NjRSMmFkNTgwLjYwOGQ3NTEuNjE2ZDQwOS42ZDk3Ny45MmQzOTcuMzEyZDk3OS45NjhkMzg1LjAyNGQ5ODEuNTA0ZDM3Mi43MzZkOTgzLjA0ZDM1OC40ZDk4My4wNGQzNDQuMDY0ZDk4My4wNGQzMjkuNzI4ZDk4MS41MDRkMzE1LjM5MmQ5NzkuOTY4ZDMwMS4wNTZkOTc3LjkyZDQ2OC45OTJkNzUyLjY0ZDMwMS4wNTZkNTI0LjI4OGQzMTUuMzkyZDUyMi4yNGQzMjkuMjE2ZDUyMS4yMTZkMzQzLjA0ZDUyMC4xOTJkMzU3LjM3NmQ1MjAuMTkyZDM3MC42ODhkNTIwLjE5MmQzODRkNTIxLjIxNmQzOTcuMzEyZDUyMi4yNGQ0MDkuNmQ1MjQuMjg4ZDU4MC42MDhkNzUxLjYxNmQzMjMuNTg0ZDc1MS42MTZkMTUyLjU3NmQ5NzcuOTJkMTQwLjI4OGQ5NzkuOTY4ZDEyOGQ5ODEuNTA0ZDExNS43MTJkOTgzLjA0ZDEwMS4zNzZkOTgzLjA0ZDg3LjA0ZDk4My4wNGQ3Mi43MDRkOTgxLjUwNGQ1OC4zNjhkOTc5Ljk2OGQ0NC4wMzJkOTc3LjkyZDIxMS45NjhkNzUyLjY0ZDQ0LjAzMmQ1MjQuMjg4ZDU4LjM2OGQ1MjIuMjRkNzIuMTkyZDUyMS4yMTZkODYuMDE2ZDUyMC4xOTJkMTAwLjM1MmQ1MjAuMTkyZDExMy42NjRkNTIwLjE5MmQxMjYuOTc2ZDUyMS4yMTZkMTQwLjI4OGQ1MjIuMjRkMTUyLjU3NmQ1MjQuMjg4ZDMyMy41ODRkNzUxLjYxNmhSM2Q2MzEuODA4UjRkNTgwLjYwOFI1ZDQ0LjAzMlI2ZDUwMy44MDhSN2Q0MC45NlI4ZDQ1OS43NzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxODdSMTJkNDQuMDMyUjEzZDYzMS44MDhSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjc0b1IxZDk1OC40NjRSMmFkMjE2LjA2NGQzNzguODhkODcuMDRkMzc4Ljg4ZDg0Ljk5MmQzNjguNjRkODMuOTY4ZDM1Ni4zNTJkODIuOTQ0ZDM0NC4wNjNkODIuOTQ0ZDMzMi43OTlkODIuOTQ0ZDMyMS41MzVkODMuOTY4ZDMwOS43NmQ4NC45OTJkMjk3Ljk4NGQ4Ny4wNGQyODcuNzQ0ZDMyMC41MTJkMjg3Ljc0NGQzMjAuNTEyZDgxOS4yZDMyMC41MTJkODgwLjY0ZDMwNy4yZDkyMi42MjRkMjkzLjg4OGQ5NjQuNjA4ZDI2OC4yODhkOTg5LjY5NmQyNDIuNjg4ZDEwMTQuNzg0ZDIwNS44MjRkMTAyNS41MzZkMTY4Ljk2ZDEwMzYuMjg4ZDEyMi44OGQxMDM2LjI4OGQ5OC4zMDRkMTAzNi4yODhkNzMuNzI4ZDEwMzIuNzA0ZDQ5LjE1MmQxMDI5LjExOWQyOC42NzJkMTAyNGQyOC42NzJkMTAwMy41MmQzMi43NjhkOTgwLjk5MmQzNi44NjRkOTU4LjQ2NGQ0NS4wNTZkOTM0LjkxMmQ1Ny4zNDRkOTM3Ljk4NGQ3My4yMTZkOTQxLjU2OGQ4OS4wODhkOTQ1LjE1MmQxMDYuNDk2ZDk0NS4xNTJkMTI0LjkyOGQ5NDUuMTUyZDE0My44NzJkOTQyLjA4ZDE2Mi44MTZkOTM5LjAwOGQxNzkuMmQ5MjguNzY4ZDE5NS41ODRkOTE4LjUyOGQyMDUuODI0ZDg5OC4wNDhkMjE2LjA2NGQ4NzcuNTY4ZDIxNi4wNjRkODQyLjc1MmQyMTYuMDY0ZDM3OC44OGhSM2Q0MDUuNTA0UjRkMzIwLjUxMlI1ZDI4LjY3MlI2ZDczNi4yNTZSN2QtMTIuMjg4UjhkNzA3LjU4NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTc0UjEyZDI4LjY3MlIxM2Q0MDUuNTA0UjE0YWkxaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzoxODZvUjFkOTU4LjQ2NFIyYWQzNTUuMzI4ZDUwMy44MDhkMzU1LjMyOGQ0MzcuMjQ3ZDMzMS4yNjRkMzk5LjM2ZDMwNy4yZDM2MS40NzJkMjU2ZDM2MS40NzJkMjA1LjgyNGQzNjEuNDcyZDE4MS4yNDhkMzk5LjM2ZDE1Ni42NzJkNDM3LjI0N2QxNTYuNjcyZDUwMy44MDhkMTU2LjY3MmQ1NzAuMzY3ZDE4MS4yNDhkNjA4Ljc2OGQyMDUuODI0ZDY0Ny4xNjhkMjU2ZDY0Ny4xNjhkMzA3LjJkNjQ3LjE2OGQzMzEuMjY0ZDYwOC43NjhkMzU1LjMyOGQ1NzAuMzY3ZDM1NS4zMjhkNTAzLjgwOGQ2Ni41NmQ1MDMuODA4ZDY2LjU2ZDQ1OS43NzVkNzguMzM2ZDQyMC44NjRkOTAuMTEyZDM4MS45NTJkMTE0LjE3NmQzNTIuMjU2ZDEzOC4yNGQzMjIuNTU5ZDE3My41NjhkMzA1LjE1MWQyMDguODk2ZDI4Ny43NDRkMjU2ZDI4Ny43NDRkMzAzLjEwNGQyODcuNzQ0ZDMzOC45NDRkMzA1LjE1MWQzNzQuNzg0ZDMyMi41NTlkMzk4LjMzNmQzNTIuMjU2ZDQyMS44ODhkMzgxLjk1MmQ0MzMuNjY0ZDQyMC44NjRkNDQ1LjQ0ZDQ1OS43NzVkNDQ1LjQ0ZDUwMy44MDhkNDQ1LjQ0ZDU0Ny44MzlkNDMzLjY2NGQ1ODcuMjY0ZDQyMS44ODhkNjI2LjY4OGQzOTguMzM2ZDY1Ni44OTZkMzc0Ljc4NGQ2ODcuMTA0ZDMzOC45NDRkNzA0LjUxMmQzMDMuMTA0ZDcyMS45MmQyNTZkNzIxLjkyZDIwOC44OTZkNzIxLjkyZDE3My41NjhkNzA0LjUxMmQxMzguMjRkNjg3LjEwNGQxMTQuMTc2ZDY1Ni44OTZkOTAuMTEyZDYyNi42ODhkNzguMzM2ZDU4Ny4yNjRkNjYuNTZkNTQ3LjgzOWQ2Ni41NmQ1MDMuODA4aFIzZDUxMlI0ZDQ0NS40NFI1ZDY2LjU2UjZkNzM2LjI1NlI3ZDMwMi4wOFI4ZDY2OS42OTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxODZSMTJkNjYuNTZSMTNkNTEyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo3M29SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDEwMi40ZDI4NS42OTZkMTE1LjcxMmQyODQuNjcyZDEyOS4wMjRkMjgzLjY0OGQxNDIuMzM2ZDI4My42NDhkMTU1LjY0OGQyODMuNjQ4ZDE2OC45NmQyODQuNjcyZDE4Mi4yNzJkMjg1LjY5NmQxOTQuNTZkMjg3Ljc0NGQxOTQuNTZkMTAyNGQxODIuMjcyZDEwMjYuMDQ4ZDE2OS40NzJkMTAyNy4wNzFkMTU2LjY3MmQxMDI4LjA5NmQxNDIuMzM2ZDEwMjguMDk2ZDEyOS4wMjRkMTAyOC4wOTZkMTE1LjJkMTAyNy4wNzFkMTAxLjM3NmQxMDI2LjA0OGQ5MC4xMTJkMTAyNGQ5MC4xMTJkMjg3Ljc0NGhSM2QyODQuNjcyUjRkMTk0LjU2UjVkOTAuMTEyUjZkNzQwLjM1MlI3ZC00LjA5NlI4ZDY1MC4yNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTczUjEyZDkwLjExMlIxM2QyODQuNjcyUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxODVvUjFkOTU4LjQ2NFIyYWQxMTQuNjg4ZDQ0Mi4zNjdkMTAxLjM3NmQ0MjkuMDU2ZDkzLjY5NmQ0MTIuNjcyZDg2LjAxNmQzOTYuMjg4ZDgwLjg5NmQzNzYuODMyZDI3OC41MjhkMjk1LjkzNmQyOTUuOTM2ZDI5NS45MzZkMjk1LjkzNmQ2MzcuOTUyZDM5MS4xNjhkNjM3Ljk1MmQzOTUuMjY0ZDY1NS4zNmQzOTUuMjY0ZDY3My43OTFkMzk1LjI2NGQ2OTMuMjQ4ZDM5MS4xNjhkNzEwLjY1NmQxMTEuNjE2ZDcxMC42NTZkMTA4LjU0NGQ3MDEuNDRkMTA3LjUyZDY5My4yNDhkMTA2LjQ5NmQ2ODUuMDU2ZDEwNi40OTZkNjczLjc5MWQxMDYuNDk2ZDY2NC41NzZkMTA3LjUyZDY1NS44NzJkMTA4LjU0NGQ2NDcuMTY4ZDExMS42MTZkNjM3Ljk1MmQyMDkuOTJkNjM3Ljk1MmQyMDkuOTJkNDAzLjQ1NmQxMTQuNjg4ZDQ0Mi4zNjdoUjNkNDYwLjhSNGQzOTUuMjY0UjVkODAuODk2UjZkNzI4LjA2NFI3ZDMxMy4zNDRSOGQ2NDcuMTY4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTg1UjEyZDgwLjg5NlIxM2Q0NjAuOFIxNGFpMWkzaTNpMmkyaTJpMmkzaTNpMmkzaTNpM2kzaTJpMmkyaGc6NzJvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkMjg3Ljc0NGQxMDIuNGQyODUuNjk2ZDExNS43MTJkMjg0LjY3MmQxMjkuMDI0ZDI4My42NDhkMTQyLjMzNmQyODMuNjQ4ZDE1NS42NDhkMjgzLjY0OGQxNjguOTZkMjg0LjY3MmQxODIuMjcyZDI4NS42OTZkMTk0LjU2ZDI4Ny43NDRkMTk0LjU2ZDU5MC44NDhkNTA3LjkwNGQ1OTAuODQ4ZDUwNy45MDRkMjg3Ljc0NGQ1MTkuMTY4ZDI4NS42OTZkNTMyLjQ4ZDI4NC42NzJkNTQ1Ljc5MmQyODMuNjQ4ZDU1OS4xMDRkMjgzLjY0OGQ1NzIuNDE2ZDI4My42NDhkNTg2LjI0ZDI4NC42NzJkNjAwLjA2NGQyODUuNjk2ZDYxMi4zNTJkMjg3Ljc0NGQ2MTIuMzUyZDEwMjRkNjAxLjA4OGQxMDI2LjA0OGQ1ODcuNzc2ZDEwMjcuMDcxZDU3NC40NjRkMTAyOC4wOTZkNTYwLjEyOGQxMDI4LjA5NmQ1NDYuODE2ZDEwMjguMDk2ZDUzMi45OTJkMTAyNy4wNzFkNTE5LjE2OGQxMDI2LjA0OGQ1MDcuOTA0ZDEwMjRkNTA3LjkwNGQ2ODMuMDA4ZDE5NC41NmQ2ODMuMDA4ZDE5NC41NmQxMDI0ZDE4Mi4yNzJkMTAyNi4wNDhkMTY5LjQ3MmQxMDI3LjA3MWQxNTYuNjcyZDEwMjguMDk2ZDE0Mi4zMzZkMTAyOC4wOTZkMTI5LjAyNGQxMDI4LjA5NmQxMTUuMmQxMDI3LjA3MWQxMDEuMzc2ZDEwMjYuMDQ4ZDkwLjExMmQxMDI0ZDkwLjExMmQyODcuNzQ0aFIzZDcwMi40NjRSNGQ2MTIuMzUyUjVkOTAuMTEyUjZkNzQwLjM1MlI3ZC00LjA5NlI4ZDY1MC4yNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTcyUjEyZDkwLjExMlIxM2Q3MDIuNDY0UjE0YWkxaTNpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaGc6MTg0b1IxZDk1OC40NjRSMmFkMjQ0LjczNmQxMDgzLjM5MmQyNTQuOTc2ZDEwODEuMzQ0ZDI2OC4yODhkMTA4MS4zNDRkMzE3LjQ0ZDEwODEuMzQ0ZDM0NC4wNjRkMTEwNS45MmQzNzAuNjg4ZDExMzAuNDk2ZDM3MC42ODhkMTE2OS40MDhkMzcwLjY4OGQxMjE5LjU4NGQzMzAuMjRkMTI0NS4xODRkMjg5Ljc5MmQxMjcwLjc4NGQyMjIuMjA4ZDEyNzAuNzg0ZDIwNy44NzJkMTI3MC43ODRkMTg2LjM2OGQxMjY5LjI0OGQxNjQuODY0ZDEyNjcuNzEyZDE0NC4zODRkMTI1OS41MmQxNDUuNDA4ZDEyNDUuMTg0ZDE0Ny45NjhkMTIyOC44ZDE1MC41MjhkMTIxMi40MTZkMTU4LjcyZDEyMDAuMTI4ZDE4OS40NGQxMjEwLjM2OGQyMjIuMjA4ZDEyMTAuMzY4ZDI1NC45NzZkMTIxMC4zNjhkMjczLjkyZDEyMDAuNjRkMjkyLjg2NGQxMTkwLjkxMmQyOTIuODY0ZDExNjkuNDA4ZDI5Mi44NjRkMTE0OC45MjhkMjc0LjQzMmQxMTQxLjI0OGQyNTZkMTEzMy41NjhkMjI2LjMwNGQxMTMzLjU2OGQyMTEuOTY4ZDExMzMuNTY4ZDE5Ny4xMmQxMTM1LjYxNmQxODIuMjcyZDExMzcuNjY0ZDE2OC45NmQxMTQwLjczNmQxNjIuODE2ZDExMzUuNjE2ZDIxMi45OTJkOTk5LjQyNGQyNzguNTI4ZDk5OS40MjRkMjQ0LjczNmQxMDgzLjM5MmhSM2Q1MTJSNGQzNzAuNjg4UjVkMTQ0LjM4NFI2ZDI0LjU3NlI3ZC0yNDYuNzg0UjhkLTExOS44MDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxODRSMTJkMTQ0LjM4NFIxM2Q1MTJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkyaGc6NzFvUjFkOTU4LjQ2NFIyYWQ1MTYuMDk2ZDY0My4wNzJkNTI4LjM4NGQ2NDEuMDI0ZDU0MS42OTZkNjQwZDU1NS4wMDhkNjM4Ljk3NmQ1NjguMzJkNjM4Ljk3NmQ1ODEuNjMyZDYzOC45NzZkNTk0Ljk0NGQ2NDBkNjA4LjI1NmQ2NDEuMDI0ZDYxOS41MmQ2NDMuMDcyZDYxOS41MmQxMDAyLjQ5NmQ1OTguMDE2ZDEwMTEuNzEyZDU3Mi40MTZkMTAxOC4zNjhkNTQ2LjgxNmQxMDI1LjAyM2Q1MTkuMTY4ZDEwMjguNjA4ZDQ5MS41MmQxMDMyLjE5MmQ0NjMuODcyZDEwMzQuMjRkNDM2LjIyNGQxMDM2LjI4OGQ0MTEuNjQ4ZDEwMzYuMjg4ZDMyOS43MjhkMTAzNi4yODhkMjY0LjE5MmQxMDEwLjY4OGQxOTguNjU2ZDk4NS4wODhkMTUzLjZkOTM2LjQ0OGQxMDguNTQ0ZDg4Ny44MDhkODQuNDhkODE4LjE3NWQ2MC40MTZkNzQ4LjU0NGQ2MC40MTZkNjYwLjQ4ZDYwLjQxNmQ1NzIuNDE1ZDg0Ljk5MmQ1MDEuMjQ3ZDEwOS41NjhkNDMwLjA4ZDE1NS4xMzZkMzc5LjkwNGQyMDAuNzA0ZDMyOS43MjdkMjYzLjY4ZDMwMi41OTJkMzI2LjY1NmQyNzUuNDU2ZDQwMy40NTZkMjc1LjQ1NmQ0NjEuODI0ZDI3NS40NTZkNTA0LjgzMmQyODMuMTM1ZDU0Ny44NGQyOTAuODE2ZDU4Mi42NTZkMzA0LjEyN2Q1ODAuNjA4ZDMyNy42NzlkNTczLjk1MmQzNDcuNjQ4ZDU2Ny4yOTZkMzY3LjYxNmQ1NTguMDhkMzkwLjE0NGQ1MjkuNDA4ZDM4MC45MjhkNDk2LjEyOGQzNzMuNzZkNDYyLjg0OGQzNjYuNTkyZDQxMi42NzJkMzY2LjU5MmQzNTguNGQzNjYuNTkyZDMxMy44NTZkMzg2LjA0OGQyNjkuMzEyZDQwNS41MDRkMjM4LjA4ZDQ0Mi44OGQyMDYuODQ4ZDQ4MC4yNTZkMTg5LjQ0ZDUzNS4wNGQxNzIuMDMyZDU4OS44MjRkMTcyLjAzMmQ2NjAuNDhkMTcyLjAzMmQ3MzMuMTg0ZDE4OS45NTJkNzg1LjkyZDIwNy44NzJkODM4LjY1NmQyNDAuNjRkODczLjk4NGQyNzMuNDA4ZDkwOS4zMTJkMzE3Ljk1MmQ5MjYuMjA4ZDM2Mi40OTZkOTQzLjEwNGQ0MTYuNzY4ZDk0My4xMDRkNDQ5LjUzNmQ5NDMuMTA0ZDQ3NC4xMTJkOTM5LjUyZDQ5OC42ODhkOTM1LjkzNmQ1MTYuMDk2ZDkzMC44MTZkNTE2LjA5NmQ2NDMuMDcyaFIzZDY5Ny4zNDRSNGQ2MTkuNTJSNWQ2MC40MTZSNmQ3NDguNTQ0UjdkLTEyLjI4OFI4ZDY4OC4xMjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk3MVIxMmQ2MC40MTZSMTNkNjk3LjM0NFIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MTgzb1IxZDk1OC40NjRSMmFkNjcuNTg0ZDc5Ny42OTZkNjUuNTM2ZDc4My4zNmQ2NC41MTJkNzcwLjA0OGQ2My40ODhkNzU2LjczNmQ2My40ODhkNzQyLjRkNjMuNDg4ZDcyOC4wNjRkNjQuNTEyZDcxNC4yNGQ2NS41MzZkNzAwLjQxNWQ2Ny41ODRkNjg2LjA3OWQ4MS45MmQ2ODQuMDMxZDk1LjIzMmQ2ODMuMDA4ZDEwOC41NDRkNjgxLjk4M2QxMjIuODhkNjgxLjk4M2QxMzcuMjE2ZDY4MS45ODNkMTUxLjA0ZDY4My4wMDhkMTY0Ljg2NGQ2ODQuMDMxZDE3OS4yZDY4Ni4wNzlkMTgxLjI0OGQ3MDAuNDE1ZDE4Mi4yNzJkNzEzLjcyOGQxODMuMjk2ZDcyNy4wNGQxODMuMjk2ZDc0MS4zNzZkMTgzLjI5NmQ3NTUuNzEyZDE4Mi4yNzJkNzY5LjUzNmQxODEuMjQ4ZDc4My4zNmQxNzkuMmQ3OTcuNjk2ZDE2NC44NjRkNzk5Ljc0NGQxNTEuNTUyZDgwMC43NjhkMTM4LjI0ZDgwMS43OTJkMTIzLjkwNGQ4MDEuNzkyZDEwOS41NjhkODAxLjc5MmQ5NS43NDRkODAwLjc2OGQ4MS45MmQ3OTkuNzQ0ZDY3LjU4NGQ3OTcuNjk2aFIzZDI0Ni43ODRSNGQxODMuMjk2UjVkNjMuNDg4UjZkMzQyLjAxNlI3ZDIyMi4yMDhSOGQyNzguNTI4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTgzUjEyZDYzLjQ4OFIxM2QyNDYuNzg0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo3MG9SMWQ5NTguNDY0UjJhZDkwLjExMmQyODcuNzQ0ZDQ3NS4xMzZkMjg3Ljc0NGQ0NzcuMTg0ZDI5Ny45ODRkNDc4LjIwOGQzMDkuNzZkNDc5LjIzMmQzMjEuNTM1ZDQ3OS4yMzJkMzMyLjc5OWQ0NzkuMjMyZDM0NC4wNjNkNDc4LjIwOGQzNTYuMzUyZDQ3Ny4xODRkMzY4LjY0ZDQ3NS4xMzZkMzc4Ljg4ZDE5NC41NmQzNzguODhkMTk0LjU2ZDU5NC45NDRkNDI5LjA1NmQ1OTQuOTQ0ZDQzMS4xMDRkNjA2LjIwOGQ0MzIuMTI4ZDYxNy45ODNkNDMzLjE1MmQ2MjkuNzZkNDMzLjE1MmQ2NDEuMDI0ZDQzMy4xNTJkNjUyLjI4OGQ0MzIuMTI4ZDY2NC4wNjRkNDMxLjEwNGQ2NzUuODM5ZDQyOS4wNTZkNjg3LjEwNGQxOTQuNTZkNjg3LjEwNGQxOTQuNTZkMTAyNGQxODIuMjcyZDEwMjYuMDQ4ZDE2OS40NzJkMTAyNy4wNzFkMTU2LjY3MmQxMDI4LjA5NmQxNDIuMzM2ZDEwMjguMDk2ZDEyOS4wMjRkMTAyOC4wOTZkMTE1LjJkMTAyNy4wNzFkMTAxLjM3NmQxMDI2LjA0OGQ5MC4xMTJkMTAyNGQ5MC4xMTJkMjg3Ljc0NGhSM2Q1MTYuMDk2UjRkNDc5LjIzMlI1ZDkwLjExMlI2ZDczNi4yNTZSN2QtNC4wOTZSOGQ2NDYuMTQ0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNzBSMTJkOTAuMTEyUjEzZDUxNi4wOTZSMTRhaTFpMmkzaTNpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjE4Mm9SMWQ5NTguNDY0UjJhZDI5MS44NGQ3MDMuNDg4ZDI3OS41NTJkNzAzLjQ4OGQyMzEuNDI0ZDcwMy40ODhkMTg5Ljk1MmQ2OTIuMjIzZDE0OC40OGQ2ODAuOTZkMTE3Ljc2ZDY1Ni4zODRkODcuMDRkNjMxLjgwOGQ2OS4xMmQ1OTMuOTJkNTEuMmQ1NTYuMDMxZDUxLjJkNTAzLjgwOGQ1MS4yZDQ0My4zOTFkNjkuNjMyZDQwMC44OTVkODguMDY0ZDM1OC40ZDEyNi45NzZkMzMxLjc3NWQxNjUuODg4ZDMwNS4xNTFkMjI1Ljc5MmQyOTMuMzc2ZDI4NS42OTZkMjgxLjZkMzY3LjYxNmQyODEuNmQzNjcuNjE2ZDEwMzAuMTQ0ZDMxNi40MTZkMTAzMC4xNDRkMjkxLjg0ZDEwMjRkMjkxLjg0ZDcwMy40ODhkNDQ1LjQ0ZDI4MS42ZDQ5Ni42NGQyODEuNmQ1MjEuMjE2ZDI4Ny43NDRkNTIxLjIxNmQxMDI0ZDQ5Ni42NGQxMDMwLjE0NGQ0NDUuNDRkMTAzMC4xNDRkNDQ1LjQ0ZDI4MS42aFIzZDU4NC43MDRSNGQ1MjEuMjE2UjVkNTEuMlI2ZDc0Mi40UjdkLTYuMTQ0UjhkNjkxLjJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxODJSMTJkNTEuMlIxM2Q1ODQuNzA0UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTFpM2kyaTNpMmhnOjY5b1IxZDk1OC40NjRSMmFkOTAuMTEyZDI4Ny43NDRkNDk0LjU5MmQyODcuNzQ0ZDQ5Ny42NjRkMzA4LjIyM2Q0OTcuNjY0ZDMzMi43OTlkNDk3LjY2NGQzNDQuMDYzZDQ5Ny4xNTJkMzU2LjM1MmQ0OTYuNjRkMzY4LjY0ZDQ5NC41OTJkMzc4Ljg4ZDE5NC41NmQzNzguODhkMTk0LjU2ZDU4OS44MjRkNDM0LjE3NmQ1ODkuODI0ZDQzNi4yMjRkNjAwLjA2NGQ0MzcuMjQ4ZDYxMS44MzlkNDM4LjI3MmQ2MjMuNjE2ZDQzOC4yNzJkNjM0Ljg4ZDQzOC4yNzJkNjQ2LjE0NGQ0MzcuMjQ4ZDY1OC40MzJkNDM2LjIyNGQ2NzAuNzJkNDM0LjE3NmQ2ODAuOTZkMTk0LjU2ZDY4MC45NmQxOTQuNTZkOTMyLjg2NGQ1MDIuNzg0ZDkzMi44NjRkNTA1Ljg1NmQ5NTMuMzQ0ZDUwNS44NTZkOTc3LjkyZDUwNS44NTZkOTg5LjE4NGQ1MDUuMzQ0ZDEwMDEuNDcyZDUwNC44MzJkMTAxMy43NmQ1MDIuNzg0ZDEwMjRkOTAuMTEyZDEwMjRkOTAuMTEyZDI4Ny43NDRoUjNkNTQ4Ljg2NFI0ZDUwNS44NTZSNWQ5MC4xMTJSNmQ3MzYuMjU2UjdkMFI4ZDY0Ni4xNDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk2OVIxMmQ5MC4xMTJSMTNkNTQ4Ljg2NFIxNGFpMWkyaTNpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaTJpM2kzaTNpMmkyaGc6MTgxb1IxZDk1OC40NjRSMmFkODEuOTJkNDk4LjY4OGQ5My4xODRkNDk2LjY0ZDEwNy4wMDhkNDk1LjYxNmQxMjAuODMyZDQ5NC41OTJkMTMyLjA5NmQ0OTQuNTkyZDE0My4zNmQ0OTQuNTkyZDE1Ny4xODRkNDk1LjYxNmQxNzEuMDA4ZDQ5Ni42NGQxODIuMjcyZDQ5OC42ODhkMTgyLjI3MmQ3NzMuMTJkMTgyLjI3MmQ4NjMuMjMyZDIxMi40OGQ5MDYuNzUyZDI0Mi42ODhkOTUwLjI3MWQzMDguMjI0ZDk1MC4yNzFkMzMzLjgyNGQ5NTAuMjcxZDM1Ny4zNzZkOTQxLjU2OGQzODAuOTI4ZDkzMi44NjRkMzk5LjM2ZDkxNS40NTZkNDE3Ljc5MmQ4OTguMDQ4ZDQyOC41NDRkODcwLjRkNDM5LjI5NmQ4NDIuNzUyZDQzOS4yOTZkODAzLjg0ZDQzOS4yOTZkNDk4LjY4OGQ0NTAuNTZkNDk2LjY0ZDQ2NC4zODRkNDk1LjYxNmQ0NzguMjA4ZDQ5NC41OTJkNDg5LjQ3MmQ0OTQuNTkyZDUwMC43MzZkNDk0LjU5MmQ1MTQuNTZkNDk1LjYxNmQ1MjguMzg0ZDQ5Ni42NGQ1MzkuNjQ4ZDQ5OC42ODhkNTM5LjY0OGQxMDI0ZDUzMS40NTZkMTAyNi4wNDhkNTIxLjcyOGQxMDI3LjA3MWQ1MTJkMTAyOC4wOTZkNTAxLjc2ZDEwMjguMDk2ZDQ5MS41MmQxMDI4LjA5NmQ0ODAuNzY4ZDEwMjcuMDcxZDQ3MC4wMTZkMTAyNi4wNDhkNDU5Ljc3NmQxMDI0ZDQ1Ni43MDRkMTAxMS43MTJkNDUyLjYwOGQ5OTIuMjU2ZDQ0OC41MTJkOTcyLjhkNDQ2LjQ2NGQ5NTguNDY0ZDQyMS44ODhkOTkyLjI1NmQzODUuNTM2ZDEwMTQuMjcyZDM0OS4xODRkMTAzNi4yODhkMjkxLjg0ZDEwMzYuMjg4ZDIyMi4yMDhkMTAzNi4yODhkMTgxLjI0OGQ5OTAuMjA4ZDE4MS4yNDhkMTI2NS42NjRkMTY5Ljk4NGQxMjY3LjcxMmQxNTYuMTZkMTI2OC43MzZkMTQyLjMzNmQxMjY5Ljc2ZDEzMS4wNzJkMTI2OS43NmQxMTkuODA4ZDEyNjkuNzZkMTA2LjQ5NmQxMjY4LjczNmQ5My4xODRkMTI2Ny43MTJkODEuOTJkMTI2NS42NjRkODEuOTJkNDk4LjY4OGhSM2Q2MTcuNDcyUjRkNTM5LjY0OFI1ZDgxLjkyUjZkNTI5LjQwOFI3ZC0yNDUuNzZSOGQ0NDcuNDg4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTgxUjEyZDgxLjkyUjEzZDYxNy40NzJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaGc6NjhvUjFkOTU4LjQ2NFIyYWQ5MS4xMzZkMjg3Ljc0NGQxMjUuOTUyZDI4My42NDhkMTc1LjEwNGQyODAuMDYzZDIyNC4yNTZkMjc2LjQ4ZDI3MS4zNmQyNzYuNDhkNDY0Ljg5NmQyNzYuNDhkNTYwLjY0ZDM3NC43ODRkNjU2LjM4NGQ0NzMuMDg3ZDY1Ni4zODRkNjU3LjQwOGQ2NTYuMzg0ZDg0OS45MmQ1NTguNTkyZDk0My4xMDRkNDYwLjhkMTAzNi4yODhkMjY3LjI2NGQxMDM2LjI4OGQyMTkuMTM2ZDEwMzYuMjg4ZDE3Mi4wMzJkMTAzMi43MDRkMTI0LjkyOGQxMDI5LjExOWQ5MS4xMzZkMTAyNGQ5MS4xMzZkMjg3Ljc0NGQxOTUuNTg0ZDkzNy45ODRkMjA5LjkyZDk0MC4wMzJkMjMwLjkxMmQ5NDEuNTY4ZDI1MS45MDRkOTQzLjEwNGQyNzUuNDU2ZDk0My4xMDRkMzM1Ljg3MmQ5NDMuMTA0ZDM4NS41MzZkOTI5LjI4ZDQzNS4yZDkxNS40NTZkNDcxLjA0ZDg4Mi42ODhkNTA2Ljg4ZDg0OS45MmQ1MjYuMzM2ZDc5NC4xMTJkNTQ1Ljc5MmQ3MzguMzA0ZDU0NS43OTJkNjU0LjMzNmQ1NDUuNzkyZDU3Ny41MzZkNTI2LjMzNmQ1MjMuMjY0ZDUwNi44OGQ0NjguOTkxZDQ3MS41NTJkNDM0LjY4OGQ0MzYuMjI0ZDQwMC4zODRkMzg3LjA3MmQzODUuMDI0ZDMzNy45MmQzNjkuNjY0ZDI3OC41MjhkMzY5LjY2NGQyNTkuMDcyZDM2OS42NjRkMjM2LjAzMmQzNzAuMTc1ZDIxMi45OTJkMzcwLjY4OGQxOTUuNTg0ZDM3My43NmQxOTUuNTg0ZDkzNy45ODRoUjNkNzE1Ljc3NlI0ZDY1Ni4zODRSNWQ5MS4xMzZSNmQ3NDcuNTJSN2QtMTIuMjg4UjhkNjU2LjM4NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTY4UjEyZDkxLjEzNlIxM2Q3MTUuNzc2UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjE4MG9SMWQ5NTguNDY0UjJhZDIzNC40OTZkNDE1Ljc0NGQyMjMuMjMyZDQxNy43OTJkMjA5LjkyZDQxOC44MTZkMTk2LjYwOGQ0MTkuODRkMTgwLjIyNGQ0MTkuODRkMTY4Ljk2ZDQxOS44NGQxNTcuMTg0ZDQxOC44MTZkMTQ1LjQwOGQ0MTcuNzkyZDEzMy4xMmQ0MTUuNzQ0ZDI1MC44OGQyODUuNjk2ZDI2Ni4yNGQyODMuNjQ4ZDI4Mi42MjRkMjgyLjYyNGQyOTkuMDA4ZDI4MS42ZDMxNi40MTZkMjgxLjZkMzM0Ljg0OGQyODEuNmQzNTAuMjA4ZDI4Mi42MjRkMzY1LjU2OGQyODMuNjQ4ZDM3OS45MDRkMjg1LjY5NmQyMzQuNDk2ZDQxNS43NDRoUjNkNTEyUjRkMzc5LjkwNFI1ZDEzMy4xMlI2ZDc0Mi40UjdkNjA0LjE2UjhkNjA5LjI4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTgwUjEyZDEzMy4xMlIxM2Q1MTJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjY3b1IxZDk1OC40NjRSMmFkNTYwLjEyOGQ5MTYuNDhkNTgyLjY1NmQ5NjAuNTEyZDU4OC44ZDEwMDEuNDcyZDU0NS43OTJkMTAxOS45MDRkNTAwLjczNmQxMDI4LjA5NmQ0NTUuNjhkMTAzNi4yODhkNDAzLjQ1NmQxMDM2LjI4OGQzMjMuNTg0ZDEwMzYuMjg4ZDI1OS41ODRkMTAxMC4xNzZkMTk1LjU4NGQ5ODQuMDY0ZDE1MS41NTJkOTM1LjQyNGQxMDcuNTJkODg2Ljc4NGQ4My45NjhkODE3LjE1MmQ2MC40MTZkNzQ3LjUyZDYwLjQxNmQ2NjAuNDhkNjAuNDE2ZDU3Mi40MTVkODMuOTY4ZDUwMS4yNDdkMTA3LjUyZDQzMC4wOGQxNTEuNTUyZDM3OS45MDRkMTk1LjU4NGQzMjkuNzI3ZDI1OS4wNzJkMzAyLjU5MmQzMjIuNTZkMjc1LjQ1NmQ0MDEuNDA4ZDI3NS40NTZkNDU5Ljc3NmQyNzUuNDU2ZDUwMS43NmQyODMuNjQ4ZDU0My43NDRkMjkxLjg0ZDU3Ni41MTJkMzAzLjEwNGQ1NzQuNDY0ZDMyNi42NTVkNTY3LjgwOGQzNDYuNjI0ZDU2MS4xNTJkMzY2LjU5MmQ1NTEuOTM2ZDM4OS4xMmQ1MzYuNTc2ZDM4NGQ1MjIuMjRkMzc5LjkwNGQ1MDcuOTA0ZDM3NS44MDhkNDkxLjUyZDM3Mi43MzZkNDc1LjEzNmQzNjkuNjY0ZDQ1NS4xNjhkMzY4LjEyOGQ0MzUuMmQzNjYuNTkyZDQwOS42ZDM2Ni41OTJkMjk3Ljk4NGQzNjYuNTkyZDIzNi4wMzJkNDQyLjM2N2QxNzQuMDhkNTE4LjE0NGQxNzQuMDhkNjYwLjQ4ZDE3NC4wOGQ3MzMuMTg0ZDE5MS40ODhkNzg2LjQzMmQyMDguODk2ZDgzOS42OGQyNDAuNjRkODc0LjQ5NmQyNzIuMzg0ZDkwOS4zMTJkMzE2LjkyOGQ5MjYuNzJkMzYxLjQ3MmQ5NDQuMTI4ZDQxNi43NjhkOTQ0LjEyOGQ0NTkuNzc2ZDk0NC4xMjhkNDk0LjU5MmQ5MzYuOTZkNTI5LjQwOGQ5MjkuNzkyZDU2MC4xMjhkOTE2LjQ4aFIzZDYzMi44MzJSNGQ1ODguOFI1ZDYwLjQxNlI2ZDc0OC41NDRSN2QtMTIuMjg4UjhkNjg4LjEyOFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTY3UjEyZDYwLjQxNlIxM2Q2MzIuODMyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTc5b1IxZDk1OC40NjRSMmFkMzY5LjY2NGQzMDAuMDMyZDM3Ny44NTZkMzE1LjM5MWQyNzcuNTA0ZDQ2MC43OTlkMzA1LjE1MmQ0NjMuODcxZDMyNi4xNDRkNDc1LjY0OGQzNDcuMTM2ZDQ4Ny40MjRkMzYwLjk2ZDUwMy4yOTVkMzc0Ljc4NGQ1MTkuMTY4ZDM4MS45NTJkNTM4LjYyNGQzODkuMTJkNTU4LjA3OWQzODkuMTJkNTc2LjUxMmQzODkuMTJkNjExLjMyOGQzNzQuNzg0ZDYzOC40NjRkMzYwLjQ0OGQ2NjUuNTk5ZDMzNS4zNmQ2ODQuNTQ0ZDMxMC4yNzJkNzAzLjQ4OGQyNzUuNDU2ZDcxMy4yMTZkMjQwLjY0ZDcyMi45NDRkMjAwLjcwNGQ3MjIuOTQ0ZDE4Mi4yNzJkNzIyLjk0NGQxNjcuNDI0ZDcyMS45MmQxNTIuNTc2ZDcyMC44OTZkMTM4Ljc1MmQ3MTguODQ4ZDEyNC45MjhkNzE2LjhkMTExLjEwNGQ3MTMuNzI4ZDk3LjI4ZDcxMC42NTZkNzkuODcyZDcwNS41MzZkODEuOTJkNjg3LjEwNGQ4Ny41NTJkNjY4LjY3MmQ5My4xODRkNjUwLjI0ZDEwMC4zNTJkNjM1LjkwNGQxMjYuOTc2ZDY0NC4wOTZkMTUwLjUyOGQ2NDguNzA0ZDE3NC4wOGQ2NTMuMzEyZDE5Ny42MzJkNjUzLjMxMmQyMzkuNjE2ZDY1My4zMTJkMjY5LjgyNGQ2MzUuMzkyZDMwMC4wMzJkNjE3LjQ3MmQzMDAuMDMyZDU3OC41NmQzMDAuMDMyZDU0NS43OTFkMjczLjQwOGQ1MzAuNDMyZDI0Ni43ODRkNTE1LjA3MmQyMTIuOTkyZDUxNS4wNzJkMjAyLjc1MmQ1MTUuMDcyZDE5My41MzZkNTE1LjU4NGQxODQuMzJkNTE2LjA5NmQxNzMuMDU2ZDUxOS4xNjhkMTYxLjc5MmQ1MDYuODhkMjUwLjg4ZDM3MC42ODhkMTA3LjUyZDM3MC42ODhkMTA0LjQ0OGQzNTIuMjU2ZDEwNC40NDhkMzM1Ljg3MWQxMDQuNDQ4ZDMxOC40NjNkMTA3LjUyZDMwMC4wMzJkMzY5LjY2NGQzMDAuMDMyaFIzZDQ2MC44UjRkMzg5LjEyUjVkNzkuODcyUjZkNzIzLjk2OFI3ZDMwMS4wNTZSOGQ2NDQuMDk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTc5UjEyZDc5Ljg3MlIxM2Q0NjAuOFIxNGFpMWkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTNpMmhnOjY2b1IxZDk1OC40NjRSMmFkOTEuMTM2ZDI4Ny43NDRkMTE2LjczNmQyODIuNjI0ZDE2Mi44MTZkMjc5LjU1MmQyMDguODk2ZDI3Ni40OGQyNTZkMjc2LjQ4ZDMxNC4zNjhkMjc2LjQ4ZDM2Mi40OTZkMjg2LjcyZDQxMC42MjRkMjk2Ljk2ZDQ0NC45MjhkMzIwZDQ3OS4yMzJkMzQzLjAzOWQ0OTguMTc2ZDM3OS4zOTFkNTE3LjEyZDQxNS43NDRkNTE3LjEyZDQ2Ny45NjdkNTE3LjEyZDQ5OS43MTJkNTA3LjM5MmQ1MjYuODQ4ZDQ5Ny42NjRkNTUzLjk4M2Q0ODEuMjhkNTc0Ljk3NmQ0NjQuODk2ZDU5NS45NjhkNDQzLjM5MmQ2MDkuNzkxZDQyMS44ODhkNjIzLjYxNmQzOTkuMzZkNjI5Ljc2ZDQyOC4wMzJkNjMyLjgzMmQ0NTcuMjE2ZDY0NS4xMmQ0ODYuNGQ2NTcuNDA4ZDUwOS45NTJkNjc5LjkzNWQ1MzMuNTA0ZDcwMi40NjRkNTQ4LjM1MmQ3MzYuNzY4ZDU2My4yZDc3MS4wNzJkNTYzLjJkODIwLjIyM2Q1NjMuMmQ4NzkuNjE2ZDUzOS42NDhkOTIxLjA4OGQ1MTYuMDk2ZDk2Mi41NmQ0NzUuNjQ4ZDk4OC4xNmQ0MzUuMmQxMDEzLjc2ZDM4MC40MTZkMTAyNS4wMjNkMzI1LjYzMmQxMDM2LjI4OGQyNjMuMTY4ZDEwMzYuMjg4ZDIyNC4yNTZkMTAzNi4yODhkMTc4LjE3NmQxMDMyLjcwNGQxMzIuMDk2ZDEwMjkuMTE5ZDkxLjEzNmQxMDI0ZDkxLjEzNmQyODcuNzQ0ZDE5NC41NmQ5NDMuMTA0ZDIwOC44OTZkOTQ1LjE1MmQyMzAuOTEyZDk0Ni4xNzZkMjUyLjkyOGQ5NDcuMmQyNzQuNDMyZDk0Ny4yZDMxMS4yOTZkOTQ3LjJkMzQzLjU1MmQ5NDEuMDU2ZDM3NS44MDhkOTM0LjkxMmQ0MDAuMzg0ZDkyMC4wNjRkNDI0Ljk2ZDkwNS4yMTZkNDM5LjI5NmQ4ODAuMTI3ZDQ1My42MzJkODU1LjA0ZDQ1My42MzJkODE2LjEyN2Q0NTMuNjMyZDc3OC4yNGQ0NDAuMzJkNzUyLjEyN2Q0MjcuMDA4ZDcyNi4wMTZkNDAzLjk2OGQ3MTAuMTQ0ZDM4MC45MjhkNjk0LjI3MWQzNDkuMTg0ZDY4Ny42MTZkMzE3LjQ0ZDY4MC45NmQyODAuNTc2ZDY4MC45NmQxOTQuNTZkNjgwLjk2ZDE5NC41NmQ5NDMuMTA0ZDI2OS4zMTJkNTk0Ljk0NGQzMzguOTQ0ZDU5NC45NDRkMzc1LjgwOGQ1NjQuNzM2ZDQxMi42NzJkNTM0LjUyOGQ0MTIuNjcyZDQ3NC4xMTFkNDEyLjY3MmQ0MTUuNzQ0ZDM3My4yNDhkMzg3LjA3MmQzMzMuODI0ZDM1OC40ZDI2Ni4yNGQzNTguNGQyNDUuNzZkMzU4LjRkMjI2LjgxNmQzNTkuNDI0ZDIwNy44NzJkMzYwLjQ0OGQxOTQuNTZkMzYyLjQ5NmQxOTQuNTZkNTk0Ljk0NGQyNjkuMzEyZDU5NC45NDRoUjNkNjA5LjI4UjRkNTYzLjJSNWQ5MS4xMzZSNmQ3NDcuNTJSN2QtMTIuMjg4UjhkNjU2LjM4NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTY2UjEyZDkxLjEzNlIxM2Q2MDkuMjhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkxaTNpM2kzaTNpM2kzaTJpMmhnOjE3OG9SMWQ5NTguNDY0UjJhZDIzMi40NDhkNjM2LjkyOGQzODkuMTJkNjM2LjkyOGQzOTAuMTQ0ZDY0NS4xMmQzOTAuNjU2ZDY1NC4zMzZkMzkxLjE2OGQ2NjMuNTUyZDM5MS4xNjhkNjczLjc5MWQzOTEuMTY4ZDY4NC4wMzFkMzkwLjY1NmQ2OTMuMjQ4ZDM5MC4xNDRkNzAyLjQ2NGQzODkuMTJkNzEwLjY1NmQ3Mi43MDRkNzEwLjY1NmQ2Ny41ODRkNjk4LjM2N2QxMDAuMzUyZDY2My41NTJkMTM3LjIxNmQ2MjYuMTc1ZDE3NC4wOGQ1ODguOGQyMDQuOGQ1NTMuNDcyZDIzNS41MmQ1MTguMTQ0ZDI1NS40ODhkNDg2LjRkMjc1LjQ1NmQ0NTQuNjU1ZDI3NS40NTZkNDI5LjA1NmQyNzUuNDU2ZDM5Ni4yODhkMjUwLjg4ZDM4NC41MTFkMjI2LjMwNGQzNzIuNzM2ZDE5MC40NjRkMzcyLjczNmQxNTkuNzQ0ZDM3Mi43MzZkMTQwLjI4OGQzNzcuODU2ZDEyMC44MzJkMzgyLjk3NmQxMDMuNDI0ZDM5MC4xNDRkOTguMzA0ZDM3Ni44MzJkOTIuNjcyZDM1Ny44ODhkODcuMDRkMzM4Ljk0M2Q4My45NjhkMzE3LjQzOWQxMTUuNzEyZDMwNi4xNzVkMTQzLjM2ZDMwMC41NDRkMTcxLjAwOGQyOTQuOTEyZDIwNC44ZDI5NC45MTJkMjc3LjUwNGQyOTQuOTEyZDMyMS41MzZkMzI3LjY3OWQzNjUuNTY4ZDM2MC40NDhkMzY1LjU2OGQ0MjEuODg4ZDM2NS41NjhkNDY3Ljk2N2QzNDIuMDE2ZDUwOS40MzlkMzE4LjQ2NGQ1NTAuOTEyZDI3Mi4zODRkNTk2Ljk5MmQyMzIuNDQ4ZDYzNi45MjhoUjNkNDYwLjhSNGQzOTEuMTY4UjVkNjcuNTg0UjZkNzI5LjA4OFI3ZDMxMy4zNDRSOGQ2NjEuNTA0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTc4UjEyZDY3LjU4NFIxM2Q0NjAuOFIxNGFpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjY1b1IxZDk1OC40NjRSMmFkNDUyLjYwOGQ4NTQuMDE2ZDE3My4wNTZkODU0LjAxNmQxMjIuODhkMTAyNGQxMDkuNTY4ZDEwMjYuMDQ4ZDk2LjI1NmQxMDI3LjA3MWQ4Mi45NDRkMTAyOC4wOTZkNjkuNjMyZDEwMjguMDk2ZDU1LjI5NmQxMDI4LjA5NmQ0MS40NzJkMTAyNy4wNzFkMjcuNjQ4ZDEwMjYuMDQ4ZDE2LjM4NGQxMDI0ZDI1NmQyODcuNzQ0ZDI2OS4zMTJkMjg1LjY5NmQyODQuNjcyZDI4NC42NzJkMzAwLjAzMmQyODMuNjQ4ZDMxNi40MTZkMjgzLjY0OGQzMzAuNzUyZDI4My42NDhkMzQ2LjExMmQyODQuNjcyZDM2MS40NzJkMjg1LjY5NmQzNzUuODA4ZDI4Ny43NDRkNjE0LjRkMTAyNGQ2MDIuMTEyZDEwMjYuMDQ4ZDU4Ni43NTJkMTAyNy4wNzFkNTcxLjM5MmQxMDI4LjA5NmQ1NTcuMDU2ZDEwMjguMDk2ZDU0My43NDRkMTAyOC4wOTZkNTI5LjkyZDEwMjcuMDcxZDUxNi4wOTZkMTAyNi4wNDhkNTAzLjgwOGQxMDI0ZDQ1Mi42MDhkODU0LjAxNmQyMDAuNzA0ZDc2Mi44OGQ0MjQuOTZkNzYyLjg4ZDMxMi4zMmQzODcuMDcyZDIwMC43MDRkNzYyLjg4aFIzZDYzMS44MDhSNGQ2MTQuNFI1ZDE2LjM4NFI2ZDc0MC4zNTJSN2QtNC4wOTZSOGQ3MjMuOTY4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNjVSMTJkMTYuMzg0UjEzZDYzMS44MDhSMTRhaTFpMmkyaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTFpMmkyaTJoZzoxNzdvUjFkOTU4LjQ2NFIyYWQyNjIuMTQ0ZDcwOS42MzJkOTIuMTZkNzA5LjYzMmQ4OC4wNjRkNjg5LjE1MmQ4OC4wNjRkNjYzLjU1MmQ4OC4wNjRkNjM4Ljk3NmQ5Mi4xNmQ2MTguNDk2ZDI2Mi4xNDRkNjE4LjQ5NmQyNjIuMTQ0ZDQzMi4xMjhkMjczLjQwOGQ0MzAuMDhkMjg0LjE2ZDQyOS4wNTZkMjk0LjkxMmQ0MjguMDMyZDMwNy4yZDQyOC4wMzJkMzE4LjQ2NGQ0MjguMDMyZDMyOS43MjhkNDI5LjA1NmQzNDAuOTkyZDQzMC4wOGQzNTMuMjhkNDMyLjEyOGQzNTMuMjhkNjE4LjQ5NmQ1MjIuMjRkNjE4LjQ5NmQ1MjQuMjg4ZDYyOS43NmQ1MjUuMzEyZDY0MS4wMjRkNTI2LjMzNmQ2NTIuMjg4ZDUyNi4zMzZkNjYzLjU1MmQ1MjYuMzM2ZDY3NC44MTZkNTI1LjMxMmQ2ODYuNTkyZDUyNC4yODhkNjk4LjM2N2Q1MjIuMjRkNzA5LjYzMmQzNTMuMjhkNzA5LjYzMmQzNTMuMjhkODk0Ljk3NmQzNDAuOTkyZDg5Ny4wMjRkMzI5LjcyOGQ4OTguMDQ4ZDMxOC40NjRkODk5LjA3MmQzMDcuMmQ4OTkuMDcyZDI4MS42ZDg5OS4wNzJkMjYyLjE0NGQ4OTQuOTc2ZDI2Mi4xNDRkNzA5LjYzMmQ1MjQuMjg4ZDkyOS43OTJkNTI2LjMzNmQ5NDAuMDMyZDUyNy4zNmQ5NTIuODMyZDUyOC4zODRkOTY1LjYzMmQ1MjguMzg0ZDk3Ni44OTZkNTI4LjM4NGQ5ODguMTZkNTI3LjM2ZDEwMDAuOTZkNTI2LjMzNmQxMDEzLjc2ZDUyNC4yODhkMTAyMi45NzZkOTAuMTEyZDEwMjIuOTc2ZDg4LjA2NGQxMDEzLjc2ZDg3LjU1MmQxMDAwLjk2ZDg3LjA0ZDk4OC4xNmQ4Ny4wNGQ5NzYuODk2ZDg3LjA0ZDk2NS42MzJkODcuNTUyZDk1Mi44MzJkODguMDY0ZDk0MC4wMzJkOTAuMTEyZDkyOS43OTJkNTI0LjI4OGQ5MjkuNzkyaFIzZDYxNC40UjRkNTI4LjM4NFI1ZDg3LjA0UjZkNTk1Ljk2OFI3ZDEuMDI0UjhkNTA4LjkyOFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE3N1IxMmQ4Ny4wNFIxM2Q2MTQuNFIxNGFpMWkyaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzo2NG9SMWQ5NTguNDY0UjJhZDk4Mi4wMTZkNjIxLjU2OGQ5ODIuMDE2ZDY4NS4wNTZkOTYzLjA3MmQ3NDYuNDk2ZDk0NC4xMjhkODA3LjkzNmQ5MDcuNzc2ZDg1Ny4wODhkODcxLjQyNGQ5MDYuMjRkODIwLjIyNGQ5MzYuNDQ4ZDc2OS4wMjRkOTY2LjY1NmQ3MDQuNTEyZDk2Ni42NTZkNjMyLjgzMmQ5NjYuNjU2ZDU5MS44NzJkOTM0LjkxMmQ1NjIuMTc2ZDk1Mi4zMTlkNTI1LjMxMmQ5NjIuNTZkNDg4LjQ0OGQ5NzIuOGQ0NDQuNDE2ZDk3Mi44ZDM3Mi43MzZkOTcyLjhkMzI5LjIxNmQ5MjkuMjhkMjg1LjY5NmQ4ODUuNzZkMjg1LjY5NmQ4MDkuOTg0ZDI4NS42OTZkNzQwLjM1MmQzMDkuMjQ4ZDY4MS40NzJkMzMyLjhkNjIyLjU5MmQzNzIuNzM2ZDU4MC4wOTZkNDEyLjY3MmQ1MzcuNTk5ZDQ2Ni40MzJkNTEzLjUzNmQ1MjAuMTkyZDQ4OS40NzJkNTgwLjYwOGQ0ODkuNDcyZDYyMS41NjhkNDg5LjQ3MmQ2NTguOTQ0ZDQ5NS42MTZkNjk2LjMyZDUwMS43NmQ3MzIuMTZkNTEzLjAyNGQ2NTguNDMyZDg3OC41OTJkNjY4LjY3MmQ4ODYuNzg0ZDY4My41MmQ4ODkuMzQ0ZDY5OC4zNjhkODkxLjkwNGQ3MTIuNzA0ZDg5MS45MDRkNzU1LjcxMmQ4OTEuOTA0ZDc4OC40OGQ4NjYuODE2ZDgyMS4yNDhkODQxLjcyOGQ4NDQuMjg4ZDgwMi4zMDRkODY3LjMyOGQ3NjIuODhkODc5LjEwNGQ3MTUuMjY0ZDg5MC44OGQ2NjcuNjQ3ZDg5MC44OGQ2MjEuNTY4ZDg5MC44OGQ0OTEuNTJkODE0LjA4ZDQyMy45MzZkNzM3LjI4ZDM1Ni4zNTJkNTk4LjAxNmQzNTYuMzUyZDQ5MS41MmQzNTYuMzUyZDQwOC41NzZkMzkzLjcyN2QzMjUuNjMyZDQzMS4xMDRkMjY4LjhkNDkzLjU2OGQyMTEuOTY4ZDU1Ni4wMzFkMTgyLjI3MmQ2MzUuOTA0ZDE1Mi41NzZkNzE1Ljc3NmQxNTIuNTc2ZDgwMC43NjhkMTUyLjU3NmQ4ODAuNjRkMTc1LjYxNmQ5MzcuOTg0ZDE5OC42NTZkOTk1LjMyOGQyMzguNTkyZDEwMzEuNjhkMjc4LjUyOGQxMDY4LjAzMmQzMzIuOGQxMDg1LjQ0ZDM4Ny4wNzJkMTEwMi44NDhkNDQ5LjUzNmQxMTAyLjg0OGQ0OTkuNzEyZDExMDIuODQ4ZDU0My43NDRkMTA5NS4xNjhkNTg3Ljc3NmQxMDg3LjQ4OGQ2MjMuNjE2ZDEwNzQuMTc2ZDYyOS43NmQxMDg4LjUxMmQ2MzUuOTA0ZDExMDYuNDMyZDY0Mi4wNDhkMTEyNC4zNTJkNjQ2LjE0NGQxMTQ1Ljg1NmQ1NzEuMzkyZDExODAuNjcyZDQ0Ny40ODhkMTE4MC42NzJkMzY3LjYxNmQxMTgwLjY3MmQyOTYuNDQ4ZDExNTguMTQ0ZDIyNS4yOGQxMTM1LjYxNmQxNzIuMDMyZDEwODkuMDI0ZDExOC43ODRkMTA0Mi40MzJkODguMDY0ZDk3MS43NzZkNTcuMzQ0ZDkwMS4xMmQ1Ny4zNDRkODA0Ljg2NGQ1Ny4zNDRkNzEyLjcwNGQ4OS42ZDYxOS4wMDhkMTIxLjg1NmQ1MjUuMzEyZDE4OS40NGQ0NDkuMDI0ZDI1Ny4wMjRkMzcyLjczNmQzNjAuOTZkMzI0LjYwN2Q0NjQuODk2ZDI3Ni40OGQ2MDguMjU2ZDI3Ni40OGQ2ODYuMDhkMjc2LjQ4ZDc1NC4xNzZkMjk3LjQ3MmQ4MjIuMjcyZDMxOC40NjNkODcyLjk2ZDM2MS40NzJkOTIzLjY0OGQ0MDQuNDhkOTUyLjgzMmQ0NjkuNTA0ZDk4Mi4wMTZkNTM0LjUyOGQ5ODIuMDE2ZDYyMS41NjhkNjIyLjU5MmQ1NzcuNTM2ZDYwOS4yOGQ1NzQuNDY0ZDU5OC4wMTZkNTcyLjkyOGQ1ODYuNzUyZDU3MS4zOTJkNTc0LjQ2NGQ1NzEuMzkyZDUzNC41MjhkNTcxLjM5MmQ1MDAuMjI0ZDU4OC4yODhkNDY1LjkyZDYwNS4xODRkNDQwLjgzMmQ2MzQuODhkNDE1Ljc0NGQ2NjQuNTc2ZDQwMS40MDhkNzA0LjUxMmQzODcuMDcyZDc0NC40NDhkMzg3LjA3MmQ3OTAuNTI4ZDM4Ny4wNzJkODQyLjc1MmQ0MTAuMTEyZDg2Ny4zMjhkNDMzLjE1MmQ4OTEuOTA0ZDQ3OS4yMzJkODkxLjkwNGQ1MDIuNzg0ZDg5MS45MDRkNTIyLjI0ZDg4Ny44MDhkNTQxLjY5NmQ4ODMuNzEyZDU2Ni4yNzJkODcyLjQ0OGQ2MjIuNTkyZDU3Ny41MzZoUjNkMTAzOC4zMzZSNGQ5ODIuMDE2UjVkNTcuMzQ0UjZkNzQ3LjUyUjdkLTE1Ni42NzJSOGQ2OTAuMTc2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNjRSMTJkNTcuMzQ0UjEzZDEwMzguMzM2UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzoxNzZvUjFkOTU4LjQ2NFIyYWQ0MC45NmQ0MzAuMDhkNDAuOTZkMzk4LjMzNmQ1Mi43MzZkMzcxLjE5OWQ2NC41MTJkMzQ0LjA2M2Q4NC45OTJkMzI0LjA5NmQxMDUuNDcyZDMwNC4xMjdkMTMyLjYwOGQyOTIuMzUyZDE1OS43NDRkMjgwLjU3NmQxOTAuNDY0ZDI4MC41NzZkMjIxLjE4NGQyODAuNTc2ZDI0OC44MzJkMjkyLjM1MmQyNzYuNDhkMzA0LjEyN2QyOTYuOTZkMzI0LjA5NmQzMTcuNDRkMzQ0LjA2M2QzMjkuMjE2ZDM3MS4xOTlkMzQwLjk5MmQzOTguMzM2ZDM0MC45OTJkNDMwLjA4ZDM0MC45OTJkNDYwLjc5OWQzMjkuMjE2ZDQ4Ny45MzZkMzE3LjQ0ZDUxNS4wNzJkMjk2Ljk2ZDUzNS4wNGQyNzYuNDhkNTU1LjAwOGQyNDguODMyZDU2Ni43ODRkMjIxLjE4NGQ1NzguNTZkMTkwLjQ2NGQ1NzguNTZkMTU5Ljc0NGQ1NzguNTZkMTMyLjYwOGQ1NjYuNzg0ZDEwNS40NzJkNTU1LjAwOGQ4NC45OTJkNTM1LjA0ZDY0LjUxMmQ1MTUuMDcyZDUyLjczNmQ0ODcuOTM2ZDQwLjk2ZDQ2MC43OTlkNDAuOTZkNDMwLjA4ZDExNC42ODhkNDMwLjA4ZDExNC42ODhkNDY0Ljg5NWQxMzYuMTkyZDQ4Ny40MjRkMTU3LjY5NmQ1MDkuOTUyZDE5MC40NjRkNTA5Ljk1MmQyMjMuMjMyZDUwOS45NTJkMjQ1Ljc2ZDQ4Ny40MjRkMjY4LjI4OGQ0NjQuODk1ZDI2OC4yODhkNDMwLjA4ZDI2OC4yODhkMzk1LjI2NGQyNDUuNzZkMzcyLjIyM2QyMjMuMjMyZDM0OS4xODNkMTkwLjQ2NGQzNDkuMTgzZDE1Ny42OTZkMzQ5LjE4M2QxMzYuMTkyZDM3Mi4yMjNkMTE0LjY4OGQzOTUuMjY0ZDExNC42ODhkNDMwLjA4aFIzZDM3OC44OFI0ZDM0MC45OTJSNWQ0MC45NlI2ZDc0My40MjRSN2Q0NDUuNDRSOGQ3MDIuNDY0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTc2UjEyZDQwLjk2UjEzZDM3OC44OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6NjNvUjFkOTU4LjQ2NFIyYWQxODYuMzY4ZDYzOC45NzZkMjI1LjI4ZDYyOC43MzZkMjU2ZDYxNS45MzVkMjg2LjcyZDYwMy4xMzZkMzA4LjIyNGQ1ODUuMjE2ZDMyOS43MjhkNTY3LjI5NmQzNDAuOTkyZDU0My43NDNkMzUyLjI1NmQ1MjAuMTkyZDM1Mi4yNTZkNDg3LjQyNGQzNTIuMjU2ZDQzNS4xOTlkMzEzLjM0NGQ0MDUuNTA0ZDI3NC40MzJkMzc1LjgwOGQyMDEuNzI4ZDM3NS44MDhkMTU1LjY0OGQzNzUuODA4ZDEyNy40ODhkMzgyLjQ2M2Q5OS4zMjhkMzg5LjEyZDY5LjYzMmQ0MDAuMzg0ZDYwLjQxNmQzODAuOTI4ZDUzLjc2ZDM1OS45MzZkNDcuMTA0ZDMzOC45NDNkNDQuMDMyZDMxNS4zOTFkNjguNjA4ZDMwNy4xOTlkODkuNmQzMDEuNTY4ZDExMC41OTJkMjk1LjkzNmQxMzAuNTZkMjkyLjg2NGQxNTAuNTI4ZDI4OS43OTJkMTcxLjAwOGQyODguMjU2ZDE5MS40ODhkMjg2LjcyZDIxNS4wNGQyODYuNzJkMzM1Ljg3MmQyODYuNzJkMzk3LjgyNGQzNDEuNTA0ZDQ1OS43NzZkMzk2LjI4OGQ0NTkuNzc2ZDQ4Ni40ZDQ1OS43NzZkNTM4LjYyNGQ0MzguNzg0ZDU3NmQ0MTcuNzkyZDYxMy4zNzZkMzg5LjYzMmQ2MzguNDY0ZDM2MS40NzJkNjYzLjU1MmQzMzEuNzc2ZDY3OC40ZDMwMi4wOGQ2OTMuMjQ4ZDI4My42NDhkNjk5LjM5MmQyODMuNjQ4ZDgwNC44NjRkMjYwLjA5NmQ4MDguOTZkMjMzLjQ3MmQ4MDguOTZkMjIyLjIwOGQ4MDguOTZkMjA5LjkyZDgwNy45MzZkMTk3LjYzMmQ4MDYuOTEyZDE4Ni4zNjhkODA0Ljg2NGQxODYuMzY4ZDYzOC45NzZkMTc3LjE1MmQxMDIyLjk3NmQxNzUuMTA0ZDEwMDguNjRkMTc0LjA4ZDk5NC44MTZkMTczLjA1NmQ5ODAuOTkyZDE3My4wNTZkOTY2LjY1NmQxNzMuMDU2ZDk1Mi4zMTlkMTc0LjA4ZDkzNy45ODRkMTc1LjEwNGQ5MjMuNjQ4ZDE3Ny4xNTJkOTA5LjMxMmQxOTEuNDg4ZDkwNy4yNjRkMjA1LjgyNGQ5MDUuNzI4ZDIyMC4xNmQ5MDQuMTkyZDIzNC40OTZkOTA0LjE5MmQyNDguODMyZDkwNC4xOTJkMjYzLjE2OGQ5MDUuNzI4ZDI3Ny41MDRkOTA3LjI2NGQyOTEuODRkOTA5LjMxMmQyOTMuODg4ZDkyMy42NDhkMjk0LjkxMmQ5MzcuNDcyZDI5NS45MzZkOTUxLjI5NmQyOTUuOTM2ZDk2NS42MzJkMjk1LjkzNmQ5NzkuOTY4ZDI5NC45MTJkOTk0LjMwNGQyOTMuODg4ZDEwMDguNjRkMjkxLjg0ZDEwMjIuOTc2ZDI3OC41MjhkMTAyNS4wMjNkMjY0LjE5MmQxMDI2LjA0OGQyNDkuODU2ZDEwMjcuMDcxZDIzNS41MmQxMDI3LjA3MWQyMjEuMTg0ZDEwMjcuMDcxZDIwNC44ZDEwMjYuMDQ4ZDE4OC40MTZkMTAyNS4wMjNkMTc3LjE1MmQxMDIyLjk3NmhSM2Q0OTkuNzEyUjRkNDU5Ljc3NlI1ZDQ0LjAzMlI2ZDczNy4yOFI3ZC0zLjA3MlI4ZDY5My4yNDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk2M1IxMmQ0NC4wMzJSMTNkNDk5LjcxMlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3NW9SMWQ5NTguNDY0UjJhZDM5NC4yNGQzMTMuMzQzZDM5Ni4yODhkMzIxLjUzNWQzOTcuMzEyZDMzMS43NzVkMzk4LjMzNmQzNDIuMDE1ZDM5OC4zMzZkMzUxLjIzMmQzOTguMzM2ZDM2MC40NDhkMzk3LjMxMmQzNzAuNjg4ZDM5Ni4yODhkMzgwLjkyOGQzOTQuMjRkMzg5LjEyZDExNy43NmQzODkuMTJkMTE1LjcxMmQzODAuOTI4ZDExNC42ODhkMzcwLjY4OGQxMTMuNjY0ZDM2MC40NDhkMTEzLjY2NGQzNTEuMjMyZDExMy42NjRkMzQzLjAzOWQxMTQuNjg4ZDMzMi4yODhkMTE1LjcxMmQzMjEuNTM1ZDExNy43NmQzMTMuMzQzZDM5NC4yNGQzMTMuMzQzaFIzZDUxMlI0ZDM5OC4zMzZSNWQxMTMuNjY0UjZkNzEwLjY1NlI3ZDYzNC44OFI4ZDU5Ni45OTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNzVSMTJkMTEzLjY2NFIxM2Q1MTJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjYyb1IxZDk1OC40NjRSMmFkOTEuMTM2ZDg5OS4wNzJkODkuMDg4ZDg4NC43MzZkODguMDY0ZDg3Mi45NmQ4Ny4wNGQ4NjEuMTg0ZDg3LjA0ZDg1MS45NjhkODcuMDRkODM3LjYzMmQ4OC4wNjRkODI0LjgzMmQ4OS4wODhkODEyLjAzMWQ5MS4xMzZkODAxLjc5MmQ0MjUuOTg0ZDY3MS43NDNkOTEuMTM2ZDU0Ni44MTZkODguMDY0ZDUzNS41NTFkODcuMDRkNTIyLjc1MWQ4Ni4wMTZkNTA5Ljk1MmQ4Ni4wMTZkNDk4LjY4OGQ4Ni4wMTZkNDgyLjMwNGQ4Ny41NTJkNDY4Ljk5MWQ4OS4wODhkNDU1LjY3OWQ5MS4xMzZkNDQ0LjQxNWQ1MTguMTQ0ZDYxNy40NzJkNTIwLjE5MmQ2MzAuNzg0ZDUyMi4yNGQ2NDQuMDk2ZDUyNC4yODhkNjU3LjQwOGQ1MjQuMjg4ZDY3My43OTFkNTI0LjI4OGQ3MDEuNDRkNTE4LjE0NGQ3MjYuMDE2ZDkxLjEzNmQ4OTkuMDcyaFIzZDYxNC40UjRkNTI0LjI4OFI1ZDg2LjAxNlI2ZDU3OS41ODRSN2QxMjQuOTI4UjhkNDkzLjU2OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTYyUjEyZDg2LjAxNlIxM2Q2MTQuNFIxNGFpMWkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpM2kzaTNpMmhnOjE3NG9SMWQ5NTguNDY0UjJhZDMwNi4xNzZkNDUyLjYwN2QzMzIuOGQ0NDkuNTM1ZDM1Ny44ODhkNDQ3LjQ4N2QzODIuOTc2ZDQ0NS40MzlkNDEyLjY3MmQ0NDUuNDM5ZDQ0OS41MzZkNDQ1LjQzOWQ0ODAuMjU2ZDQ1Mi42MDdkNTEwLjk3NmQ0NTkuNzc1ZDUzMi45OTJkNDc0LjExMWQ1NTUuMDA4ZDQ4OC40NDhkNTY3LjgwOGQ1MTJkNTgwLjYwOGQ1MzUuNTUxZDU4MC42MDhkNTY3LjI5NmQ1ODAuNjA4ZDYxMy4zNzZkNTU4LjA4ZDY0MS41MzZkNTM1LjU1MmQ2NjkuNjk1ZDUwOC45MjhkNjgzLjAwOGQ2MTYuNDQ4ZDg0NS44MjRkNjAyLjExMmQ4NDcuODcyZDU5MC4zMzZkODQ4LjM4NGQ1NzguNTZkODQ4Ljg5NmQ1NjcuMjk2ZDg0OC44OTZkNTQ1Ljc5MmQ4NDguODk2ZDUyNy4zNmQ4NDUuODI0ZDQxMC42MjRkNjYzLjU1MmQ0MzEuMTA0ZDY1NC4zMzZkNDU1LjY4ZDY0My4wNzJkNDc3LjY5NmQ2MjQuMTI3ZDQ5OS43MTJkNjA1LjE4NGQ0OTkuNzEyZDU3NS40ODhkNDk5LjcxMmQ1NDUuNzkxZDQ3OC4yMDhkNTI5LjQwOGQ0NTYuNzA0ZDUxMy4wMjRkNDIxLjg4OGQ1MTMuMDI0ZDQxMy42OTZkNTEzLjAyNGQ0MDQuNDhkNTEzLjUzNmQzOTUuMjY0ZDUxNC4wNDhkMzg0ZDUxNi4wOTZkMzg0ZDg0Ni44NDhkMzY4LjY0ZDg0OS45MmQzNDYuMTEyZDg0OS45MmQzMjQuNjA4ZDg0OS45MmQzMDYuMTc2ZDg0Ni44NDhkMzA2LjE3NmQ0NTIuNjA3ZDQzMi4xMjhkOTcwLjc1MmQ1MDMuODA4ZDk3MC43NTJkNTYwLjEyOGQ5NDYuMTc2ZDYxNi40NDhkOTIxLjZkNjU1Ljg3MmQ4NzkuNjE2ZDY5NS4yOTZkODM3LjYzMmQ3MTYuMjg4ZDc4MC4yODhkNzM3LjI4ZDcyMi45NDRkNzM3LjI4ZDY1Ni4zODRkNzM3LjI4ZDU5MC44NDhkNzE2LjI4OGQ1MzMuNTAzZDY5NS4yOTZkNDc2LjE1OWQ2NTUuODcyZDQzNC4xNzVkNjE2LjQ0OGQzOTIuMTkyZDU2MC4xMjhkMzY3LjYxNmQ1MDMuODA4ZDM0My4wMzlkNDMyLjEyOGQzNDMuMDM5ZDM2MS40NzJkMzQzLjAzOWQzMDQuNjRkMzY3LjYxNmQyNDcuODA4ZDM5Mi4xOTJkMjA4Ljg5NmQ0MzQuMTc1ZDE2OS45ODRkNDc2LjE1OWQxNDguOTkyZDUzMy41MDNkMTI4ZDU5MC44NDhkMTI4ZDY1Ni4zODRkMTI4ZDcyMi45NDRkMTQ4Ljk5MmQ3ODAuMjg4ZDE2OS45ODRkODM3LjYzMmQyMDguODk2ZDg3OS42MTZkMjQ3LjgwOGQ5MjEuNmQzMDQuNjRkOTQ2LjE3NmQzNjEuNDcyZDk3MC43NTJkNDMyLjEyOGQ5NzAuNzUyZDQzMi4xMjhkMTAzNy4zMTFkMzQ3LjEzNmQxMDM3LjMxMWQyNzYuOTkyZDEwMDguMTI4ZDIwNi44NDhkOTc4Ljk0NGQxNTcuMTg0ZDkyOC4yNTZkMTA3LjUyZDg3Ny41NjhkNzkuODcyZDgwNy45MzZkNTIuMjI0ZDczOC4zMDRkNTIuMjI0ZDY1Ni4zODRkNTIuMjI0ZDU3NS40ODhkNzkuODcyZDUwNS4zNDNkMTA3LjUyZDQzNS4xOTlkMTU3LjE4NGQzODQuNTExZDIwNi44NDhkMzMzLjgyM2QyNzYuOTkyZDMwNC42NGQzNDcuMTM2ZDI3NS40NTZkNDMyLjEyOGQyNzUuNDU2ZDUxNy4xMmQyNzUuNDU2ZDU4Ny4yNjRkMzA0LjEyN2Q2NTcuNDA4ZDMzMi43OTlkNzA3LjA3MmQzODRkNzU2LjczNmQ0MzUuMTk5ZDc4NC4zODRkNTA0LjgzMmQ4MTIuMDMyZDU3NC40NjRkODEyLjAzMmQ2NTYuMzg0ZDgxMi4wMzJkNzM4LjMwNGQ3ODQuMzg0ZDgwNy45MzZkNzU2LjczNmQ4NzcuNTY4ZDcwNy4wNzJkOTI4LjI1NmQ2NTcuNDA4ZDk3OC45NDRkNTg3LjI2NGQxMDA4LjEyOGQ1MTcuMTJkMTAzNy4zMTFkNDMyLjEyOGQxMDM3LjMxMWhSM2Q4NjYuMzA0UjRkODEyLjAzMlI1ZDUyLjIyNFI2ZDc0OC41NDRSN2QtMTMuMzEyUjhkNjk2LjMyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTc0UjEyZDUyLjIyNFIxM2Q4NjYuMzA0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo2MW9SMWQ5NTguNDY0UjJhZDUyNC4yODhkNTIzLjI2NGQ1MjYuMzM2ZDUzMy41MDNkNTI3LjM2ZDU0Ni4zMDRkNTI4LjM4NGQ1NTkuMTA0ZDUyOC4zODRkNTcwLjM2N2Q1MjguMzg0ZDU4MS42MzJkNTI3LjM2ZDU5NC40MzJkNTI2LjMzNmQ2MDcuMjMyZDUyNC4yODhkNjE2LjQ0OGQ5MC4xMTJkNjE2LjQ0OGQ4OC4wNjRkNjA3LjIzMmQ4Ny41NTJkNTk0LjQzMmQ4Ny4wNGQ1ODEuNjMyZDg3LjA0ZDU3MC4zNjdkODcuMDRkNTU5LjEwNGQ4Ny41NTJkNTQ2LjMwNGQ4OC4wNjRkNTMzLjUwM2Q5MC4xMTJkNTIzLjI2NGQ1MjQuMjg4ZDUyMy4yNjRkNTI0LjI4OGQ0NTYuNzAzZDUyNi4zMzZkNDY2Ljk0M2Q1MjcuMzZkNDc5Ljc0NGQ1MjguMzg0ZDQ5Mi41NDRkNTI4LjM4NGQ1MDMuODA4ZDUyOC4zODRkNTE1LjA3MmQ1MjcuMzZkNTI3Ljg3MmQ1MjYuMzM2ZDU0MC42NzJkNTI0LjI4OGQ1NDkuODg3ZDkwLjExMmQ1NDkuODg3ZDg4LjA2NGQ1NDAuNjcyZDg3LjU1MmQ1MjcuODcyZDg3LjA0ZDUxNS4wNzJkODcuMDRkNTAzLjgwOGQ4Ny4wNGQ0OTIuNTQ0ZDg3LjU1MmQ0NzkuNzQ0ZDg4LjA2NGQ0NjYuOTQzZDkwLjExMmQ0NTYuNzAzZDUyNC4yODhkNDU2LjcwM2hSM2Q2MTQuNFI0ZDUyOC4zODRSNWQ4Ny4wNFI2ZDUwMC43MzZSN2QyMTEuOTY4UjhkNDEzLjY5NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTYxUjEyZDg3LjA0UjEzZDYxNC40UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaGc6MTczb1IxZDk1OC40NjRSMmFkMzE3LjQ0ZDY5MC4xNzVkMzE5LjQ4OGQ3MDAuNDE1ZDMyMC41MTJkNzEzLjIxNmQzMjEuNTM2ZDcyNi4wMTZkMzIxLjUzNmQ3MzcuMjhkMzIxLjUzNmQ3NDguNTQ0ZDMyMC41MTJkNzYxLjM0NGQzMTkuNDg4ZDc3NC4xNDRkMzE3LjQ0ZDc4My4zNmQ1Mi4yMjRkNzgzLjM2ZDUwLjE3NmQ3NzQuMTQ0ZDQ5LjE1MmQ3NjEuMzQ0ZDQ4LjEyOGQ3NDguNTQ0ZDQ4LjEyOGQ3MzcuMjhkNDguMTI4ZDcyNi4wMTZkNDkuMTUyZDcxMy4yMTZkNTAuMTc2ZDcwMC40MTVkNTIuMjI0ZDY5MC4xNzVkMzE3LjQ0ZDY5MC4xNzVoUjNkMzY5LjY2NFI0ZDMyMS41MzZSNWQ0OC4xMjhSNmQzMzMuODI0UjdkMjQwLjY0UjhkMjg1LjY5NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE3M1IxMmQ0OC4xMjhSMTNkMzY5LjY2NFIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaGc6NjBvUjFkOTU4LjQ2NFIyYWQ1MjMuMjY0ZDQ0NC40MTVkNTI4LjM4NGQ0NzMuMDg3ZDUyOC4zODRkNDkxLjUyZDUyOC4zODRkNTA1Ljg1NmQ1MjcuMzZkNTE4LjY1NWQ1MjYuMzM2ZDUzMS40NTZkNTI0LjI4OGQ1NDEuNjk1ZDE4OC40MTZkNjcxLjc0M2Q1MjQuMjg4ZDc5Ni42NzJkNTI2LjMzNmQ4MDcuOTM2ZDUyNy4zNmQ4MjAuMjIzZDUyOC4zODRkODMyLjUxMmQ1MjguMzg0ZDg0NC44ZDUyOC4zODRkODYwLjE2ZDUyNy4zNmQ4NzMuNDcyZDUyNi4zMzZkODg2Ljc4NGQ1MjMuMjY0ZDg5OS4wNzJkOTcuMjhkNzI2LjAxNmQ5MS4xMzZkNzAwLjQxNWQ5MS4xMzZkNjY5LjY5NWQ5MS4xMzZkNjQyLjA0OGQ5Ny4yOGQ2MTcuNDcyZDUyMy4yNjRkNDQ0LjQxNWhSM2Q2MTQuNFI0ZDUyOC4zODRSNWQ5MS4xMzZSNmQ1NzkuNTg0UjdkMTI0LjkyOFI4ZDQ4OC40NDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk2MFIxMmQ5MS4xMzZSMTNkNjE0LjRSMTRhaTFpM2kzaTNpMmkyaTNpM2kzaTNpMmkzaTNpMmhnOjE3Mm9SMWQ5NTguNDY0UjJhZDUyMC4xOTJkNjI4LjczNmQ1MjAuMTkyZDkxNC40MzJkNTEwLjk3NmQ5MTYuNDhkNDk4LjE3NmQ5MTcuNTA0ZDQ4NS4zNzZkOTE4LjUyOGQ0NzQuMTEyZDkxOC41MjhkNDYyLjg0OGQ5MTguNTI4ZDQ0OS41MzZkOTE3LjUwNGQ0MzYuMjI0ZDkxNi40OGQ0MjUuOTg0ZDkxNC40MzJkNDI1Ljk4NGQ3MjIuOTQ0ZDkzLjE4NGQ3MjIuOTQ0ZDkxLjEzNmQ3MTMuNzI4ZDkwLjExMmQ3MDAuOTI4ZDg5LjA4OGQ2ODguMTI3ZDg5LjA4OGQ2NzYuODY0ZDg5LjA4OGQ2NjUuNTk5ZDkwLjExMmQ2NTIuMjg4ZDkxLjEzNmQ2MzguOTc2ZDkzLjE4NGQ2MjguNzM2ZDUyMC4xOTJkNjI4LjczNmhSM2Q2MTQuNFI0ZDUyMC4xOTJSNWQ4OS4wODhSNmQzOTUuMjY0UjdkMTA1LjQ3MlI4ZDMwNi4xNzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNzJSMTJkODkuMDg4UjEzZDYxNC40UjE0YWkxaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaGc6NTlvUjFkOTU4LjQ2NFIyYWQ5MC4xMTJkOTExLjM2ZDEwMi40ZDkwOS4zMTJkMTE1LjJkOTA3Ljc3NmQxMjhkOTA2LjI0ZDEzOS4yNjRkOTA2LjI0ZDE2Mi44MTZkOTA2LjI0ZDE5MS40ODhkOTExLjM2ZDEyNi45NzZkMTEzOS43MTJkMTE0LjY4OGQxMTQxLjc2ZDEwMS44ODhkMTE0Mi4yNzJkODkuMDg4ZDExNDIuNzg0ZDc3LjgyNGQxMTQyLjc4NGQ2NS41MzZkMTE0Mi43ODRkNTMuMjQ4ZDExNDIuMjcyZDQwLjk2ZDExNDEuNzZkMjkuNjk2ZDExMzkuNzEyZDkwLjExMmQ5MTEuMzZkODQuOTkyZDYxMS4zMjhkODIuOTQ0ZDU5Ni45OTJkODEuNDA4ZDU4My4xNjhkNzkuODcyZDU2OS4zNDRkNzkuODcyZDU1NS4wMDhkNzkuODcyZDU0MC42NzJkODEuNDA4ZDUyNS44MjRkODIuOTQ0ZDUxMC45NzZkODQuOTkyZDQ5Ni42NGQ5OS4zMjhkNDk0LjU5MmQxMTMuMTUyZDQ5My41NjhkMTI2Ljk3NmQ0OTIuNTQ0ZDE0MS4zMTJkNDkyLjU0NGQxNTUuNjQ4ZDQ5Mi41NDRkMTY5Ljk4NGQ0OTMuNTY4ZDE4NC4zMmQ0OTQuNTkyZDE5OC42NTZkNDk2LjY0ZDIwMC43MDRkNTEwLjk3NmQyMDIuMjRkNTI1LjMxMmQyMDMuNzc2ZDUzOS42NDdkMjAzLjc3NmQ1NTMuOTgzZDIwMy43NzZkNTY4LjMxOWQyMDIuMjRkNTgyLjY1NmQyMDAuNzA0ZDU5Ni45OTJkMTk4LjY1NmQ2MTEuMzI4ZDE4NC4zMmQ2MTMuMzc2ZDE3MC40OTZkNjE0LjRkMTU2LjY3MmQ2MTUuNDI0ZDE0Mi4zMzZkNjE1LjQyNGQxMjhkNjE1LjQyNGQxMTMuNjY0ZDYxNC40ZDk5LjMyOGQ2MTMuMzc2ZDg0Ljk5MmQ2MTEuMzI4aFIzZDI2Ni4yNFI0ZDIwMy43NzZSNWQyOS42OTZSNmQ1MzEuNDU2UjdkLTExOC43ODRSOGQ1MDEuNzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk1OVIxMmQyOS42OTZSMTNkMjY2LjI0UjE0YWkxaTNpM2kzaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3MW9SMWQ5NTguNDY0UjJhZDMwOC4yMjRkNzUwLjU5MmQ0NzguMjA4ZDUyNC4yODhkNDkwLjQ5NmQ1MjIuMjRkNTAzLjI5NmQ1MjEuMjE2ZDUxNi4wOTZkNTIwLjE5MmQ1MjkuNDA4ZDUyMC4xOTJkNTQzLjc0NGQ1MjAuMTkyZDU1OC4wOGQ1MjEuMjE2ZDU3Mi40MTZkNTIyLjI0ZDU4Ni43NTJkNTI0LjI4OGQ0MTkuODRkNzQ5LjU2OGQ1ODYuNzUyZDk3Ny45MmQ1NzIuNDE2ZDk3OS45NjhkNTU4LjU5MmQ5ODAuOTkyZDU0NC43NjhkOTgyLjAxNmQ1MzAuNDMyZDk4Mi4wMTZkNTAxLjc2ZDk4Mi4wMTZkNDc4LjIwOGQ5NzcuOTJkMzA4LjIyNGQ3NTAuNTkyZDUwLjE3NmQ3NTAuNTkyZDIyMC4xNmQ1MjQuMjg4ZDIzMi40NDhkNTIyLjI0ZDI0NS4yNDhkNTIxLjIxNmQyNTguMDQ4ZDUyMC4xOTJkMjcxLjM2ZDUyMC4xOTJkMjg1LjY5NmQ1MjAuMTkyZDMwMC4wMzJkNTIxLjIxNmQzMTQuMzY4ZDUyMi4yNGQzMjguNzA0ZDUyNC4yODhkMTYxLjc5MmQ3NDkuNTY4ZDMyOC43MDRkOTc3LjkyZDMxNC4zNjhkOTc5Ljk2OGQzMDAuNTQ0ZDk4MC45OTJkMjg2LjcyZDk4Mi4wMTZkMjcyLjM4NGQ5ODIuMDE2ZDI0My43MTJkOTgyLjAxNmQyMjAuMTZkOTc3LjkyZDUwLjE3NmQ3NTAuNTkyaFIzZDYzMi44MzJSNGQ1ODYuNzUyUjVkNTAuMTc2UjZkNTAzLjgwOFI3ZDQxLjk4NFI4ZDQ1My42MzJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNzFSMTJkNTAuMTc2UjEzZDYzMi44MzJSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kyaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kyaGc6NThvUjFkOTU4LjQ2NFIyYWQ2Ni41NmQ2MTEuMzI4ZDY0LjUxMmQ1OTYuOTkyZDYyLjk3NmQ1ODMuMTY4ZDYxLjQ0ZDU2OS4zNDRkNjEuNDRkNTU1LjAwOGQ2MS40NGQ1NDAuNjcyZDYyLjk3NmQ1MjUuODI0ZDY0LjUxMmQ1MTAuOTc2ZDY2LjU2ZDQ5Ni42NGQ4MC44OTZkNDk0LjU5MmQ5NC43MmQ0OTMuNTY4ZDEwOC41NDRkNDkyLjU0NGQxMjIuODhkNDkyLjU0NGQxMzcuMjE2ZDQ5Mi41NDRkMTUxLjU1MmQ0OTMuNTY4ZDE2NS44ODhkNDk0LjU5MmQxODAuMjI0ZDQ5Ni42NGQxODIuMjcyZDUxMC45NzZkMTgzLjgwOGQ1MjUuMzEyZDE4NS4zNDRkNTM5LjY0N2QxODUuMzQ0ZDU1My45ODNkMTg1LjM0NGQ1NjguMzE5ZDE4My44MDhkNTgyLjY1NmQxODIuMjcyZDU5Ni45OTJkMTgwLjIyNGQ2MTEuMzI4ZDE2NS44ODhkNjEzLjM3NmQxNTIuMDY0ZDYxNC40ZDEzOC4yNGQ2MTUuNDI0ZDEyMy45MDRkNjE1LjQyNGQxMDkuNTY4ZDYxNS40MjRkOTUuMjMyZDYxNC40ZDgwLjg5NmQ2MTMuMzc2ZDY2LjU2ZDYxMS4zMjhkNjYuNTZkMTAyNGQ2NC41MTJkMTAwOS42NjRkNjIuOTc2ZDk5NS44NGQ2MS40NGQ5ODIuMDE2ZDYxLjQ0ZDk2Ny42OGQ2MS40NGQ5NTMuMzQ0ZDYyLjk3NmQ5MzguNDk2ZDY0LjUxMmQ5MjMuNjQ4ZDY2LjU2ZDkwOS4zMTJkODAuODk2ZDkwNy4yNjRkOTQuNzJkOTA2LjI0ZDEwOC41NDRkOTA1LjIxNmQxMjIuODhkOTA1LjIxNmQxMzcuMjE2ZDkwNS4yMTZkMTUxLjU1MmQ5MDYuMjRkMTY1Ljg4OGQ5MDcuMjY0ZDE4MC4yMjRkOTA5LjMxMmQxODIuMjcyZDkyMy42NDhkMTgzLjgwOGQ5MzcuOTg0ZDE4NS4zNDRkOTUyLjMxOWQxODUuMzQ0ZDk2Ni42NTZkMTg1LjM0NGQ5ODAuOTkyZDE4My44MDhkOTk1LjMyOGQxODIuMjcyZDEwMDkuNjY0ZDE4MC4yMjRkMTAyNGQxNjUuODg4ZDEwMjYuMDQ4ZDE1Mi4wNjRkMTAyNy4wNzFkMTM4LjI0ZDEwMjguMDk2ZDEyMy45MDRkMTAyOC4wOTZkMTA5LjU2OGQxMDI4LjA5NmQ5NS4yMzJkMTAyNy4wNzFkODAuODk2ZDEwMjYuMDQ4ZDY2LjU2ZDEwMjRoUjNkMjQ2Ljc4NFI0ZDE4NS4zNDRSNWQ2MS40NFI2ZDUzMS40NTZSN2QtNC4wOTZSOGQ0NzAuMDE2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNThSMTJkNjEuNDRSMTNkMjQ2Ljc4NFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3MG9SMWQ5NTguNDY0UjJhZDMxNC4zNjhkNTIwLjE5MmQzMDMuMTA0ZDUxOC4xNDRkMjg2LjcyZDUxNy4xMmQyNzAuMzM2ZDUxNi4wOTZkMjU2ZDUxNi4wOTZkMjAzLjc3NmQ1MTYuMDk2ZDE3NC41OTJkNTMzLjUwM2QxNDUuNDA4ZDU1MC45MTJkMTQ1LjQwOGQ1ODYuNzUyZDE0NS40MDhkNjA4LjI1NmQxNTUuMTM2ZDYyMS4wNTZkMTY0Ljg2NGQ2MzMuODU2ZDE3OS4yZDY0MC41MTJkMTkzLjUzNmQ2NDcuMTY4ZDIxMC45NDRkNjQ5LjIxNmQyMjguMzUyZDY1MS4yNjRkMjQzLjcxMmQ2NTEuMjY0ZDI4MS42ZDY1MS4yNjRkMzE0LjM2OGQ2NDUuMTJkMzE0LjM2OGQ1MjAuMTkyZDMxNC4zNjhkNDQwLjMxOWQzMTQuMzY4ZDM5NS4yNjRkMjg5Ljc5MmQzNzguMzY3ZDI2NS4yMTZkMzYxLjQ3MmQyMTcuMDg4ZDM2MS40NzJkMTkwLjQ2NGQzNjEuNDcyZDE2NC44NjRkMzY1LjU2OGQxMzkuMjY0ZDM2OS42NjRkMTE1LjcxMmQzNzYuODMyZDEwNy41MmQzNjIuNDk2ZDEwMi45MTJkMzQ0LjA2M2Q5OC4zMDRkMzI1LjYzMWQ5OC4zMDRkMzA4LjIyM2QxMjUuOTUyZDMwMC4wMzJkMTYwLjc2OGQyOTQuOTEyZDE5NS41ODRkMjg5Ljc5MmQyMjguMzUyZDI4OS43OTJkMzEyLjMyZDI4OS43OTJkMzU1Ljg0ZDMyNi42NTVkMzk5LjM2ZDM2My41MmQzOTkuMzZkNDQzLjM5MWQzOTkuMzZkNjk5LjM5MmQzNzAuNjg4ZDcwNi41NmQzMjcuNjhkNzEzLjIxNmQyODQuNjcyZDcxOS44NzJkMjQxLjY2NGQ3MTkuODcyZDE1NC42MjRkNzE5Ljg3MmQxMDkuMDU2ZDY4OS4xNTJkNjMuNDg4ZDY1OC40MzJkNjMuNDg4ZDU4Ny43NzZkNjMuNDg4ZDU1MS45MzVkNzguMzM2ZDUyNS44MjRkOTMuMTg0ZDQ5OS43MTJkMTE3Ljc2ZDQ4Mi44MTZkMTQyLjMzNmQ0NjUuOTE5ZDE3NS4xMDRkNDU3LjcyN2QyMDcuODcyZDQ0OS41MzVkMjQ0LjczNmQ0NDkuNTM1ZDI2NS4yMTZkNDQ5LjUzNWQyODIuNjI0ZDQ1MC41NTlkMzAwLjAzMmQ0NTEuNTgzZDMxNC4zNjhkNDUzLjYzMWQzMTQuMzY4ZDQ0MC4zMTloUjNkNTEyUjRkMzk5LjM2UjVkNjMuNDg4UjZkNzM0LjIwOFI3ZDMwNC4xMjhSOGQ2NzAuNzJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNzBSMTJkNjMuNDg4UjEzZDUxMlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjU3b1IxZDk1OC40NjRSMmFkNTUyLjk2ZDY1MS4yNjRkNTUyLjk2ZDc0MS4zNzZkNTI5LjkyZDgyMS4yNDhkNTA2Ljg4ZDkwMS4xMmQ0NTkuMjY0ZDk2My41ODRkNDExLjY0OGQxMDI2LjA0OGQzMzcuOTJkMTA2NS40NzJkMjY0LjE5MmQxMTA0Ljg5NmQxNjIuODE2ZDExMTMuMDg4ZDE1NC42MjRkMTA5My42MzJkMTU0LjYyNGQxMDY0Ljk2ZDE1NC42MjRkMTA1Ni43NjhkMTU1LjY0OGQxMDQ2LjAxNmQxNTYuNjcyZDEwMzUuMjYzZDE1OC43MmQxMDI2LjA0OGQyMjEuMTg0ZDEwMjAuOTI4ZDI3MS44NzJkOTk2Ljg2NGQzMjIuNTZkOTcyLjhkMzU5LjQyNGQ5MzQuOTEyZDM5Ni4yODhkODk3LjAyNGQ0MTguMzA0ZDg0Ny4zNmQ0NDAuMzJkNzk3LjY5NmQ0NDYuNDY0ZDc0MS4zNzZkNDI0Ljk2ZDc4MC4yODhkMzgxLjQ0ZDgwOC45NmQzMzcuOTJkODM3LjYzMmQyNzIuMzg0ZDgzNy42MzJkMjMwLjRkODM3LjYzMmQxOTEuNDg4ZDgyMy44MDhkMTUyLjU3NmQ4MDkuOTg0ZDEyMS44NTZkNzgxLjMxMmQ5MS4xMzZkNzUyLjY0ZDcyLjcwNGQ3MDguMDk2ZDU0LjI3MmQ2NjMuNTUyZDU0LjI3MmQ2MDIuMTEyZDU0LjI3MmQ1NDEuNjk1ZDc1LjI2NGQ0OTUuNjE2ZDk2LjI1NmQ0NDkuNTM1ZDEzMS4wNzJkNDE4LjMwNGQxNjUuODg4ZDM4Ny4wNzJkMjEwLjQzMmQzNzEuMTk5ZDI1NC45NzZkMzU1LjMyOGQzMDIuMDhkMzU1LjMyOGQzNjAuNDQ4ZDM1NS4zMjhkNDA3LjA0ZDM3Mi4yMjNkNDUzLjYzMmQzODkuMTJkNDg1Ljg4OGQ0MjQuOTZkNTE4LjE0NGQ0NjAuNzk5ZDUzNS41NTJkNTE3LjEyZDU1Mi45NmQ1NzMuNDRkNTUyLjk2ZDY1MS4yNjRkMjk3Ljk4NGQ3NTAuNTkyZDMyNy42OGQ3NTAuNTkyZDM1NC4zMDRkNzQwLjM1MmQzODAuOTI4ZDczMC4xMTJkNDAwLjM4NGQ3MTAuMTQ0ZDQxOS44NGQ2OTAuMTc1ZDQzMS4xMDRkNjYxLjUwNGQ0NDIuMzY4ZDYzMi44MzJkNDQyLjM2OGQ1OTYuOTkyZDQ0Mi4zNjhkNTIwLjE5MmQ0MDYuMDE2ZDQ4MS43OTJkMzY5LjY2NGQ0NDMuMzkxZDMwNS4xNTJkNDQzLjM5MWQyNDMuNzEyZDQ0My4zOTFkMjAyLjI0ZDQ4Mi44MTZkMTYwLjc2OGQ1MjIuMjRkMTYwLjc2OGQ1OTkuMDRkMTYwLjc2OGQ2NDBkMTcxLjUyZDY2OC42NzJkMTgyLjI3MmQ2OTcuMzQ0ZDIwMC43MDRkNzE1Ljc3NmQyMTkuMTM2ZDczNC4yMDhkMjQ0LjIyNGQ3NDIuNGQyNjkuMzEyZDc1MC41OTJkMjk3Ljk4NGQ3NTAuNTkyaFIzZDYxNC40UjRkNTUyLjk2UjVkNTQuMjcyUjZkNjY4LjY3MlI3ZC04OS4wODhSOGQ2MTQuNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTU3UjEyZDU0LjI3MlIxM2Q2MTQuNFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNjlvUjFkOTU4LjQ2NFIyYWQ1MzYuNTc2ZDc4MC4yODhkNTQ0Ljc2OGQ3OTQuNjI0ZDU0OS44ODhkODExLjUyZDU1NS4wMDhkODI4LjQxNWQ1NTguMDhkODQ4Ljg5NmQ1MDkuOTUyZDg3MC40ZDQ0Ny40ODhkODcwLjRkNDAwLjM4NGQ4NzAuNGQzNjMuNTJkODU0LjUyOGQzMjYuNjU2ZDgzOC42NTZkMzAxLjA1NmQ4MDkuOTg0ZDI3NS40NTZkNzgxLjMxMmQyNjIuMTQ0ZDc0Mi40ZDI0OC44MzJkNzAzLjQ4OGQyNDguODMyZDY1Ny40MDhkMjQ4LjgzMmQ2MTEuMzI4ZDI2Mi42NTZkNTcxLjM5MmQyNzYuNDhkNTMxLjQ1NmQzMDEuNTY4ZDUwMi4yNzFkMzI2LjY1NmQ0NzMuMDg3ZDM2My4wMDhkNDU2LjE5MmQzOTkuMzZkNDM5LjI5NWQ0NDUuNDRkNDM5LjI5NWQ0ODIuMzA0ZDQzOS4yOTVkNTA0LjMyZDQ0My4zOTFkNTI2LjMzNmQ0NDcuNDg3ZDU1MC45MTJkNDU1LjY3OWQ1NDkuODg4ZDQ3NC4xMTFkNTQ2LjMwNGQ0OTIuMDMyZDU0Mi43MmQ1MDkuOTUyZDUzNC41MjhkNTI2LjMzNmQ1MTJkNTE5LjE2OGQ0OTQuMDhkNTE2LjYwN2Q0NzYuMTZkNTE0LjA0OGQ0NTMuNjMyZDUxNC4wNDhkMzk1LjI2NGQ1MTQuMDQ4ZDM2NS4wNTZkNTUyLjQ0OGQzMzQuODQ4ZDU5MC44NDhkMzM0Ljg0OGQ2NTcuNDA4ZDMzNC44NDhkNzI2LjAxNmQzNjcuMTA0ZDc2MS4zNDRkMzk5LjM2ZDc5Ni42NzJkNDU1LjY4ZDc5Ni42NzJkNDc3LjE4NGQ3OTYuNjcyZDQ5Ni42NGQ3OTMuMDg4ZDUxNi4wOTZkNzg5LjUwNGQ1MzYuNTc2ZDc4MC4yODhkNDMzLjE1MmQ5NzAuNzUyZDUwNC44MzJkOTcwLjc1MmQ1NjEuMTUyZDk0Ni4xNzZkNjE3LjQ3MmQ5MjEuNmQ2NTYuODk2ZDg3OS4xMDRkNjk2LjMyZDgzNi42MDhkNzE3LjMxMmQ3NzkuMjY0ZDczOC4zMDRkNzIxLjkyZDczOC4zMDRkNjU2LjM4NGQ3MzguMzA0ZDU5MC44NDhkNzE3LjMxMmQ1MzMuNTAzZDY5Ni4zMmQ0NzYuMTU5ZDY1Ni44OTZkNDMzLjY2NGQ2MTcuNDcyZDM5MS4xNjhkNTYxLjE1MmQzNjYuNTkyZDUwNC44MzJkMzQyLjAxNWQ0MzMuMTUyZDM0Mi4wMTVkMzYxLjQ3MmQzNDIuMDE1ZDMwNS4xNTJkMzY2LjU5MmQyNDguODMyZDM5MS4xNjhkMjA5LjQwOGQ0MzMuNjY0ZDE2OS45ODRkNDc2LjE1OWQxNDguOTkyZDUzMy41MDNkMTI4ZDU5MC44NDhkMTI4ZDY1Ni4zODRkMTI4ZDcyMS45MmQxNDguOTkyZDc3OS4yNjRkMTY5Ljk4NGQ4MzYuNjA4ZDIwOS40MDhkODc5LjEwNGQyNDguODMyZDkyMS42ZDMwNS4xNTJkOTQ2LjE3NmQzNjEuNDcyZDk3MC43NTJkNDMzLjE1MmQ5NzAuNzUyZDQzMy4xNTJkMTAzNy4zMTFkMzQ4LjE2ZDEwMzcuMzExZDI3OC4wMTZkMTAwOC4xMjhkMjA3Ljg3MmQ5NzguOTQ0ZDE1OC4yMDhkOTI4LjI1NmQxMDguNTQ0ZDg3Ny41NjhkODAuODk2ZDgwNy45MzZkNTMuMjQ4ZDczOC4zMDRkNTMuMjQ4ZDY1Ni4zODRkNTMuMjQ4ZDU3NS40ODhkODAuODk2ZDUwNS4zNDNkMTA4LjU0NGQ0MzUuMTk5ZDE1OC4yMDhkMzg0LjUxMWQyMDcuODcyZDMzMy44MjNkMjc4LjAxNmQzMDQuNjRkMzQ4LjE2ZDI3NS40NTZkNDMzLjE1MmQyNzUuNDU2ZDUxOC4xNDRkMjc1LjQ1NmQ1ODguMjg4ZDMwNC4xMjdkNjU4LjQzMmQzMzIuNzk5ZDcwOC4wOTZkMzg0ZDc1Ny43NmQ0MzUuMTk5ZDc4NS40MDhkNTA0LjgzMmQ4MTMuMDU2ZDU3NC40NjRkODEzLjA1NmQ2NTYuMzg0ZDgxMy4wNTZkNzM4LjMwNGQ3ODUuNDA4ZDgwNy45MzZkNzU3Ljc2ZDg3Ny41NjhkNzA4LjA5NmQ5MjguMjU2ZDY1OC40MzJkOTc4Ljk0NGQ1ODguMjg4ZDEwMDguMTI4ZDUxOC4xNDRkMTAzNy4zMTFkNDMzLjE1MmQxMDM3LjMxMWhSM2Q4NjYuMzA0UjRkODEzLjA1NlI1ZDUzLjI0OFI2ZDc0OC41NDRSN2QtMTMuMzEyUjhkNjk1LjI5NlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE2OVIxMmQ1My4yNDhSMTNkODY2LjMwNFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjU2b1IxZDk1OC40NjRSMmFkNDA3LjU1MmQ2MzMuODU2ZDQzNC4xNzZkNjQ1LjEyZDQ2MS4zMTJkNjYxLjUwNGQ0ODguNDQ4ZDY3Ny44ODdkNTEwLjQ2NGQ3MDIuNDY0ZDUzMi40OGQ3MjcuMDRkNTQ2LjMwNGQ3NTkuODA4ZDU2MC4xMjhkNzkyLjU3NmQ1NjAuMTI4ZDgzNS41ODRkNTYwLjEyOGQ4ODkuODU2ZDUzOC42MjRkOTI4LjI1NmQ1MTcuMTJkOTY2LjY1NmQ0ODEuMjhkOTkwLjcyZDQ0NS40NGQxMDE0Ljc4NGQzOTkuODcyZDEwMjUuNTM2ZDM1NC4zMDRkMTAzNi4yODhkMzA3LjJkMTAzNi4yODhkMjU5LjA3MmQxMDM2LjI4OGQyMTQuMDE2ZDEwMjUuNTM2ZDE2OC45NmQxMDE0Ljc4NGQxMzMuMTJkOTkwLjcyZDk3LjI4ZDk2Ni42NTZkNzUuNzc2ZDkyOC4yNTZkNTQuMjcyZDg4OS44NTZkNTQuMjcyZDgzNS41ODRkNTQuMjcyZDc5Mi41NzZkNjguMDk2ZDc2MC4zMTlkODEuOTJkNzI4LjA2NGQxMDMuOTM2ZDcwMy40ODhkMTI1Ljk1MmQ2NzguOTEyZDE1Mi41NzZkNjYyLjAxNmQxNzkuMmQ2NDUuMTJkMjA1LjgyNGQ2MzMuODU2ZDE1Ni42NzJkNjEwLjMwNGQxMjIuMzY4ZDU2OC44MzJkODguMDY0ZDUyNy4zNmQ4OC4wNjRkNDY0Ljg5NWQ4OC4wNjRkNDI0Ljk2ZDEwNC45NmQzOTIuMTkyZDEyMS44NTZkMzU5LjQyNGQxNTEuMDRkMzM2LjM4NGQxODAuMjI0ZDMxMy4zNDNkMjIwLjE2ZDMwMC41NDRkMjYwLjA5NmQyODcuNzQ0ZDMwNy4yZDI4Ny43NDRkMzU0LjMwNGQyODcuNzQ0ZDM5NC4yNGQzMDAuNTQ0ZDQzNC4xNzZkMzEzLjM0M2Q0NjMuMzZkMzM2LjM4NGQ0OTIuNTQ0ZDM1OS40MjRkNTA5LjQ0ZDM5Mi4xOTJkNTI2LjMzNmQ0MjQuOTZkNTI2LjMzNmQ0NjQuODk1ZDUyNi4zMzZkNTI4LjM4NGQ0OTIuMDMyZDU2OS4zNDRkNDU3LjcyOGQ2MTAuMzA0ZDQwNy41NTJkNjMzLjg1NmQzMDcuMmQ2NzYuODY0ZDI3Ni40OGQ2ODYuMDc5ZDI0OS44NTZkNjk5LjkwNGQyMjMuMjMyZDcxMy43MjhkMjA0LjI4OGQ3MzIuMTZkMTg1LjM0NGQ3NTAuNTkyZDE3NC4wOGQ3NzQuMTQ0ZDE2Mi44MTZkNzk3LjY5NmQxNjIuODE2ZDgyNi4zNjdkMTYyLjgxNmQ4ODMuNzEyZDE5OS42OGQ5MTYuNDhkMjM2LjU0NGQ5NDkuMjQ4ZDMwNy4yZDk0OS4yNDhkMzc4Ljg4ZDk0OS4yNDhkNDE1LjIzMmQ5MTYuNDhkNDUxLjU4NGQ4ODMuNzEyZDQ1MS41ODRkODI2LjM2N2Q0NTEuNTg0ZDc5Ny42OTZkNDQwLjMyZDc3NC4xNDRkNDI5LjA1NmQ3NTAuNTkyZDQwOS42ZDczMi4xNmQzOTAuMTQ0ZDcxMy43MjhkMzY0LjAzMmQ2OTkuOTA0ZDMzNy45MmQ2ODYuMDc5ZDMwNy4yZDY3Ni44NjRkMzA3LjJkNTk0Ljk0NGQzMzEuNzc2ZDU4Ny43NzZkMzUzLjI4ZDU3Ny4wMjRkMzc0Ljc4NGQ1NjYuMjcxZDM5MS4xNjhkNTUxLjkzNWQ0MDcuNTUyZDUzNy41OTlkNDE3LjI4ZDUxNy42MzJkNDI3LjAwOGQ0OTcuNjY0ZDQyNy4wMDhkNDcyLjA2M2Q0MjcuMDA4ZDQyNS45ODRkMzk2LjhkMzk4LjMzNmQzNjYuNTkyZDM3MC42ODhkMzA3LjJkMzcwLjY4OGQyNDcuODA4ZDM3MC42ODhkMjE3LjZkMzk4LjMzNmQxODcuMzkyZDQyNS45ODRkMTg3LjM5MmQ0NzIuMDYzZDE4Ny4zOTJkNDk3LjY2NGQxOTcuMTJkNTE3LjYzMmQyMDYuODQ4ZDUzNy41OTlkMjIzLjIzMmQ1NTEuOTM1ZDIzOS42MTZkNTY2LjI3MWQyNjEuNjMyZDU3Ny4wMjRkMjgzLjY0OGQ1ODcuNzc2ZDMwNy4yZDU5NC45NDRoUjNkNjE0LjRSNGQ1NjAuMTI4UjVkNTQuMjcyUjZkNzM2LjI1NlI3ZC0xMi4yODhSOGQ2ODEuOTg0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNTZSMTJkNTQuMjcyUjEzZDYxNC40UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTY4b1IxZDk1OC40NjRSMmFkOTkuMzI4ZDQwNS41MDRkOTcuMjhkMzkyLjE5MmQ5Ni4yNTZkMzc5LjkwNGQ5NS4yMzJkMzY3LjYxNmQ5NS4yMzJkMzU0LjMwNGQ5NS4yMzJkMzQyLjAxNWQ5Ni4yNTZkMzI5LjIxNmQ5Ny4yOGQzMTYuNDE1ZDk5LjMyOGQzMDMuMTA0ZDExMS42MTZkMzAxLjA1NmQxMjUuNDRkMzAwLjAzMmQxMzkuMjY0ZDI5OS4wMDhkMTUxLjU1MmQyOTkuMDA4ZDE2Mi44MTZkMjk5LjAwOGQxNzYuNjRkMzAwLjAzMmQxOTAuNDY0ZDMwMS4wNTZkMjAzLjc3NmQzMDMuMTA0ZDIwNy44NzJkMzI2LjY1NWQyMDcuODcyZDM1NC4zMDRkMjA3Ljg3MmQzNjYuNTkyZDIwNi44NDhkMzc5LjM5MWQyMDUuODI0ZDM5Mi4xOTJkMjAzLjc3NmQ0MDUuNTA0ZDE3Ny4xNTJkNDA4LjU3NmQxNTEuNTUyZDQwOC41NzZkMTQwLjI4OGQ0MDguNTc2ZDEyNS45NTJkNDA4LjA2M2QxMTEuNjE2ZDQwNy41NTJkOTkuMzI4ZDQwNS41MDRkMzA4LjIyNGQ0MDUuNTA0ZDMwNC4xMjhkMzgxLjk1MmQzMDQuMTI4ZDM1NC4zMDRkMzA0LjEyOGQzNDIuMDE1ZDMwNS4xNTJkMzI5LjIxNmQzMDYuMTc2ZDMxNi40MTVkMzA4LjIyNGQzMDMuMTA0ZDMyMC41MTJkMzAxLjA1NmQzMzQuMzM2ZDMwMC4wMzJkMzQ4LjE2ZDI5OS4wMDhkMzU5LjQyNGQyOTkuMDA4ZDM3MS43MTJkMjk5LjAwOGQzODUuNTM2ZDMwMC4wMzJkMzk5LjM2ZDMwMS4wNTZkNDEyLjY3MmQzMDMuMTA0ZDQxNS43NDRkMzI5LjcyN2Q0MTUuNzQ0ZDM1NC4zMDRkNDE1Ljc0NGQzNzkuOTA0ZDQxMi42NzJkNDA1LjUwNGQzODYuMDQ4ZDQwOC41NzZkMzYwLjQ0OGQ0MDguNTc2ZDM0OS4xODRkNDA4LjU3NmQzMzQuODQ4ZDQwOC4wNjNkMzIwLjUxMmQ0MDcuNTUyZDMwOC4yMjRkNDA1LjUwNGhSM2Q1MTJSNGQ0MTUuNzQ0UjVkOTUuMjMyUjZkNzI0Ljk5MlI3ZDYxNS40MjRSOGQ2MjkuNzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNjhSMTJkOTUuMjMyUjEzZDUxMlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjU1b1IxZDk1OC40NjRSMmFkMjUwLjg4ZDEwOTkuNzc2ZDIyMy4yMzJkMTA5My42MzJkMjAwLjE5MmQxMDgzLjkwNGQxNzcuMTUyZDEwNzQuMTc2ZDE1NS42NDhkMTA1Ni43NjhkNDE3Ljc5MmQ0NTQuNjU1ZDcxLjY4ZDQ1NC42NTVkNjkuNjMyZDQ0NC40MTVkNjguNjA4ZDQzMy42NjRkNjcuNTg0ZDQyMi45MTJkNjcuNTg0ZDQxMS42NDhkNjcuNTg0ZDM5OS4zNmQ2OC42MDhkMzg3LjA3MmQ2OS42MzJkMzc0Ljc4NGQ3MS42OGQzNjMuNTJkNTU4LjA4ZDM2My41MmQ1NjIuMTc2ZDM3MC42ODhkMjUwLjg4ZDEwOTkuNzc2aFIzZDYxNC40UjRkNTYyLjE3NlI1ZDY3LjU4NFI2ZDY2MC40OFI3ZC03NS43NzZSOGQ1OTIuODk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNTVSMTJkNjcuNTg0UjEzZDYxNC40UjE0YWkxaTNpM2kyaTJpM2kzaTNpM2kyaTJpMmhnOjE2N29SMWQ5NTguNDY0UjJhZDcwLjY1NmQxMDA5LjY2NGQ3Ny44MjRkOTY0LjYwOGQ5Ni4yNTZkOTI5Ljc5MmQxMjMuOTA0ZDk0MS4wNTZkMTU5Ljc0NGQ5NDkuNzZkMTk1LjU4NGQ5NTguNDY0ZDIzNi41NDRkOTU4LjQ2NGQzMDUuMTUyZDk1OC40NjRkMzQzLjA0ZDk0MC4wMzJkMzgwLjkyOGQ5MjEuNmQzODAuOTI4ZDg4Ni43ODRkMzgwLjkyOGQ4NTcuMDg4ZDM1Ni44NjRkODQzLjI2NGQzMzIuOGQ4MjkuNDRkMjk2Ljk2ZDgxOC4xNzVkMjI4LjM1MmQ3OTYuNjcyZDE4My44MDhkNzc5Ljc3NmQxMzkuMjY0ZDc2Mi44OGQxMTMuNjY0ZDc0NS40NzJkODguMDY0ZDcyOC4wNjRkNzcuODI0ZDcwNi41NmQ2Ny41ODRkNjg1LjA1NmQ2Ny41ODRkNjU0LjMzNmQ2Ny41ODRkNjIwLjU0NGQ4NC40OGQ1ODguOGQxMDEuMzc2ZDU1Ny4wNTZkMTI1Ljk1MmQ1MzAuNDMyZDExMC41OTJkNTE1LjA3MmQxMDEuMzc2ZDQ5My4wNTZkOTIuMTZkNDcxLjAzOWQ5Mi4xNmQ0NDIuMzY3ZDkyLjE2ZDQwNy41NTJkMTA4LjAzMmQzNzguODhkMTIzLjkwNGQzNTAuMjA3ZDE1Mi4wNjRkMzMwLjI0ZDE4MC4yMjRkMzEwLjI3MWQyMjAuMTZkMjk5LjUyZDI2MC4wOTZkMjg4Ljc2OGQzMDkuMjQ4ZDI4OC43NjhkMzYwLjQ0OGQyODguNzY4ZDM5Ny44MjRkMjk2LjQ0OGQ0MzUuMmQzMDQuMTI3ZDQ3My4wODhkMzE2LjQxNWQ0NzMuMDg4ZDMzNi44OTVkNDY1LjkyZDM1Ny4zNzZkNDU4Ljc1MmQzNzcuODU2ZDQ0OC41MTJkMzk2LjI4OGQ0MjEuODg4ZDM4NS4wMjRkMzkwLjY1NmQzNzYuODMyZDM1OS40MjRkMzY4LjY0ZDMxOC40NjRkMzY4LjY0ZDI1OS4wNzJkMzY4LjY0ZDIyNi44MTZkMzg1LjUzNWQxOTQuNTZkNDAyLjQzMmQxOTQuNTZkNDM3LjI0N2QxOTQuNTZkNDcwLjAxNWQyMTYuMDY0ZDQ4Mi44MTZkMjM3LjU2OGQ0OTUuNjE2ZDI3My40MDhkNTA2Ljg4ZDQwMC4zODRkNTQ1Ljc5MWQ1MDYuODhkNTc4LjU2ZDUwNi44OGQ2NjYuNjI0ZDUwNi44OGQ3MDYuNTZkNDg5Ljk4NGQ3MzguMzA0ZDQ3My4wODhkNzcwLjA0OGQ0NDguNTEyZDc5Ny42OTZkNDY0Ljg5NmQ4MTMuMDU2ZDQ3NC4xMTJkODM0LjA0OGQ0ODMuMzI4ZDg1NS4wNGQ0ODMuMzI4ZDg4NC43MzZkNDgzLjMyOGQ5MjAuNTc2ZDQ2NS45MmQ5NDguNzM2ZDQ0OC41MTJkOTc2Ljg5NmQ0MTYuNzY4ZDk5Ni44NjRkMzg1LjAyNGQxMDE2LjgzMmQzNDAuNDhkMTAyNy4wNzFkMjk1LjkzNmQxMDM3LjMxMWQyNDEuNjY0ZDEwMzcuMzExZDE5My41MzZkMTAzNy4zMTFkMTUwLjUyOGQxMDMwLjE0NGQxMDcuNTJkMTAyMi45NzZkNzAuNjU2ZDEwMDkuNjY0ZDM0Ny4xMzZkNzQ3LjUyZDM1Mi4yNTZkNzQ5LjU2OGQzNTguOTEyZDc1MS42MTZkMzY1LjU2OGQ3NTMuNjY0ZDM3NC43ODRkNzU2LjczNmQzODYuMDQ4ZDc0Ni40OTZkMzk5LjM2ZDcyNy4wNGQ0MTIuNjcyZDcwNy41ODRkNDEyLjY3MmQ2ODAuOTZkNDEyLjY3MmQ2NTkuNDU2ZDM5Ny44MjRkNjQzLjU4NGQzODIuOTc2ZDYyNy43MTJkMzUwLjIwOGQ2MTcuNDcyZDI3Ny41MDRkNTk0Ljk0NGQyNTQuOTc2ZDU4Ny43NzZkMjMzLjk4NGQ1ODIuNjU2ZDIxMi45OTJkNTc3LjUzNmQxOTcuNjMyZDU2OS4zNDRkMTg1LjM0NGQ1ODAuNjA4ZDE3My4wNTZkNTk5LjA0ZDE2MC43NjhkNjE3LjQ3MmQxNjAuNzY4ZDY0MS4wMjRkMTYwLjc2OGQ2NjYuNjI0ZDE3Ny4xNTJkNjgyLjQ5NmQxOTMuNTM2ZDY5OC4zNjdkMjI4LjM1MmQ3MDkuNjMyZDM0Ny4xMzZkNzQ3LjUyaFIzZDU3NS40ODhSNGQ1MDYuODhSNWQ2Ny41ODRSNmQ3MzUuMjMyUjdkLTEzLjMxMlI4ZDY2Ny42NDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNjdSMTJkNjcuNTg0UjEzZDU3NS40ODhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaGc6NTRvUjFkOTU4LjQ2NFIyYWQ2Ny41ODRkNzQwLjM1MmQ2Ny41ODRkNjUwLjI0ZDkwLjYyNGQ1NzAuMzY3ZDExMy42NjRkNDkwLjQ5NmQxNjEuMjhkNDI4LjAzMmQyMDguODk2ZDM2NS41NjhkMjgyLjYyNGQzMjYuMTQ0ZDM1Ni4zNTJkMjg2LjcyZDQ1Ny43MjhkMjc4LjUyOGQ0NjUuOTJkMzAzLjEwNGQ0NjUuOTJkMzI1LjYzMWQ0NjUuOTJkMzM1Ljg3MWQ0NjQuODk2ZDM0Ni4xMTFkNDYzLjg3MmQzNTYuMzUyZDQ2MS44MjRkMzY0LjU0NGQzOTcuMzEyZDM3MC42ODhkMzQ3LjY0OGQzOTQuNzUxZDI5Ny45ODRkNDE4LjgxNmQyNjIuMTQ0ZDQ1Ni43MDNkMjI2LjMwNGQ0OTQuNTkyZDIwNC4yODhkNTQ0LjI1NmQxODIuMjcyZDU5My45MmQxNzMuMDU2ZDY1MC4yNGQxOTUuNTg0ZDYxMS4zMjhkMjM5LjEwNGQ1ODMuMTY4ZDI4Mi42MjRkNTU1LjAwOGQzNDguMTZkNTU1LjAwOGQzODkuMTJkNTU1LjAwOGQ0MjguNTQ0ZDU2OC44MzJkNDY3Ljk2OGQ1ODIuNjU2ZDQ5OC42ODhkNjExLjMyOGQ1MjkuNDA4ZDY0MGQ1NDcuODRkNjg0LjU0NGQ1NjYuMjcyZDcyOS4wODhkNTY2LjI3MmQ3OTAuNTI4ZDU2Ni4yNzJkODUwLjk0NGQ1NDUuMjhkODk3LjAyNGQ1MjQuMjg4ZDk0My4xMDRkNDg5LjQ3MmQ5NzMuODI0ZDQ1NC42NTZkMTAwNC41NDRkNDEwLjExMmQxMDIwLjQxNmQzNjUuNTY4ZDEwMzYuMjg4ZDMxOC40NjRkMTAzNi4yODhkMjYwLjA5NmQxMDM2LjI4OGQyMTMuNTA0ZDEwMTkuMzkyZDE2Ni45MTJkMTAwMi40OTZkMTM0LjY1NmQ5NjYuNjU2ZDEwMi40ZDkzMC44MTZkODQuOTkyZDg3NS4wMDhkNjcuNTg0ZDgxOS4yZDY3LjU4NGQ3NDAuMzUyZDMyMi41NmQ2NDEuMDI0ZDI5Mi44NjRkNjQxLjAyNGQyNjYuMjRkNjUxLjI2NGQyMzkuNjE2ZDY2MS41MDRkMjIwLjE2ZDY4MS40NzJkMjAwLjcwNGQ3MDEuNDRkMTg5LjQ0ZDczMC4xMTJkMTc4LjE3NmQ3NTguNzg0ZDE3OC4xNzZkNzk1LjY0OGQxNzguMTc2ZDg3Mi40NDhkMjE0LjUyOGQ5MTAuMzM2ZDI1MC44OGQ5NDguMjI0ZDMxNS4zOTJkOTQ4LjIyNGQzNDYuMTEyZDk0OC4yMjRkMzcyLjIyNGQ5MzcuOTg0ZDM5OC4zMzZkOTI3Ljc0NGQ0MTcuNzkyZDkwOC4yODhkNDM3LjI0OGQ4ODguODMyZDQ0OC41MTJkODYwLjE2ZDQ1OS43NzZkODMxLjQ4OGQ0NTkuNzc2ZDc5My42ZDQ1OS43NzZkNzUyLjY0ZDQ0OS4wMjRkNzIzLjk2OGQ0MzguMjcyZDY5NS4yOTZkNDE5Ljg0ZDY3Ni44NjRkNDAxLjQwOGQ2NTguNDMyZDM3Ni4zMmQ2NDkuNzI4ZDM1MS4yMzJkNjQxLjAyNGQzMjIuNTZkNjQxLjAyNGhSM2Q2MTQuNFI0ZDU2Ni4yNzJSNWQ2Ny41ODRSNmQ3NDUuNDcyUjdkLTEyLjI4OFI4ZDY3Ny44ODhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk1NFIxMmQ2Ny41ODRSMTNkNjE0LjRSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE2Nm9SMWQ5NTguNDY0UjJhZDEyMC44MzJkMjI5LjM3NWQxMzIuMDk2ZDIyNy4zMjdkMTQ0Ljg5NmQyMjYuMzAzZDE1Ny42OTZkMjI1LjI3OWQxNzEuMDA4ZDIyNS4yNzlkMTgzLjI5NmQyMjUuMjc5ZDE5Ni4wOTZkMjI2LjMwM2QyMDguODk2ZDIyNy4zMjdkMjIwLjE2ZDIyOS4zNzVkMjIwLjE2ZDU3MC4zNjdkMTk5LjY4ZDU3NC40NjRkMTcxLjAwOGQ1NzQuNDY0ZDE1Ny42OTZkNTc0LjQ2NGQxNDQuODk2ZDU3My40NGQxMzIuMDk2ZDU3Mi40MTVkMTIwLjgzMmQ1NzAuMzY3ZDEyMC44MzJkMjI5LjM3NWQxMjAuODMyZDg1NS4wNGQxMzIuMDk2ZDg1Mi45OTJkMTQ0Ljg5NmQ4NTEuOTY4ZDE1Ny42OTZkODUwLjk0NGQxNzEuMDA4ZDg1MC45NDRkMTgzLjI5NmQ4NTAuOTQ0ZDE5Ni4wOTZkODUxLjk2OGQyMDguODk2ZDg1Mi45OTJkMjIwLjE2ZDg1NS4wNGQyMjAuMTZkMTE5Ni4wMzJkMjA4Ljg5NmQxMTk4LjA4ZDE5Ni42MDhkMTE5OS4xMDRkMTg0LjMyZDEyMDAuMTI4ZDE3MS4wMDhkMTIwMC4xMjhkMTU3LjY5NmQxMjAwLjEyOGQxNDQuODk2ZDExOTkuMTA0ZDEzMi4wOTZkMTE5OC4wOGQxMjAuODMyZDExOTYuMDMyZDEyMC44MzJkODU1LjA0aFIzZDM0MC45OTJSNGQyMjAuMTZSNWQxMjAuODMyUjZkNzk4LjcyUjdkLTE3Ni4xMjhSOGQ2NzcuODg4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTY2UjEyZDEyMC44MzJSMTNkMzQwLjk5MlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzo1M29SMWQ5NTguNDY0UjJhZDUyMy4yNjRkODQ4Ljg5NmQ1MjMuMjY0ZDkxMy40MDhkNTAwLjczNmQ5NjAuNTEyZDQ3OC4yMDhkMTAwNy42MTZkNDM4Ljc4NGQxMDM4LjMzNmQzOTkuMzZkMTA2OS4wNTZkMzQ1LjZkMTA4My45MDRkMjkxLjg0ZDEwOTguNzUyZDIyOS4zNzZkMTA5OC43NTJkMTkwLjQ2NGQxMDk4Ljc1MmQxNDUuOTJkMTA5MS41ODRkMTAxLjM3NmQxMDg0LjQxNmQ2NC41MTJkMTA2OS4wNTZkNjcuNTg0ZDEwNDYuNTI4ZDc0Ljc1MmQxMDI1LjUzNmQ4MS45MmQxMDA0LjU0NGQ5My4xODRkOTgzLjA0ZDEyNC45MjhkOTk0LjMwNGQxNTUuNjQ4ZDEwMDAuOTZkMTg2LjM2OGQxMDA3LjYxNmQyMjkuMzc2ZDEwMDcuNjE2ZDMxOC40NjRkMTAwNy42MTZkMzY3LjEwNGQ5NzAuMjRkNDE1Ljc0NGQ5MzIuODY0ZDQxNS43NDRkODU0LjAxNmQ0MTUuNzQ0ZDgyNS4zNDRkNDA3LjA0ZDc5OS43NDRkMzk4LjMzNmQ3NzQuMTQ0ZDM3OC44OGQ3NTUuMmQzNTkuNDI0ZDczNi4yNTZkMzI4LjE5MmQ3MjUuNTA0ZDI5Ni45NmQ3MTQuNzUyZDI1MS45MDRkNzE0Ljc1MmQyMjAuMTZkNzE0Ljc1MmQxODkuNDRkNzE5Ljg3MmQxNTguNzJkNzI0Ljk5MmQxMzUuMTY4ZDczMy4xODRkMTI0LjkyOGQ3MjMuOTY4ZDEyOGQ2MzMuODU2ZDEzMS41ODRkNTQ0LjI1NmQxMzUuMTY4ZDQ1NC42NTVkMTM5LjI2NGQzNjMuNTJkNDg3LjQyNGQzNjMuNTJkNDg5LjQ3MmQzNzQuNzg0ZDQ4OS45ODRkMzg1LjUzNWQ0OTAuNDk2ZDM5Ni4yODhkNDkwLjQ5NmQ0MDcuNTUyZDQ5MC40OTZkNDE5Ljg0ZDQ4OS45ODRkNDMxLjYxNmQ0ODkuNDcyZDQ0My4zOTFkNDg3LjQyNGQ0NTQuNjU1ZDIzMS40MjRkNDU0LjY1NWQyMjUuMjhkNjM2LjkyOGQyNDQuNzM2ZDYzMi44MzJkMjY0LjcwNGQ2MzEuODA4ZDI4NC42NzJkNjMwLjc4NGQyOTUuOTM2ZDYzMC43ODRkMzQ3LjEzNmQ2MzAuNzg0ZDM4OS4xMmQ2NDUuMTJkNDMxLjEwNGQ2NTkuNDU2ZDQ2MC44ZDY4Ny42MTZkNDkwLjQ5NmQ3MTUuNzc2ZDUwNi44OGQ3NTYuMjIzZDUyMy4yNjRkNzk2LjY3MmQ1MjMuMjY0ZDg0OC44OTZoUjNkNjE0LjRSNGQ1MjMuMjY0UjVkNjQuNTEyUjZkNjYwLjQ4UjdkLTc0Ljc1MlI4ZDU5NS45NjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk1M1IxMmQ2NC41MTJSMTNkNjE0LjRSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2hnOjE2NW9SMWQ5NTguNDY0UjJhZDI1Ny4wMjRkODYzLjIzMmQ2OC42MDhkODYzLjIzMmQ2NC41MTJkODUwLjk0NGQ2NC41MTJkODI4LjQxNWQ2NC41MTJkODE5LjJkNjUuNTM2ZDgwOS45ODRkNjYuNTZkODAwLjc2OGQ2OC42MDhkNzkyLjU3NmQyNTcuMDI0ZDc5Mi41NzZkMjU3LjAyNGQ3MDIuNDY0ZDY4LjYwOGQ3MDIuNDY0ZDY0LjUxMmQ2OTAuMTc1ZDY0LjUxMmQ2NjcuNjQ3ZDY0LjUxMmQ2NTguNDMyZDY1LjUzNmQ2NDkuMjE2ZDY2LjU2ZDY0MGQ2OC42MDhkNjMxLjgwOGQyMTYuMDY0ZDYzMS44MDhkMjcuNjQ4ZDMwMC4wMzJkNDAuOTZkMjk3Ljk4NGQ1Ni44MzJkMjk2Ljk2ZDcyLjcwNGQyOTUuOTM2ZDg3LjA0ZDI5NS45MzZkMTAxLjM3NmQyOTUuOTM2ZDExNi43MzZkMjk2Ljk2ZDEzMi4wOTZkMjk3Ljk4NGQxNDQuMzg0ZDMwMC4wMzJkMzEyLjMyZDYwOS4yOGQ0NzcuMTg0ZDMwMC4wMzJkNDkwLjQ5NmQyOTcuOTg0ZDUwNC4zMmQyOTYuOTZkNTE4LjE0NGQyOTUuOTM2ZDUzMi40OGQyOTUuOTM2ZDU0Ni44MTZkMjk1LjkzNmQ1NjEuMTUyZDI5Ni45NmQ1NzUuNDg4ZDI5Ny45ODRkNTg3Ljc3NmQzMDAuMDMyZDQwMi40MzJkNjMxLjgwOGQ1NTguMDhkNjMxLjgwOGQ1NjEuMTUyZDY0Ni4xNDRkNTYxLjE1MmQ2NjQuNTc2ZDU2MS4xNTJkNjg3LjEwNGQ1NTguMDhkNzAyLjQ2NGQzNjEuNDcyZDcwMi40NjRkMzYxLjQ3MmQ3OTIuNTc2ZDU1OC4wOGQ3OTIuNTc2ZDU2MS4xNTJkODA2LjkxMmQ1NjEuMTUyZDgyNS4zNDRkNTYxLjE1MmQ4NDcuODcyZDU1OC4wOGQ4NjMuMjMyZDM2MS40NzJkODYzLjIzMmQzNjEuNDcyZDEwMjRkMzQ5LjE4NGQxMDI2LjA0OGQzMzUuODcyZDEwMjcuMDcxZDMyMi41NmQxMDI4LjA5NmQzMDkuMjQ4ZDEwMjguMDk2ZDI5NS45MzZkMTAyOC4wOTZkMjgyLjYyNGQxMDI3LjA3MWQyNjkuMzEyZDEwMjYuMDQ4ZDI1Ny4wMjRkMTAyNGQyNTcuMDI0ZDg2My4yMzJoUjNkNjE0LjRSNGQ1ODcuNzc2UjVkMjcuNjQ4UjZkNzI4LjA2NFI3ZC00LjA5NlI4ZDcwMC40MTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNjVSMTJkMjcuNjQ4UjEzZDYxNC40UjE0YWkxaTJpM2kzaTNpMmkyaTJpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kyaTJpMmkzaTNpMmkyaTNpM2kzaTNpMmhnOjUyb1IxZDk1OC40NjRSMmFkNDEuOTg0ZDk0NC4xMjhkMzMuNzkyZDkzMi44NjRkMzMzLjgyNGQzNDUuMDg3ZDM1NS4zMjhkMzQ3LjEzNWQzNzguMzY4ZDM1NS44NGQ0MDEuNDA4ZDM2NC41NDRkNDIyLjkxMmQzNzguODhkMTg0LjMyZDg1NC4wMTZkMzkxLjE2OGQ4NTQuMDE2ZDM5MS4xNjhkNjU5LjQ1NmQ0MDMuNDU2ZDY1Ny40MDhkNDE1Ljc0NGQ2NTYuMzg0ZDQyOC4wMzJkNjU1LjM2ZDQzOS4yOTZkNjU1LjM2ZDQ1Mi42MDhkNjU1LjM2ZDQ2NS40MDhkNjU2LjM4NGQ0NzguMjA4ZDY1Ny40MDhkNDkwLjQ5NmQ2NTkuNDU2ZDQ5MC40OTZkODU0LjAxNmQ1ODQuNzA0ZDg1NC4wMTZkNTg2Ljc1MmQ4NjUuMjhkNTg3Ljc3NmQ4NzYuNTQ0ZDU4OC44ZDg4Ny44MDhkNTg4LjhkODk5LjA3MmQ1ODguOGQ5MTAuMzM2ZDU4Ny43NzZkOTIyLjExMmQ1ODYuNzUyZDkzMy44ODhkNTg0LjcwNGQ5NDQuMTI4ZDQ5MC40OTZkOTQ0LjEyOGQ0OTAuNDk2ZDEwODQuNDE2ZDQ3Ny4xODRkMTA4Ni40NjRkNDY1LjQwOGQxMDg2Ljk3NmQ0NTMuNjMyZDEwODcuNDg4ZDQ0MS4zNDRkMTA4Ny40ODhkNDI5LjA1NmQxMDg3LjQ4OGQ0MTYuMjU2ZDEwODYuOTc2ZDQwMy40NTZkMTA4Ni40NjRkMzkxLjE2OGQxMDg0LjQxNmQzOTEuMTY4ZDk0NC4xMjhkNDEuOTg0ZDk0NC4xMjhoUjNkNjE0LjRSNGQ1ODguOFI1ZDMzLjc5MlI2ZDY3OC45MTJSN2QtNjMuNDg4UjhkNjQ1LjEyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNTJSMTJkMzMuNzkyUjEzZDYxNC40UjE0YWkxaTJpMmkzaTNpMmkyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTJoZzoxNjRvUjFkOTU4LjQ2NFIyYWQ4Ni4wMTZkNjY3LjY0N2Q4Ni4wMTZkNjMyLjgzMmQ5Ni4yNTZkNjAyLjExMmQxMDYuNDk2ZDU3MS4zOTJkMTI0LjkyOGQ1NDQuNzY4ZDQ0LjAzMmQ0NjIuODQ3ZDU1LjI5NmQ0NDAuMzE5ZDcwLjY1NmQ0MjUuOTg0ZDg2LjAxNmQ0MTEuNjQ4ZDEwNi40OTZkNDAyLjQzMmQxODcuMzkyZDQ4NC4zNTJkMjEyLjk5MmQ0NjYuOTQzZDI0My4yZDQ1Ny43MjdkMjczLjQwOGQ0NDguNTExZDMwNy4yZDQ0OC41MTFkMzQwLjk5MmQ0NDguNTExZDM3MS4yZDQ1Ny43MjdkNDAxLjQwOGQ0NjYuOTQzZDQyOC4wMzJkNDg0LjM1MmQ1MDkuOTUyZDQwMi40MzJkNTI4LjM4NGQ0MTMuNjk2ZDU0NC4yNTZkNDI4LjU0NGQ1NjAuMTI4ZDQ0My4zOTFkNTcwLjM2OGQ0NjEuODIzZDQ4OS40NzJkNTQyLjcyZDUwOC45MjhkNTY5LjM0NGQ1MTkuNjhkNjAxLjA4OGQ1MzAuNDMyZDYzMi44MzJkNTMwLjQzMmQ2NjcuNjQ3ZDUzMC40MzJkNzAyLjQ2NGQ1MTkuNjhkNzMzLjE4NGQ1MDguOTI4ZDc2My45MDRkNDkxLjUyZDc5MC41MjhkNTY5LjM0NGQ4NjguMzUyZDU0Ni44MTZkOTA3LjI2NGQ1MTAuOTc2ZDkyOC43NjhkNDMwLjA4ZDg0OC44OTZkMzc1LjgwOGQ4ODUuNzZkMzA3LjJkODg1Ljc2ZDIzNy41NjhkODg1Ljc2ZDE4My4yOTZkODQ4Ljg5NmQxMDQuNDQ4ZDkyNy43NDRkODEuOTJkOTE3LjUwNGQ2Ny41ODRkOTAxLjYzMmQ1My4yNDhkODg1Ljc2ZDQ0LjAzMmQ4NjYuMzA0ZDEyMS44NTZkNzg4LjQ4ZDEwNC40NDhkNzYyLjg4ZDk1LjIzMmQ3MzIuMTZkODYuMDE2ZDcwMS40NGQ4Ni4wMTZkNjY3LjY0N2QxNzcuMTUyZDY2Ny42NDdkMTc3LjE1MmQ2OTYuMzE5ZDE4Ni44OGQ3MjAuODk2ZDE5Ni42MDhkNzQ1LjQ3MmQyMTQuMDE2ZDc2My45MDRkMjMxLjQyNGQ3ODIuMzM2ZDI1NS40ODhkNzkzLjA4OGQyNzkuNTUyZDgwMy44NGQzMDcuMmQ4MDMuODRkMzM1Ljg3MmQ4MDMuODRkMzU5LjkzNmQ3OTMuMDg4ZDM4NGQ3ODIuMzM2ZDQwMS40MDhkNzYzLjkwNGQ0MTguODE2ZDc0NS40NzJkNDI5LjA1NmQ3MjAuODk2ZDQzOS4yOTZkNjk2LjMxOWQ0MzkuMjk2ZDY2Ny42NDdkNDM5LjI5NmQ2MzguOTc2ZDQyOS4wNTZkNjE0LjRkNDE4LjgxNmQ1ODkuODI0ZDQwMS40MDhkNTcxLjM5MmQzODRkNTUyLjk2ZDM1OS45MzZkNTQyLjIwOGQzMzUuODcyZDUzMS40NTZkMzA3LjJkNTMxLjQ1NmQyNzkuNTUyZDUzMS40NTZkMjU1LjQ4OGQ1NDIuMjA4ZDIzMS40MjRkNTUyLjk2ZDIxNC4wMTZkNTcxLjM5MmQxOTYuNjA4ZDU4OS44MjRkMTg2Ljg4ZDYxNC40ZDE3Ny4xNTJkNjM4Ljk3NmQxNzcuMTUyZDY2Ny42NDdoUjNkNjE0LjRSNGQ1NzAuMzY4UjVkNDQuMDMyUjZkNjIxLjU2OFI3ZDk1LjIzMlI4ZDU3Ny41MzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNjRSMTJkNDQuMDMyUjEzZDYxNC40UjE0YWkxaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpM2kyaTNpM2kyaTNpM2kyaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo1MW9SMWQ5NTguNDY0UjJhZDIzMS40MjRkMTAwOC42NGQyNzAuMzM2ZDEwMDguNjRkMzA0LjY0ZDEwMDAuNDQ4ZDMzOC45NDRkOTkyLjI1NmQzNjQuMDMyZDk3My44MjRkMzg5LjEyZDk1NS4zOTJkNDAzLjk2OGQ5MjYuMjA4ZDQxOC44MTZkODk3LjAyNGQ0MTguODE2ZDg1NS4wNGQ0MTguODE2ZDc5MS41NTJkMzc2LjgzMmQ3NjAuODMyZDMzNC44NDhkNzMwLjExMmQyNjcuMjY0ZDczMC4xMTJkMjQ2Ljc4NGQ3MzAuMTEyZDIyNS43OTJkNzMxLjY0N2QyMDQuOGQ3MzMuMTg0ZDE4NC4zMmQ3MzguMzA0ZDE3Ni4xMjhkNzIzLjk2OGQzNDcuMTM2ZDQ1NC42NTVkODMuOTY4ZDQ1NC42NTVkNzkuODcyZDQzNC4xNzVkNzkuODcyZDQxMC42MjRkNzkuODcyZDM5OS4zNmQ4MC44OTZkMzg3LjA3MmQ4MS45MmQzNzQuNzg0ZDgzLjk2OGQzNjMuNTJkNDk4LjY4OGQzNjMuNTJkNTA1Ljg1NmQzNzUuODA4ZDMxOS40ODhkNjU5LjQ1NmQzMjIuNTZkNjU4LjQzMmQzMjYuNjU2ZDY1OC40MzJkMzMwLjc1MmQ2NTguNDMyZDMzNC44NDhkNjU4LjQzMmQzODIuOTc2ZDY1OC40MzJkNDE4LjMwNGQ2NzUuMzI4ZDQ1My42MzJkNjkyLjIyM2Q0NzYuNjcyZDcxOS4zNmQ0OTkuNzEyZDc0Ni40OTZkNTEwLjk3NmQ3NzkuNzc2ZDUyMi4yNGQ4MTMuMDU2ZDUyMi4yNGQ4NDUuODI0ZDUyMi4yNGQ5MTEuMzZkNDk5LjJkOTU4Ljk3NmQ0NzYuMTZkMTAwNi41OTJkNDM3LjI0OGQxMDM3LjgyNGQzOTguMzM2ZDEwNjkuMDU2ZDM0Ni4xMTJkMTA4My45MDRkMjkzLjg4OGQxMDk4Ljc1MmQyMzQuNDk2ZDEwOTguNzUyZDE4My4yOTZkMTA5OC43NTJkMTM4LjI0ZDEwOTAuNTZkOTMuMTg0ZDEwODIuMzY4ZDQ5LjE1MmQxMDY0Ljk2ZDUyLjIyNGQxMDQyLjQzMmQ2MC45MjhkMTAyMC45MjhkNjkuNjMyZDk5OS40MjRkODAuODk2ZDk3OC45NDRkMTEzLjY2NGQ5OTIuMjU2ZDE0OS41MDRkMTAwMC40NDhkMTg1LjM0NGQxMDA4LjY0ZDIzMS40MjRkMTAwOC42NGhSM2Q2MTQuNFI0ZDUyMi4yNFI1ZDQ5LjE1MlI2ZDY2MC40OFI3ZC03NC43NTJSOGQ2MTEuMzI4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNTFSMTJkNDkuMTUyUjEzZDYxNC40UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTNpM2kyaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTYzb1IxZDk1OC40NjRSMmFkMTAxLjM3NmQxMDExLjcxMmQxMjAuODMyZDk5My4yOGQxNDAuMjg4ZDk3NC44NDhkMTU0LjYyNGQ5NTAuMjcxZDE2OC45NmQ5MjUuNjk2ZDE3Ny42NjRkODk5LjA3MmQxODYuMzY4ZDg3Mi40NDhkMTkwLjQ2NGQ4NDcuMzZkMTk0LjU2ZDgyMi4yNzFkMTk0LjU2ZDgwMS43OTJkMTk0LjU2ZDc3OS4yNjRkMTkyZDc1Ny4yNDhkMTg5LjQ0ZDczNS4yMzJkMTg0LjMyZDcxMS42OGQ5NS4yMzJkNzExLjY4ZDkyLjE2ZDY5My4yNDhkOTIuMTZkNjcxLjc0M2Q5Mi4xNmQ2NTIuMjg4ZDk1LjIzMmQ2MzEuODA4ZDE2Ny45MzZkNjMxLjgwOGQxNjIuODE2ZDYwMi4xMTJkMTU4LjIwOGQ1NzEuOTA0ZDE1My42ZDU0MS42OTVkMTUzLjZkNTA5Ljk1MmQxNTMuNmQ0NjUuOTE5ZDE2Ny40MjRkNDI1LjQ3MmQxODEuMjQ4ZDM4NS4wMjRkMjA5LjQwOGQzNTQuMzA0ZDIzNy41NjhkMzIzLjU4M2QyODEuMDg4ZDMwNS4xNTFkMzI0LjYwOGQyODYuNzJkMzg1LjAyNGQyODYuNzJkNDM5LjI5NmQyODYuNzJkNDc1LjY0OGQyOTQuOTEyZDUxMmQzMDMuMTA0ZDUzOC42MjRkMzE0LjM2N2Q1MzYuNTc2ZDMzNC44NDdkNTMxLjQ1NmQzNTUuMzI4ZDUyNi4zMzZkMzc1LjgwOGQ1MTUuMDcyZDM5OS4zNmQ0ODYuNGQzODcuMDcyZDQ1Ny43MjhkMzgwLjkyOGQ0MjkuMDU2ZDM3NC43ODRkMzkxLjE2OGQzNzQuNzg0ZDM1NS4zMjhkMzc0Ljc4NGQzMzAuMjRkMzg2LjA0OGQzMDUuMTUyZDM5Ny4zMTJkMjg5Ljc5MmQ0MTYuNzY4ZDI3NC40MzJkNDM2LjIyM2QyNjcuMjY0ZDQ2Mi4zMzZkMjYwLjA5NmQ0ODguNDQ4ZDI2MC4wOTZkNTE3LjEyZDI2MC4wOTZkNTQ4Ljg2NGQyNjQuNzA0ZDU3Ni41MTJkMjY5LjMxMmQ2MDQuMTZkMjc1LjQ1NmQ2MzEuODA4ZDQ2Ni45NDRkNjMxLjgwOGQ0NzAuMDE2ZDY1Mi4yODhkNDcwLjAxNmQ2NzMuNzkxZDQ3MC4wMTZkNjkzLjI0OGQ0NjYuOTQ0ZDcxMS42OGQyODkuNzkyZDcxMS42OGQyOTMuODg4ZDczMC4xMTJkMjk2LjQ0OGQ3NDkuMDU2ZDI5OS4wMDhkNzY4ZDI5OS4wMDhkNzg3LjQ1NmQyOTkuMDA4ZDgzMC40NjRkMjg5Ljc5MmQ4NjcuODRkMjgwLjU3NmQ5MDUuMjE2ZDI2MS4xMmQ5MzEuODRkNTM5LjY0OGQ5MzEuODRkNTQxLjY5NmQ5NDMuMTA0ZDU0Mi4yMDhkOTU1LjM5MmQ1NDIuNzJkOTY3LjY4ZDU0Mi43MmQ5NzcuOTJkNTQyLjcyZDEwMDIuNDk2ZDUzOS42NDhkMTAyNGQxMDUuNDcyZDEwMjRkMTAxLjM3NmQxMDExLjcxMmhSM2Q2MTQuNFI0ZDU0Mi43MlI1ZDkyLjE2UjZkNzM3LjI4UjdkMFI4ZDY0NS4xMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE2M1IxMmQ5Mi4xNlIxM2Q2MTQuNFIxNGFpMWkyaTNpM2kzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpM2kzaTNpMmkyaGc6NTBvUjFkOTU4LjQ2NFIyYWQ2NC41MTJkMTAyNGQ1OC4zNjhkMTAxMC42ODhkMjU5LjA3MmQ3NzYuMTkyZDI4NS42OTZkNzQ0LjQ0OGQzMDguNzM2ZDcxNi4yODhkMzMxLjc3NmQ2ODguMTI3ZDM0OC42NzJkNjYxLjUwNGQzNjUuNTY4ZDYzNC44OGQzNzUuMjk2ZDYwOS4yOGQzODUuMDI0ZDU4My42OGQzODUuMDI0ZDU1Ni4wMzFkMzg1LjAyNGQ1MDEuNzZkMzUwLjIwOGQ0NzMuMDg3ZDMxNS4zOTJkNDQ0LjQxNWQyNTAuODhkNDQ0LjQxNWQyMDEuNzI4ZDQ0NC40MTVkMTY3LjkzNmQ0NTUuNjc5ZDEzNC4xNDRkNDY2Ljk0M2QxMDIuNGQ0ODEuMjhkOTQuMjA4ZDQ2MC43OTlkODYuNTI4ZDQzOS4yOTVkNzguODQ4ZDQxNy43OTJkNzYuOGQzOTUuMjY0ZDExMi42NGQzNzkuOTA0ZDE1Ni4xNmQzNjYuNTkyZDE5OS42OGQzNTMuMjhkMjU4LjA0OGQzNTMuMjhkMzEwLjI3MmQzNTMuMjhkMzUzLjI4ZDM2NS4wNTZkMzk2LjI4OGQzNzYuODMyZDQyNy41MmQ0MDAuMzg0ZDQ1OC43NTJkNDIzLjkzNmQ0NzUuNjQ4ZDQ2MC4yODhkNDkyLjU0NGQ0OTYuNjRkNDkyLjU0NGQ1NDUuNzkxZDQ5Mi41NDRkNjE0LjRkNDU0LjY1NmQ2NzguOTEyZDQxNi43NjhkNzQzLjQyNGQzNDcuMTM2ZDgyMi4yNzFkMjQ4LjgzMmQ5MzMuODg4ZDUyMC4xOTJkOTMzLjg4OGQ1MjIuMjRkOTQ1LjE1MmQ1MjMuMjY0ZDk1Ni40MTVkNTI0LjI4OGQ5NjcuNjhkNTI0LjI4OGQ5NzkuOTY4ZDUyNC4yODhkOTkxLjIzMmQ1MjMuMjY0ZDEwMDIuNDk2ZDUyMi4yNGQxMDEzLjc2ZDUyMC4xOTJkMTAyNGQ2NC41MTJkMTAyNGhSM2Q2MTQuNFI0ZDUyNC4yODhSNWQ1OC4zNjhSNmQ2NzAuNzJSN2QwUjhkNjEyLjM1MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTUwUjEyZDU4LjM2OFIxM2Q2MTQuNFIxNGFpMWkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjE2Mm9SMWQ5NTguNDY0UjJhZDMzMi44ZDEwMzMuMjE1ZDIyNC4yNTZkMTAyMS45NTJkMTY5LjQ3MmQ5NTAuMjcxZDExNC42ODhkODc4LjU5MmQxMTQuNjg4ZDc2MS44NTZkMTE0LjY4OGQ3MDguNjA4ZDEyOC41MTJkNjYxLjUwNGQxNDIuMzM2ZDYxNC40ZDE2OS40NzJkNTc4LjU2ZDE5Ni42MDhkNTQyLjcyZDIzNy41NjhkNTE5LjE2OGQyNzguNTI4ZDQ5NS42MTZkMzMyLjhkNDg5LjQ3MmQzMzIuOGQzNzIuNzM2ZDM1MS4yMzJkMzY3LjYxNmQzNjcuNjE2ZDM2Ny42MTZkMzg0ZDM2Ny42MTZkNDA0LjQ4ZDM3Mi43MzZkNDA0LjQ4ZDQ4OC40NDhkNDM0LjE3NmQ0OTAuNDk2ZDQ1OS43NzZkNDk1LjYxNmQ0ODUuMzc2ZDUwMC43MzZkNTA4LjkyOGQ1MDguOTI4ZDUwOC45MjhkNTI5LjQwOGQ1MDMuODA4ZDU1MC45MTJkNDk4LjY4OGQ1NzIuNDE1ZDQ5MS41MmQ1ODguOGQ0NjUuOTJkNTgwLjYwOGQ0MzguMjcyZDU3NmQ0MTAuNjI0ZDU3MS4zOTJkMzc3Ljg1NmQ1NzEuMzkyZDI5Ny45ODRkNTcxLjM5MmQyNTguMDQ4ZDYyMy4xMDRkMjE4LjExMmQ2NzQuODE2ZDIxOC4xMTJkNzYxLjg1NmQyMTguMTEyZDg2MS4xODRkMjYzLjE2OGQ5MDYuNzUyZDMwOC4yMjRkOTUyLjMxOWQzODUuMDI0ZDk1Mi4zMTlkNDE1Ljc0NGQ5NTIuMzE5ZDQ0MS4zNDRkOTQ4LjIyNGQ0NjYuOTQ0ZDk0NC4xMjhkNDk0LjU5MmQ5MzMuODg4ZDUwMi43ODRkOTQ4LjIyNGQ1MDguOTI4ZDk2OS43MjhkNTE1LjA3MmQ5OTEuMjMyZDUxNi4wOTZkMTAxMy43NmQ0ODkuNDcyZDEwMjEuOTUyZDQ2Mi4zMzZkMTAyNy41ODRkNDM1LjJkMTAzMy4yMTVkNDA0LjQ4ZDEwMzUuMjYzZDQwNC40OGQxMTQ0LjgzMmQzODguMDk2ZDExNDguOTI4ZDM2OC42NGQxMTQ4LjkyOGQzNTkuNDI0ZDExNDguOTI4ZDM1MC4yMDhkMTE0Ny45MDRkMzQwLjk5MmQxMTQ2Ljg4ZDMzMi44ZDExNDQuODMyZDMzMi44ZDEwMzMuMjE1aFIzZDYxNC40UjRkNTE2LjA5NlI1ZDExNC42ODhSNmQ2NTYuMzg0UjdkLTEyNC45MjhSOGQ1NDEuNjk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTYyUjEyZDExNC42ODhSMTNkNjE0LjRSMTRhaTFpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmhnOjQ5b1IxZDk1OC40NjRSMmFkMTQwLjI4OGQ1NjQuMjIzZDEyNS45NTJkNTQ2LjgxNmQxMTcuNzZkNTI5LjQwOGQxMDkuNTY4ZDUxMmQxMDEuMzc2ZDQ4OC40NDhkMzczLjc2ZDM1OC40ZDM4OS4xMmQzNTguNGQzODkuMTJkOTM2Ljk2ZDUzNS41NTJkOTM2Ljk2ZDUzOC42MjRkOTYwLjUxMmQ1MzguNjI0ZDk3OS45NjhkNTM4LjYyNGQxMDAxLjQ3MmQ1MzUuNTUyZDEwMjRkMTM1LjE2OGQxMDI0ZDEzMS4wNzJkMTAwMy41MmQxMzEuMDcyZDk3OS45NjhkMTMxLjA3MmQ5NTcuNDRkMTM1LjE2OGQ5MzYuOTZkMjg4Ljc2OGQ5MzYuOTZkMjg4Ljc2OGQ0OTYuNjRkMTQwLjI4OGQ1NjQuMjIzaFIzZDYxNC40UjRkNTM4LjYyNFI1ZDEwMS4zNzZSNmQ2NjUuNlI3ZDBSOGQ1NjQuMjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNDlSMTJkMTAxLjM3NlIxM2Q2MTQuNFIxNGFpMWkzaTNpMmkyaTJpMmkzaTNpMmkzaTNpMmkyaTJoZzoxNjFvUjFkOTU4LjQ2NFIyYWQyMDEuNzI4ZDEyMzIuODk2ZDE4Ny4zOTJkMTIzNC45NDRkMTc0LjU5MmQxMjM1Ljk2OGQxNjEuNzkyZDEyMzYuOTkyZDE0OC40OGQxMjM2Ljk5MmQxMzQuMTQ0ZDEyMzYuOTkyZDEyMC4zMmQxMjM1Ljk2OGQxMDYuNDk2ZDEyMzQuOTQ0ZDkyLjE2ZDEyMzIuODk2ZDk4LjMwNGQ3MTcuODI0ZDExMC41OTJkNzE1Ljc3NmQxMjIuODhkNzE0Ljc1MmQxMzUuMTY4ZDcxMy43MjhkMTQ2LjQzMmQ3MTMuNzI4ZDE1OC43MmQ3MTMuNzI4ZDE3MS4wMDhkNzE0Ljc1MmQxODMuMjk2ZDcxNS43NzZkMTk0LjU2ZDcxNy44MjRkMjAxLjcyOGQxMjMyLjg5NmQyMDUuODI0ZDQ5Ni42NGQyMDcuODcyZDUxMC45NzZkMjA4Ljg5NmQ1MjUuMzEyZDIwOS45MmQ1MzkuNjQ3ZDIwOS45MmQ1NTMuOTgzZDIwOS45MmQ1NjguMzE5ZDIwOC44OTZkNTgyLjY1NmQyMDcuODcyZDU5Ni45OTJkMjA1LjgyNGQ2MTEuMzI4ZDE5MS40ODhkNjEzLjM3NmQxNzcuMTUyZDYxNC40ZDE2Mi44MTZkNjE1LjQyNGQxNDguNDhkNjE1LjQyNGQxMzQuMTQ0ZDYxNS40MjRkMTE5LjgwOGQ2MTQuNGQxMDUuNDcyZDYxMy4zNzZkOTEuMTM2ZDYxMS4zMjhkODkuMDg4ZDU5Ni45OTJkODguMDY0ZDU4My4xNjhkODcuMDRkNTY5LjM0NGQ4Ny4wNGQ1NTUuMDA4ZDg3LjA0ZDU0MC42NzJkODguMDY0ZDUyNS44MjRkODkuMDg4ZDUxMC45NzZkOTEuMTM2ZDQ5Ni42NGQxMDUuNDcyZDQ5NC41OTJkMTE5LjI5NmQ0OTMuNTY4ZDEzMy4xMmQ0OTIuNTQ0ZDE0Ny40NTZkNDkyLjU0NGQxNjEuNzkyZDQ5Mi41NDRkMTc2LjY0ZDQ5My41NjhkMTkxLjQ4OGQ0OTQuNTkyZDIwNS44MjRkNDk2LjY0aFIzZDI5Ni45NlI0ZDIwOS45MlI1ZDg3LjA0UjZkNTMxLjQ1NlI3ZC0yMTIuOTkyUjhkNDQ0LjQxNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE2MVIxMmQ4Ny4wNFIxM2QyOTYuOTZSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzo0OG9SMWQ5NTguNDY0UjJhZDMwOS4yNDhkMzUzLjI4ZDM3My43NmQzNTMuMjhkNDIyLjRkMzc4Ljg4ZDQ3MS4wNGQ0MDQuNDhkNTAzLjI5NmQ0NTAuMDQ4ZDUzNS41NTJkNDk1LjYxNmQ1NTEuNDI0ZDU1OC4wNzlkNTY3LjI5NmQ2MjAuNTQ0ZDU2Ny4yOTZkNjk1LjI5NmQ1NjcuMjk2ZDc2OS4wMjRkNTUwLjkxMmQ4MzJkNTM0LjUyOGQ4OTQuOTc2ZDUwMi4yNzJkOTQwLjAzMmQ0NzAuMDE2ZDk4NS4wODhkNDIwLjg2NGQxMDEwLjY4OGQzNzEuNzEyZDEwMzYuMjg4ZDMwNy4yZDEwMzYuMjg4ZDI0Mi42ODhkMTAzNi4yODhkMTk0LjU2ZDEwMTAuNjg4ZDE0Ni40MzJkOTg1LjA4OGQxMTQuMTc2ZDk0MC4wMzJkODEuOTJkODk0Ljk3NmQ2Ni4wNDhkODMyZDUwLjE3NmQ3NjkuMDI0ZDUwLjE3NmQ2OTUuMjk2ZDUwLjE3NmQ2MjAuNTQ0ZDY2LjU2ZDU1OC4wNzlkODIuOTQ0ZDQ5NS42MTZkMTE1LjJkNDUwLjA0OGQxNDcuNDU2ZDQwNC40OGQxOTYuMDk2ZDM3OC44OGQyNDQuNzM2ZDM1My4yOGQzMDkuMjQ4ZDM1My4yOGQzMDguMjI0ZDQ0My4zOTFkMjM3LjU2OGQ0NDMuMzkxZDE5Ny42MzJkNTA1Ljg1NmQxNTcuNjk2ZDU2OC4zMTlkMTU3LjY5NmQ2OTUuMjk2ZDE1Ny42OTZkODIyLjI3MWQxOTcuNjMyZDg4NC4yMjNkMjM3LjU2OGQ5NDYuMTc2ZDMwOC4yMjRkOTQ2LjE3NmQzNzguODhkOTQ2LjE3NmQ0MTcuNzkyZDg4NC4yMjNkNDU2LjcwNGQ4MjIuMjcxZDQ1Ni43MDRkNjk1LjI5NmQ0NTYuNzA0ZDU2OC4zMTlkNDE3Ljc5MmQ1MDUuODU2ZDM3OC44OGQ0NDMuMzkxZDMwOC4yMjRkNDQzLjM5MWhSM2Q2MTQuNFI0ZDU2Ny4yOTZSNWQ1MC4xNzZSNmQ2NzAuNzJSN2QtMTIuMjg4UjhkNjIwLjU0NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTQ4UjEyZDUwLjE3NlIxM2Q2MTQuNFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTYwb1IxZDk1OC40NjRSMmFoUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTYwUjEyZDBSMTNkMFIxNGFoZzo0N29SMWQ5NTguNDY0UjJhZDI4NC42NzJkMjg3Ljc0NGQyOTYuOTZkMjg1LjY5NmQzMDguNzM2ZDI4NC42NzJkMzIwLjUxMmQyODMuNjQ4ZDMzMy44MjRkMjgzLjY0OGQzNDUuMDg4ZDI4My42NDhkMzU3Ljg4OGQyODQuNjcyZDM3MC42ODhkMjg1LjY5NmQzODRkMjg3Ljc0NGQxMzQuMTQ0ZDEwMjRkMTIxLjg1NmQxMDI2LjA0OGQxMDkuNTY4ZDEwMjcuMDcxZDk3LjI4ZDEwMjguMDk2ZDgzLjk2OGQxMDI4LjA5NmQ3Mi43MDRkMTAyOC4wOTZkNjAuNDE2ZDEwMjcuMDcxZDQ4LjEyOGQxMDI2LjA0OGQzNS44NGQxMDI0ZDI4NC42NzJkMjg3Ljc0NGhSM2Q0MTkuODRSNGQzODRSNWQzNS44NFI2ZDc0MC4zNTJSN2QtNC4wOTZSOGQ3MDQuNTEyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNDdSMTJkMzUuODRSMTNkNDE5Ljg0UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxNTlvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE1OVIxMmQwUjEzZDUxMlIxNGFoZzo0Nm9SMWQ5NTguNDY0UjJhZDY2LjU2ZDEwMjRkNjQuNTEyZDEwMDkuNjY0ZDYyLjk3NmQ5OTUuODRkNjEuNDRkOTgyLjAxNmQ2MS40NGQ5NjcuNjhkNjEuNDRkOTUzLjM0NGQ2Mi45NzZkOTM4LjQ5NmQ2NC41MTJkOTIzLjY0OGQ2Ni41NmQ5MDkuMzEyZDgwLjg5NmQ5MDcuMjY0ZDk0LjcyZDkwNi4yNGQxMDguNTQ0ZDkwNS4yMTZkMTIyLjg4ZDkwNS4yMTZkMTM3LjIxNmQ5MDUuMjE2ZDE1MS41NTJkOTA2LjI0ZDE2NS44ODhkOTA3LjI2NGQxODAuMjI0ZDkwOS4zMTJkMTgyLjI3MmQ5MjMuNjQ4ZDE4My44MDhkOTM3Ljk4NGQxODUuMzQ0ZDk1Mi4zMTlkMTg1LjM0NGQ5NjYuNjU2ZDE4NS4zNDRkOTgwLjk5MmQxODMuODA4ZDk5NS4zMjhkMTgyLjI3MmQxMDA5LjY2NGQxODAuMjI0ZDEwMjRkMTY1Ljg4OGQxMDI2LjA0OGQxNTIuMDY0ZDEwMjcuMDcxZDEzOC4yNGQxMDI4LjA5NmQxMjMuOTA0ZDEwMjguMDk2ZDEwOS41NjhkMTAyOC4wOTZkOTUuMjMyZDEwMjcuMDcxZDgwLjg5NmQxMDI2LjA0OGQ2Ni41NmQxMDI0aFIzZDI0Ni43ODRSNGQxODUuMzQ0UjVkNjEuNDRSNmQxMTguNzg0UjdkLTQuMDk2UjhkNTcuMzQ0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNDZSMTJkNjEuNDRSMTNkMjQ2Ljc4NFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTU4b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNThSMTJkMFIxM2Q1MTJSMTRhaGc6NDVvUjFkOTU4LjQ2NFIyYWQzMTcuNDRkNjkwLjE3NWQzMTkuNDg4ZDcwMC40MTVkMzIwLjUxMmQ3MTMuMjE2ZDMyMS41MzZkNzI2LjAxNmQzMjEuNTM2ZDczNy4yOGQzMjEuNTM2ZDc0OC41NDRkMzIwLjUxMmQ3NjEuMzQ0ZDMxOS40ODhkNzc0LjE0NGQzMTcuNDRkNzgzLjM2ZDUyLjIyNGQ3ODMuMzZkNTAuMTc2ZDc3NC4xNDRkNDkuMTUyZDc2MS4zNDRkNDguMTI4ZDc0OC41NDRkNDguMTI4ZDczNy4yOGQ0OC4xMjhkNzI2LjAxNmQ0OS4xNTJkNzEzLjIxNmQ1MC4xNzZkNzAwLjQxNWQ1Mi4yMjRkNjkwLjE3NWQzMTcuNDRkNjkwLjE3NWhSM2QzNjkuNjY0UjRkMzIxLjUzNlI1ZDQ4LjEyOFI2ZDMzMy44MjRSN2QyNDAuNjRSOGQyODUuNjk2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpNDVSMTJkNDguMTI4UjEzZDM2OS42NjRSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjE1N29SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTU3UjEyZDBSMTNkNTEyUjE0YWhnOjQ0b1IxZDk1OC40NjRSMmFkODAuODk2ZDkxMS4zNmQ5My4xODRkOTA5LjMxMmQxMDUuOTg0ZDkwNy43NzZkMTE4Ljc4NGQ5MDYuMjRkMTMwLjA0OGQ5MDYuMjRkMTUzLjZkOTA2LjI0ZDE4Mi4yNzJkOTExLjM2ZDExNy43NmQxMTM5LjcxMmQxMDUuNDcyZDExNDEuNzZkOTIuNjcyZDExNDIuMjcyZDc5Ljg3MmQxMTQyLjc4NGQ2OC42MDhkMTE0Mi43ODRkNTYuMzJkMTE0Mi43ODRkNDQuMDMyZDExNDIuMjcyZDMxLjc0NGQxMTQxLjc2ZDIwLjQ4ZDExMzkuNzEyZDgwLjg5NmQ5MTEuMzZoUjNkMjE4LjExMlI0ZDE4Mi4yNzJSNWQyMC40OFI2ZDExNy43NlI3ZC0xMTguNzg0UjhkOTcuMjhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk0NFIxMmQyMC40OFIxM2QyMTguMTEyUjE0YWkxaTNpM2kzaTJpM2kzaTNpM2kyaGc6MTU2b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNTZSMTJkMFIxM2Q1MTJSMTRhaGc6NDNvUjFkOTU4LjQ2NFIyYWQyNjIuMTQ0ZDcwOS42MzJkOTIuMTZkNzA5LjYzMmQ4OC4wNjRkNjg5LjE1MmQ4OC4wNjRkNjYzLjU1MmQ4OC4wNjRkNjM4Ljk3NmQ5Mi4xNmQ2MTguNDk2ZDI2Mi4xNDRkNjE4LjQ5NmQyNjIuMTQ0ZDQzMi4xMjhkMjczLjQwOGQ0MzAuMDhkMjg0LjE2ZDQyOS4wNTZkMjk0LjkxMmQ0MjguMDMyZDMwNy4yZDQyOC4wMzJkMzE4LjQ2NGQ0MjguMDMyZDMyOS43MjhkNDI5LjA1NmQzNDAuOTkyZDQzMC4wOGQzNTMuMjhkNDMyLjEyOGQzNTMuMjhkNjE4LjQ5NmQ1MjIuMjRkNjE4LjQ5NmQ1MjQuMjg4ZDYyOS43NmQ1MjUuMzEyZDY0MS4wMjRkNTI2LjMzNmQ2NTIuMjg4ZDUyNi4zMzZkNjYzLjU1MmQ1MjYuMzM2ZDY3NC44MTZkNTI1LjMxMmQ2ODYuNTkyZDUyNC4yODhkNjk4LjM2N2Q1MjIuMjRkNzA5LjYzMmQzNTMuMjhkNzA5LjYzMmQzNTMuMjhkODk0Ljk3NmQzNDAuOTkyZDg5Ny4wMjRkMzI5LjcyOGQ4OTguMDQ4ZDMxOC40NjRkODk5LjA3MmQzMDcuMmQ4OTkuMDcyZDI4MS42ZDg5OS4wNzJkMjYyLjE0NGQ4OTQuOTc2ZDI2Mi4xNDRkNzA5LjYzMmhSM2Q2MTQuNFI0ZDUyNi4zMzZSNWQ4OC4wNjRSNmQ1OTUuOTY4UjdkMTI0LjkyOFI4ZDUwNy45MDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWk0M1IxMmQ4OC4wNjRSMTNkNjE0LjRSMTRhaTFpMmkzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTJoZzoxNTVvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE1NVIxMmQwUjEzZDUxMlIxNGFoZzo0Mm9SMWQ5NTguNDY0UjJhZDIxNy4wODhkMjg3Ljc0NGQyMzIuNDQ4ZDI4NC42NzJkMjQ3LjgwOGQyODQuNjcyZDI2My4xNjhkMjg0LjY3MmQyODAuNTc2ZDI4Ny43NDRkMjg4Ljc2OGQ0MjAuODY0ZDI3Ny41MDRkNDIyLjkxMmQyNjcuNzc2ZDQyMy40MjRkMjU4LjA0OGQ0MjMuOTM2ZDI0Ny44MDhkNDIzLjkzNmQyMzcuNTY4ZDQyMy45MzZkMjI3Ljg0ZDQyMy40MjRkMjE4LjExMmQ0MjIuOTEyZDIwOC44OTZkNDIwLjg2NGQyMTcuMDg4ZDI4Ny43NDRkMTg3LjM5MmQ0MzQuMTc1ZDE4MS4yNDhkNDc1LjEzNWQxNjMuODRkNTA5Ljk1MmQzOC45MTJkNDYwLjc5OWQ0My4wMDhkNDI5LjA1NmQ1OS4zOTJkNDAwLjM4NGQxODcuMzkyZDQzNC4xNzVkMTcyLjAzMmQ1MzEuNDU2ZDE4OC40MTZkNTM5LjY0N2QyMDQuOGQ1NTEuNDI0ZDIyMS4xODRkNTYzLjJkMjM2LjU0NGQ1NzcuNTM2ZDE1MS41NTJkNjgwLjk2ZDEzNy4yMTZkNjcyLjc2OGQxMjQuNDE2ZDY2NC4wNjRkMTExLjYxNmQ2NTUuMzZkMTAwLjM1MmQ2NDMuMDcyZDE3Mi4wMzJkNTMxLjQ1NmQ0MzcuMjQ4ZDQwMC4zODRkNDUzLjYzMmQ0MjkuMDU2ZDQ1Ny43MjhkNDYwLjc5OWQzMzIuOGQ1MDkuOTUyZDMxNS4zOTJkNDc1LjEzNWQzMDkuMjQ4ZDQzNC4xNzVkNDM3LjI0OGQ0MDAuMzg0ZDM5Ni4yODhkNjQzLjA3MmQzODUuMDI0ZDY1NS4zNmQzNzIuMjI0ZDY2NC4wNjRkMzU5LjQyNGQ2NzIuNzY4ZDM0NS4wODhkNjgwLjk2ZDI2MC4wOTZkNTc3LjUzNmQyNzUuNDU2ZDU2My4yZDI5MS44NGQ1NTEuNDI0ZDMwOC4yMjRkNTM5LjY0N2QzMjQuNjA4ZDUzMS40NTZkMzk2LjI4OGQ2NDMuMDcyaFIzZDQ5Ni42NFI0ZDQ1Ny43MjhSNWQzOC45MTJSNmQ3MzkuMzI4UjdkMzQzLjA0UjhkNzAwLjQxNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTQyUjEyZDM4LjkxMlIxM2Q0OTYuNjRSMTRhaTFpM2kzaTJpM2kzaTNpM2kyaTFpM2kyaTNpMmkxaTNpM2kyaTNpM2kyaTFpM2kyaTNpMmkxaTNpM2kyaTNpM2kyaGc6MTU0b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNTRSMTJkMFIxM2Q1MTJSMTRhaGc6NDFvUjFkOTU4LjQ2NFIyYWQ1MS4yZDExOTUuMDA4ZDYzLjQ4OGQxMTczLjUwNGQ4My45NjhkMTEzMi4wMzJkMTA0LjQ0OGQxMDkwLjU2ZDEyNC40MTZkMTAzMC4xNDRkMTQ0LjM4NGQ5NjkuNzI4ZDE1OC43MmQ4ODkuODU2ZDE3My4wNTZkODA5Ljk4NGQxNzMuMDU2ZDcxMi43MDRkMTczLjA1NmQ2MTQuNGQxNTguNzJkNTM1LjA0ZDE0NC4zODRkNDU1LjY3OWQxMjQuNDE2ZDM5NC43NTFkMTA0LjQ0OGQzMzMuODIzZDgzLjk2OGQyOTIuMzUyZDYzLjQ4OGQyNTAuODhkNTEuMmQyMjkuMzc1ZDYyLjQ2NGQyMjcuMzI3ZDc1Ljc3NmQyMjYuMzAzZDg5LjA4OGQyMjUuMjc5ZDEwMy40MjRkMjI1LjI3OWQxMTcuNzZkMjI1LjI3OWQxMzAuNTZkMjI2LjMwM2QxNDMuMzZkMjI3LjMyN2QxNTEuNTUyZDIyOS4zNzVkMTc0LjA4ZDI2NS4yMTZkMTk2LjYwOGQzMTQuMzY3ZDIxOS4xMzZkMzYzLjUyZDIzNi41NDRkNDI0Ljk2ZDI1My45NTJkNDg2LjRkMjY0LjcwNGQ1NTkuMTA0ZDI3NS40NTZkNjMxLjgwOGQyNzUuNDU2ZDcxMi43MDRkMjc1LjQ1NmQ3OTMuNmQyNjQuNzA0ZDg2NS43OTJkMjUzLjk1MmQ5MzcuOTg0ZDIzNi41NDRkOTk5LjQyNGQyMTkuMTM2ZDEwNjAuODY0ZDE5Ni42MDhkMTExMC41MjhkMTc0LjA4ZDExNjAuMTkyZDE1MS41NTJkMTE5NS4wMDhkMTQzLjM2ZDExOTcuMDU2ZDEzMS4wNzJkMTE5OC4wOGQxMTguNzg0ZDExOTkuMTA0ZDEwNS40NzJkMTE5OS4xMDRkOTEuMTM2ZDExOTkuMTA0ZDc2LjhkMTE5OC4wOGQ2Mi40NjRkMTE5Ny4wNTZkNTEuMmQxMTk1LjAwOGhSM2QzMjYuNjU2UjRkMjc1LjQ1NlI1ZDUxLjJSNmQ3OTguNzJSN2QtMTc1LjEwNFI4ZDc0Ny41MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTQxUjEyZDUxLjJSMTNkMzI2LjY1NlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE1M29SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTUzUjEyZDBSMTNkNTEyUjE0YWhnOjQwb1IxZDk1OC40NjRSMmFkMTc1LjEwNGQxMTk1LjAwOGQxNTEuNTUyZDExNjAuMTkyZDEyOS41MzZkMTExMC41MjhkMTA3LjUyZDEwNjAuODY0ZDkwLjExMmQ5OTkuNDI0ZDcyLjcwNGQ5MzcuOTg0ZDYxLjk1MmQ4NjUuNzkyZDUxLjJkNzkzLjZkNTEuMmQ3MTIuNzA0ZDUxLjJkNjMxLjgwOGQ2MS45NTJkNTU5LjEwNGQ3Mi43MDRkNDg2LjRkOTAuMTEyZDQyNC45NmQxMDcuNTJkMzYzLjUyZDEyOS41MzZkMzE0LjM2N2QxNTEuNTUyZDI2NS4yMTZkMTc1LjEwNGQyMjkuMzc1ZDE4My4yOTZkMjI3LjMyN2QxOTYuMDk2ZDIyNi4zMDNkMjA4Ljg5NmQyMjUuMjc5ZDIyMy4yMzJkMjI1LjI3OWQyMzcuNTY4ZDIyNS4yNzlkMjUwLjg4ZDIyNi4zMDNkMjY0LjE5MmQyMjcuMzI3ZDI3NS40NTZkMjI5LjM3NWQyNjMuMTY4ZDI1MC44OGQyNDIuNjg4ZDI5Mi4zNTJkMjIyLjIwOGQzMzMuODIzZDIwMi4yNGQzOTQuNzUxZDE4Mi4yNzJkNDU1LjY3OWQxNjcuOTM2ZDUzNS4wNGQxNTMuNmQ2MTQuNGQxNTMuNmQ3MTIuNzA0ZDE1My42ZDgwOS45ODRkMTY3LjkzNmQ4ODkuODU2ZDE4Mi4yNzJkOTY5LjcyOGQyMDIuMjRkMTAzMC4xNDRkMjIyLjIwOGQxMDkwLjU2ZDI0Mi42ODhkMTEzMi4wMzJkMjYzLjE2OGQxMTczLjUwNGQyNzUuNDU2ZDExOTUuMDA4ZDI2NC4xOTJkMTE5Ny4wNTZkMjQ5Ljg1NmQxMTk4LjA4ZDIzNS41MmQxMTk5LjEwNGQyMjEuMTg0ZDExOTkuMTA0ZDIwNy44NzJkMTE5OS4xMDRkMTk1LjU4NGQxMTk4LjA4ZDE4My4yOTZkMTE5Ny4wNTZkMTc1LjEwNGQxMTk1LjAwOGhSM2QzMjYuNjU2UjRkMjc1LjQ1NlI1ZDUxLjJSNmQ3OTguNzJSN2QtMTc1LjEwNFI4ZDc0Ny41MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTQwUjEyZDUxLjJSMTNkMzI2LjY1NlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE1Mm9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTUyUjEyZDBSMTNkNTEyUjE0YWhnOjM5b1IxZDk1OC40NjRSMmFkNjUuNTM2ZDI4Ny43NDRkNzYuOGQyODUuNjk2ZDg5LjZkMjg0LjY3MmQxMDIuNGQyODMuNjQ4ZDExNC42ODhkMjgzLjY0OGQxMjYuOTc2ZDI4My42NDhkMTM5LjI2NGQyODQuNjcyZDE1MS41NTJkMjg1LjY5NmQxNjIuODE2ZDI4Ny43NDRkMTYyLjgxNmQ1NjguMzE5ZDEzOS4yNjRkNTcxLjM5MmQxMTQuNjg4ZDU3MS4zOTJkODguMDY0ZDU3MS4zOTJkNjUuNTM2ZDU2OC4zMTlkNjUuNTM2ZDI4Ny43NDRoUjNkMjI4LjM1MlI0ZDE2Mi44MTZSNWQ2NS41MzZSNmQ3NDAuMzUyUjdkNDUyLjYwOFI4ZDY3NC44MTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkzOVIxMmQ2NS41MzZSMTNkMjI4LjM1MlIxNGFpMWkzaTNpM2kzaTJpM2kzaTJoZzoxNTFvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE1MVIxMmQwUjEzZDUxMlIxNGFoZzozOG9SMWQ5NTguNDY0UjJhZDE4OS40NGQ0NTUuNjc5ZDE4OS40NGQ0OTkuNzEyZDIxOC42MjRkNTI1LjgyNGQyNDcuODA4ZDU1MS45MzVkMzEyLjMyZDU1MS45MzVkNTM1LjU1MmQ1NTEuOTM1ZDYyOS43NmQ0MjIuOTEyZDYzNy45NTJkNDIyLjkxMmQ2MzcuOTUyZDU1MS45MzVkNzcxLjA3MmQ1NTEuOTM1ZDc3NS4xNjhkNTY5LjM0NGQ3NzUuMTY4ZDU5MS44NzJkNzc1LjE2OGQ2MDMuMTM2ZDc3NC4xNDRkNjEzLjg4N2Q3NzMuMTJkNjI0LjY0ZDc3MS4wNzJkNjM0Ljg4ZDYzNy45NTJkNjM0Ljg4ZDYzNy45NTJkNzg2LjQzMmQ2MzcuOTUyZDg0OC44OTZkNjE2LjQ0OGQ4OTZkNTk0Ljk0NGQ5NDMuMTA0ZDU1NS4wMDhkOTc0LjMzNmQ1MTUuMDcyZDEwMDUuNTY4ZDQ1OS4yNjRkMTAyMC45MjhkNDAzLjQ1NmQxMDM2LjI4OGQzMzUuODcyZDEwMzYuMjg4ZDI4MS42ZDEwMzYuMjg4ZDIzMS40MjRkMTAyNGQxODEuMjQ4ZDEwMTEuNzEyZDE0Mi44NDhkOTg1LjA4OGQxMDQuNDQ4ZDk1OC40NjRkODEuOTJkOTE2LjQ4ZDU5LjM5MmQ4NzQuNDk2ZDU5LjM5MmQ4MTUuMTA0ZDU5LjM5MmQ3ODEuMzEyZDY5LjEyZDc0OC41NDRkNzguODQ4ZDcxNS43NzZkOTYuNzY4ZDY4Ny42MTZkMTE0LjY4OGQ2NTkuNDU2ZDEzOC43NTJkNjM4LjQ2NGQxNjIuODE2ZDYxNy40NzJkMTkwLjQ2NGQ2MDYuMjA4ZDE0Ni40MzJkNTg2Ljc1MmQxMTYuMjI0ZDU1MC40ZDg2LjAxNmQ1MTQuMDQ4ZDg2LjAxNmQ0NTIuNjA3ZDg2LjAxNmQ0MDcuNTUyZDEwMy40MjRkMzc0LjI3MWQxMjAuODMyZDM0MC45OTFkMTUwLjUyOGQzMTguOTc2ZDE4MC4yMjRkMjk2Ljk2ZDIyMC42NzJkMjg2LjIwN2QyNjEuMTJkMjc1LjQ1NmQzMDYuMTc2ZDI3NS40NTZkMzMyLjhkMjc1LjQ1NmQzNjUuNTY4ZDI3OS41NTJkMzk4LjMzNmQyODMuNjQ4ZDQzNC4xNzZkMjk1LjkzNmQ0MzMuMTUyZDMxOS40ODdkNDI4LjAzMmQzMzcuNDA4ZDQyMi45MTJkMzU1LjMyOGQ0MTEuNjQ4ZDM3Mi43MzZkMzg1LjAyNGQzNjQuNTQ0ZDM2MC40NDhkMzYwLjk2ZDMzNS44NzJkMzU3LjM3NmQzMTIuMzJkMzU3LjM3NmQyNzguNTI4ZDM1Ny4zNzZkMjU1LjQ4OGQzNjYuMDhkMjMyLjQ0OGQzNzQuNzg0ZDIxNy42ZDM4OC42MDdkMjAyLjc1MmQ0MDIuNDMyZDE5Ni4wOTZkNDE5Ljg0ZDE4OS40NGQ0MzcuMjQ3ZDE4OS40NGQ0NTUuNjc5ZDM0NC4wNjRkOTQ0LjEyOGQ0MDMuNDU2ZDk0NC4xMjhkNDQxLjg1NmQ5MjguNzY4ZDQ4MC4yNTZkOTEzLjQwOGQ1MDEuNzZkODg3LjgwOGQ1MjMuMjY0ZDg2Mi4yMDhkNTMxLjQ1NmQ4MjguNDE1ZDUzOS42NDhkNzk0LjYyNGQ1MzkuNjQ4ZDc1OC43ODRkNTM5LjY0OGQ2MzYuOTI4ZDMzMS43NzZkNjM2LjkyOGQyOTQuOTEyZDYzNi45MjhkMjY1LjIxNmQ2NDkuNzI4ZDIzNS41MmQ2NjIuNTI4ZDIxNS4wNGQ2ODUuMDU2ZDE5NC41NmQ3MDcuNTg0ZDE4My4yOTZkNzM2Ljc2OGQxNzIuMDMyZDc2NS45NTJkMTcyLjAzMmQ3OTguNzJkMTcyLjAzMmQ4NjkuMzc2ZDIxNi4wNjRkOTA2Ljc1MmQyNjAuMDk2ZDk0NC4xMjhkMzQ0LjA2NGQ5NDQuMTI4aFIzZDc3OS4yNjRSNGQ3NzUuMTY4UjVkNTkuMzkyUjZkNzQ4LjU0NFI3ZC0xMi4yODhSOGQ2ODkuMTUyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMzhSMTJkNTkuMzkyUjEzZDc3OS4yNjRSMTRhaTFpM2kzaTJpMmkyaTJpMmkzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaGc6MTUwb1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNTBSMTJkMFIxM2Q1MTJSMTRhaGc6MzdvUjFkOTU4LjQ2NFIyYWQ3MzUuMjMyZDI5OS4wMDhkNzQ3LjUyZDI5Ni45NmQ3NjAuMzJkMjk1LjkzNmQ3NzMuMTJkMjk0LjkxMmQ3ODUuNDA4ZDI5NC45MTJkNzk4LjcyZDI5NC45MTJkODEyLjU0NGQyOTUuOTM2ZDgyNi4zNjhkMjk2Ljk2ZDgzOC42NTZkMjk5LjAwOGQzNDQuMDY0ZDEwMjIuOTc2ZDMyOS43MjhkMTAyNS4wMjNkMzE3LjQ0ZDEwMjYuMDQ4ZDMwNS4xNTJkMTAyNy4wNzFkMjkyLjg2NGQxMDI3LjA3MWQyNjQuMTkyZDEwMjcuMDcxZDI0MC42NGQxMDIyLjk3NmQ3MzUuMjMyZDI5OS4wMDhkOTI5Ljc5MmQ4MTguMTc1ZDkyOS43OTJkNzUwLjU5MmQ5MDYuNzUyZDcxMy4yMTZkODgzLjcxMmQ2NzUuODM5ZDgzMS40ODhkNjc1LjgzOWQ3ODEuMzEyZDY3NS44MzlkNzU3LjI0OGQ3MTMuMjE2ZDczMy4xODRkNzUwLjU5MmQ3MzMuMTg0ZDgxOC4xNzVkNzMzLjE4NGQ4ODYuNzg0ZDc1Ni4yMjRkOTI0LjE2ZDc3OS4yNjRkOTYxLjUzNmQ4MzEuNDg4ZDk2MS41MzZkODgxLjY2NGQ5NjEuNTM2ZDkwNS43MjhkOTI0LjE2ZDkyOS43OTJkODg2Ljc4NGQ5MjkuNzkyZDgxOC4xNzVkNjM4Ljk3NmQ4MTguMTc1ZDYzOC45NzZkNzc0LjE0NGQ2NTAuNzUyZDczNC43MmQ2NjIuNTI4ZDY5NS4yOTZkNjg2LjA4ZDY2NS41OTlkNzA5LjYzMmQ2MzUuOTA0ZDc0NS45ODRkNjE4LjQ5NmQ3ODIuMzM2ZDYwMS4wODhkODMxLjQ4OGQ2MDEuMDg4ZDg4MC42NGQ2MDEuMDg4ZDkxNi40OGQ2MTguNDk2ZDk1Mi4zMmQ2MzUuOTA0ZDk3Ni4zODRkNjY1LjU5OWQxMDAwLjQ0OGQ2OTUuMjk2ZDEwMTIuMjI0ZDczNC43MmQxMDI0ZDc3NC4xNDRkMTAyNGQ4MTguMTc1ZDEwMjRkODYzLjIzMmQxMDEyLjIyNGQ5MDIuNjU2ZDEwMDAuNDQ4ZDk0Mi4wOGQ5NzYuMzg0ZDk3MS4yNjRkOTUyLjMyZDEwMDAuNDQ4ZDkxNi40OGQxMDE3Ljg1NmQ4ODAuNjRkMTAzNS4yNjNkODMxLjQ4OGQxMDM1LjI2M2Q3ODIuMzM2ZDEwMzUuMjYzZDc0NS45ODRkMTAxNy44NTZkNzA5LjYzMmQxMDAwLjQ0OGQ2ODYuMDhkOTcxLjI2NGQ2NjIuNTI4ZDk0Mi4wOGQ2NTAuNzUyZDkwMi42NTZkNjM4Ljk3NmQ4NjMuMjMyZDYzOC45NzZkODE4LjE3NWhSM2QxMDc1LjJSNGQxMDI0UjVkNDUuMDU2UjZkNzM2LjI1NlI3ZC0xMS4yNjRSOGQ2OTEuMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTM3UjEyZDQ1LjA1NlIxM2QxMDc1LjJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTQ5b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNDlSMTJkMFIxM2Q1MTJSMTRhaGc6MzZvUjFkOTU4LjQ2NFIyYWQyODAuNTc2ZDEwMzUuMjYzZDI3NS40NTZkMTAzNi4yODhkMjcyLjM4NGQxMDM2LjI4OGQyNjkuMzEyZDEwMzYuMjg4ZDI2Ni4yNGQxMDM2LjI4OGQyMzQuNDk2ZDEwMzYuMjg4ZDIwOC44OTZkMTAzNC4yNGQxODMuMjk2ZDEwMzIuMTkyZDE2MS4yOGQxMDI4LjA5NmQxMzkuMjY0ZDEwMjRkMTE4Ljc4NGQxMDE3Ljg1NmQ5OC4zMDRkMTAxMS43MTJkNzYuOGQxMDA0LjU0NGQ3OC44NDhkOTgyLjAxNmQ4NS41MDRkOTU4Ljk3NmQ5Mi4xNmQ5MzUuOTM2ZDEwMC4zNTJkOTE0LjQzMmQxMzUuMTY4ZDkyNS42OTZkMTcyLjAzMmQ5MzQuNGQyMDguODk2ZDk0My4xMDRkMjYxLjEyZDk0My4xMDRkMzQ1LjA4OGQ5NDMuMTA0ZDM4Ni4wNDhkOTEwLjMzNmQ0MjcuMDA4ZDg3Ny41NjhkNDI3LjAwOGQ4MjAuMjIzZDQyNy4wMDhkNzkxLjU1MmQ0MTguMzA0ZDc3Mi4wOTZkNDA5LjZkNzUyLjY0ZDM5Mi4xOTJkNzM4LjMwNGQzNzQuNzg0ZDcyMy45NjhkMzQ4LjE2ZDcxMi4xOTJkMzIxLjUzNmQ3MDAuNDE1ZDI4NS42OTZkNjg1LjA1NmQyMzYuNTQ0ZDY2NC41NzZkMjA1LjgyNGQ2NTIuMjg4ZDE4MC4yMjRkNjM2LjkyOGQxNTQuNjI0ZDYyMS41NjhkMTM1LjY4ZDYwMC41NzZkMTE2LjczNmQ1NzkuNTg0ZDEwNi40OTZkNTUwLjkxMmQ5Ni4yNTZkNTIyLjI0ZDk2LjI1NmQ0ODIuMzA0ZDk2LjI1NmQ0MDMuNDU2ZDE0My44NzJkMzUzLjI4ZDE5MS40ODhkMzAzLjEwNGQyODAuNTc2ZDI5MC44MTZkMjgwLjU3NmQxOTEuNDg3ZDI5NS45MzZkMTg3LjM5MWQzMTUuMzkyZDE4Ny4zOTFkMzM1Ljg3MmQxODcuMzkxZDM1Mi4yNTZkMTkxLjQ4N2QzNTIuMjU2ZDI4Ni43MmQzOTUuMjY0ZDI4OC43NjhkNDM2LjczNmQyOTUuOTM2ZDQ3OC4yMDhkMzAzLjEwNGQ1MDcuOTA0ZDMxNC4zNjdkNTAyLjc4NGQzNTcuMzc2ZDQ4NS4zNzZkMzk5LjM2ZDQ1Ny43MjhkMzg5LjEyZDQyMS44ODhkMzgxLjQzOWQzODYuMDQ4ZDM3My43NmQzMzguOTQ0ZDM3My43NmQyNzQuNDMyZDM3My43NmQyMzkuNjE2ZDM5OC4zMzZkMjA0LjhkNDIyLjkxMmQyMDQuOGQ0NzQuMTExZDIwNC44ZDQ5OC42ODhkMjE0LjAxNmQ1MTYuNjA3ZDIyMy4yMzJkNTM0LjUyOGQyNDEuMTUyZDU0OC4zNTJkMjU5LjA3MmQ1NjIuMTc1ZDI4NC4xNmQ1NzMuNDRkMzA5LjI0OGQ1ODQuNzA0ZDM0MC45OTJkNTk4LjAxNmQzNzkuOTA0ZDYxNC40ZDQxNi43NjhkNjI5Ljc2ZDQ0Ni40NjRkNjQ2LjE0NGQ0NzYuMTZkNjYyLjUyOGQ0OTcuMTUyZDY4NS4wNTZkNTE4LjE0NGQ3MDcuNTg0ZDUyOS45MmQ3MzguMzA0ZDU0MS42OTZkNzY5LjAyNGQ1NDEuNjk2ZDgxMy4wNTZkNTQxLjY5NmQ5MDAuMDk2ZDQ5Mi4wMzJkOTU0Ljg4ZDQ0Mi4zNjhkMTAwOS42NjRkMzUyLjI1NmQxMDI3LjA3MWQzNTIuMjU2ZDExNDQuODMyZDM0NC4wNjRkMTE0Ni44OGQzMzQuODQ4ZDExNDcuOTA0ZDMyNS42MzJkMTE0OC45MjhkMzE3LjQ0ZDExNDguOTI4ZDMwOC4yMjRkMTE0OC45MjhkMjk5LjAwOGQxMTQ3LjkwNGQyODkuNzkyZDExNDYuODhkMjgwLjU3NmQxMTQ0LjgzMmQyODAuNTc2ZDEwMzUuMjYzaFIzZDYxNC40UjRkNTQxLjY5NlI1ZDc2LjhSNmQ4MzYuNjA4UjdkLTEyNC45MjhSOGQ3NTkuODA4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMzZSMTJkNzYuOFIxM2Q2MTQuNFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjE0OG9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTQ4UjEyZDBSMTNkNTEyUjE0YWhnOjM1b1IxZDk1OC40NjRSMmFkMTk0LjU2ZDgwOS45ODRkNjcuNTg0ZDgwOS45ODRkNjQuNTEyZDc5MS41NTJkNjQuNTEyZDc3Mi4wOTZkNjQuNTEyZDc2MC44MzJkNjUuNTM2ZDc0OS41NjhkNjYuNTZkNzM4LjMwNGQ2OC42MDhkNzI5LjA4OGQyMDEuNzI4ZDcyOS4wODhkMjE2LjA2NGQ1NjAuMTI3ZDg5LjA4OGQ1NjAuMTI3ZDg0Ljk5MmQ1NDMuNzQzZDg0Ljk5MmQ1MjAuMTkyZDg0Ljk5MmQ0OTcuNjY0ZDg5LjA4OGQ0ODAuMjU2ZDIyMi4yMDhkNDgwLjI1NmQyMzYuNTQ0ZDMxNy40MzlkMjQ4LjgzMmQzMTUuMzkxZDI2MC4wOTZkMzE0Ljg4ZDI3MS4zNmQzMTQuMzY3ZDI4NC42NzJkMzE0LjM2N2QyOTUuOTM2ZDMxNC4zNjdkMzA2LjE3NmQzMTQuMzY3ZDMxNi40MTZkMzE0LjM2N2QzMjcuNjhkMzE2LjQxNWQzMTQuMzY4ZDQ4MC4yNTZkNDg4LjQ0OGQ0ODAuMjU2ZDUwMi43ODRkMzE3LjQzOWQ1MTUuMDcyZDMxNS4zOTFkNTI2LjMzNmQzMTQuODhkNTM3LjZkMzE0LjM2N2Q1NTAuOTEyZDMxNC4zNjdkNTYyLjE3NmQzMTQuMzY3ZDU3Mi45MjhkMzE0LjM2N2Q1ODMuNjhkMzE0LjM2N2Q1OTQuOTQ0ZDMxNi40MTVkNTgwLjYwOGQ0ODAuMjU2ZDcwMC40MTZkNDgwLjI1NmQ3MDMuNDg4ZDQ5OC42ODhkNzAzLjQ4OGQ1MTcuMTJkNzAzLjQ4OGQ1NDAuNjcyZDcwMC40MTZkNTYwLjEyN2Q1NzQuNDY0ZDU2MC4xMjdkNTYwLjEyOGQ3MjkuMDg4ZDY3OC45MTJkNzI5LjA4OGQ2ODAuOTZkNzM3LjI4ZDY4MS45ODRkNzQ3LjUyZDY4My4wMDhkNzU3Ljc2ZDY4My4wMDhkNzY2Ljk3NmQ2ODMuMDA4ZDc3OC4yNGQ2ODEuOTg0ZDc4OS41MDRkNjgwLjk2ZDgwMC43NjhkNjc4LjkxMmQ4MDkuOTg0ZDU1Mi45NmQ4MDkuOTg0ZDUzNy42ZDk5NC4zMDRkNTE0LjA0OGQ5OTcuMzc2ZDQ5Mi41NDRkOTk3LjM3NmQ0NjguOTkyZDk5Ny4zNzZkNDQ3LjQ4OGQ5OTQuMzA0ZDQ2MS44MjRkODA5Ljk4NGQyODcuNzQ0ZDgwOS45ODRkMjczLjQwOGQ5OTQuMzA0ZDI0OC44MzJkOTk3LjM3NmQyMjUuMjhkOTk3LjM3NmQyMDMuNzc2ZDk5Ny4zNzZkMTc5LjJkOTk0LjMwNGQxOTQuNTZkODA5Ljk4NGQ0NjcuOTY4ZDcyOS4wODhkNDgyLjMwNGQ1NjAuMTI3ZDMwNy4yZDU2MC4xMjdkMjkzLjg4OGQ3MjkuMDg4ZDQ2Ny45NjhkNzI5LjA4OGhSM2Q3NTIuNjRSNGQ3MDMuNDg4UjVkNjQuNTEyUjZkNzA5LjYzMlI3ZDI2LjYyNFI4ZDY0NS4xMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTM1UjEyZDY0LjUxMlIxM2Q3NTIuNjRSMTRhaTFpMmkzaTNpM2kyaTJpMmkzaTNpMmkyaTNpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTJpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaTNpM2kyaTJpMmkzaTNpMmkxaTJpMmkyaTJoZzoxNDdvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE0N1IxMmQwUjEzZDUxMlIxNGFoZzozNG9SMWQ5NTguNDY0UjJhZDI2Ni4yNGQyODcuNzQ0ZDI3Ny41MDRkMjg1LjY5NmQyOTAuMzA0ZDI4NC42NzJkMzAzLjEwNGQyODMuNjQ4ZDMxNS4zOTJkMjgzLjY0OGQzMjcuNjhkMjgzLjY0OGQzMzkuOTY4ZDI4NC42NzJkMzUyLjI1NmQyODUuNjk2ZDM2My41MmQyODcuNzQ0ZDM2My41MmQ1NjguMzE5ZDMzOS45NjhkNTcxLjM5MmQzMTUuMzkyZDU3MS4zOTJkMjg4Ljc2OGQ1NzEuMzkyZDI2Ni4yNGQ1NjguMzE5ZDI2Ni4yNGQyODcuNzQ0ZDY1LjUzNmQyODcuNzQ0ZDc2LjhkMjg1LjY5NmQ4OS42ZDI4NC42NzJkMTAyLjRkMjgzLjY0OGQxMTQuNjg4ZDI4My42NDhkMTI2Ljk3NmQyODMuNjQ4ZDEzOS4yNjRkMjg0LjY3MmQxNTEuNTUyZDI4NS42OTZkMTYyLjgxNmQyODcuNzQ0ZDE2Mi44MTZkNTY4LjMxOWQxMzkuMjY0ZDU3MS4zOTJkMTE0LjY4OGQ1NzEuMzkyZDg4LjA2NGQ1NzEuMzkyZDY1LjUzNmQ1NjguMzE5ZDY1LjUzNmQyODcuNzQ0aFIzZDQzMC4wOFI0ZDM2My41MlI1ZDY1LjUzNlI2ZDc0MC4zNTJSN2Q0NTIuNjA4UjhkNjc0LjgxNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTM0UjEyZDY1LjUzNlIxM2Q0MzAuMDhSMTRhaTFpM2kzaTNpM2kyaTNpM2kyaTFpM2kzaTNpM2kyaTNpM2kyaGc6MTQ2b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNDZSMTJkMFIxM2Q1MTJSMTRhaGc6MzNvUjFkOTU4LjQ2NFIyYWQ5NS4yMzJkMjg3Ljc0NGQxMDguNTQ0ZDI4NS42OTZkMTIxLjM0NGQyODQuNjcyZDEzNC4xNDRkMjgzLjY0OGQxNDcuNDU2ZDI4My42NDhkMTYxLjc5MmQyODMuNjQ4ZDE3Ni4xMjhkMjg0LjY3MmQxOTAuNDY0ZDI4NS42OTZkMjA0LjhkMjg3Ljc0NGQxOTguNjU2ZDgwMi44MTZkMTc1LjEwNGQ4MDYuOTEyZDE1MC41MjhkODA2LjkxMmQxMjIuODhkODA2LjkxMmQxMDIuNGQ4MDIuODE2ZDk1LjIzMmQyODcuNzQ0ZDkxLjEzNmQxMDI0ZDg5LjA4OGQxMDA5LjY2NGQ4OC4wNjRkOTk1Ljg0ZDg3LjA0ZDk4Mi4wMTZkODcuMDRkOTY3LjY4ZDg3LjA0ZDk1My4zNDRkODguMDY0ZDkzOC40OTZkODkuMDg4ZDkyMy42NDhkOTEuMTM2ZDkwOS4zMTJkMTA1LjQ3MmQ5MDcuMjY0ZDExOS4yOTZkOTA2LjI0ZDEzMy4xMmQ5MDUuMjE2ZDE0Ny40NTZkOTA1LjIxNmQxNjEuNzkyZDkwNS4yMTZkMTc2LjY0ZDkwNi4yNGQxOTEuNDg4ZDkwNy4yNjRkMjA1LjgyNGQ5MDkuMzEyZDIwNy44NzJkOTIzLjY0OGQyMDguODk2ZDkzNy45ODRkMjA5LjkyZDk1Mi4zMTlkMjA5LjkyZDk2Ni42NTZkMjA5LjkyZDk4MC45OTJkMjA4Ljg5NmQ5OTUuMzI4ZDIwNy44NzJkMTAwOS42NjRkMjA1LjgyNGQxMDI0ZDE5MS40ODhkMTAyNi4wNDhkMTc3LjE1MmQxMDI3LjA3MWQxNjIuODE2ZDEwMjguMDk2ZDE0OC40OGQxMDI4LjA5NmQxMzQuMTQ0ZDEwMjguMDk2ZDExOS44MDhkMTAyNy4wNzFkMTA1LjQ3MmQxMDI2LjA0OGQ5MS4xMzZkMTAyNGhSM2QyOTYuOTZSNGQyMDkuOTJSNWQ4Ny4wNFI2ZDc0MC4zNTJSN2QtNC4wOTZSOGQ2NTMuMzEyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMzNSMTJkODcuMDRSMTNkMjk2Ljk2UjE0YWkxaTNpM2kzaTNpMmkzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNDVvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE0NVIxMmQwUjEzZDUxMlIxNGFoZzozMm9SMWQ5NTguNDY0UjJhaFIzZDI0Mi42ODhSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTMyUjEyZDBSMTNkMjQyLjY4OFIxNGFoZzoxNDRvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE0NFIxMmQwUjEzZDUxMlIxNGFoZzoxNDNvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE0M1IxMmQwUjEzZDUxMlIxNGFoZzoyNTVvUjFkOTU4LjQ2NFIyYWQyNjEuMTJkMTAyNS4wMjNkMjUyLjkyOGQxMDI1LjAyM2QyNDQuMjI0ZDEwMjUuNTM2ZDIzNS41MmQxMDI2LjA0OGQyMjcuMzI4ZDEwMjYuMDQ4ZDIxNy4wODhkMTAyNi4wNDhkMjA1LjgyNGQxMDI1LjUzNmQxOTQuNTZkMTAyNS4wMjNkMTg3LjM5MmQxMDI0ZDEzLjMxMmQ0OTguNjg4ZDI2LjYyNGQ0OTYuNjRkNDAuOTZkNDk2LjEyOGQ1NS4yOTZkNDk1LjYxNmQ2Ny41ODRkNDk1LjYxNmQ4MC44OTZkNDk1LjYxNmQ5Ny4yOGQ0OTYuMTI4ZDExMy42NjRkNDk2LjY0ZDEyNC45MjhkNDk4LjY4OGQyNzAuMzM2ZDk4Ny4xMzZkNDIwLjg2NGQ0OTguNjg4ZDQ0Mi4zNjhkNDk1LjYxNmQ0NzEuMDRkNDk1LjYxNmQ0ODIuMzA0ZDQ5NS42MTZkNDk2LjY0ZDQ5Ni4xMjhkNTEwLjk3NmQ0OTYuNjRkNTI1LjMxMmQ0OTguNjg4ZDMyMS41MzZkMTEzMC40OTZkMzA3LjJkMTE3Mi40OGQyOTEuODRkMTIwMS4xNTJkMjc2LjQ4ZDEyMjkuODI0ZDI1Ny4wMjRkMTI0Ny4yMzJkMjM3LjU2OGQxMjY0LjY0ZDIxMy41MDRkMTI3MS44MDhkMTg5LjQ0ZDEyNzguOTc2ZDE1Ny42OTZkMTI3OC45NzZkMTM0LjE0NGQxMjc4Ljk3NmQxMTEuMTA0ZDEyNzUuMzkyZDg4LjA2NGQxMjcxLjgwOGQ3MC42NTZkMTI2Ni42ODhkNzAuNjU2ZDEyNDMuMTM2ZDc0Ljc1MmQxMjI0LjcwNGQ3OC44NDhkMTIwNi4yNzJkODcuMDRkMTE4Ny44NGQ5Ni4yNTZkMTE5MC45MTJkMTEyLjEyOGQxMTk0LjQ5NmQxMjhkMTE5OC4wOGQxNDYuNDMyZDExOTguMDhkMTU5Ljc0NGQxMTk4LjA4ZDE3MS41MmQxMTk1LjUyZDE4My4yOTZkMTE5Mi45NmQxOTMuNTM2ZDExODUuMjhkMjAzLjc3NmQxMTc3LjZkMjEyLjQ4ZDExNjMuMjY0ZDIyMS4xODRkMTE0OC45MjhkMjI5LjM3NmQxMTI0LjM1MmQyNjEuMTJkMTAyNS4wMjNkMTEzLjY2NGQ0MDUuNTA0ZDExMS42MTZkMzkyLjE5MmQxMTAuNTkyZDM3OS45MDRkMTA5LjU2OGQzNjcuNjE2ZDEwOS41NjhkMzU0LjMwNGQxMDkuNTY4ZDM0Mi4wMTVkMTEwLjU5MmQzMjkuMjE2ZDExMS42MTZkMzE2LjQxNWQxMTMuNjY0ZDMwMy4xMDRkMTI1Ljk1MmQzMDEuMDU2ZDEzOS43NzZkMzAwLjAzMmQxNTMuNmQyOTkuMDA4ZDE2NS44ODhkMjk5LjAwOGQxNzcuMTUyZDI5OS4wMDhkMTkwLjk3NmQzMDAuMDMyZDIwNC44ZDMwMS4wNTZkMjE4LjExMmQzMDMuMTA0ZDIyMi4yMDhkMzI2LjY1NWQyMjIuMjA4ZDM1NC4zMDRkMjIyLjIwOGQzNjYuNTkyZDIyMS4xODRkMzc5LjM5MWQyMjAuMTZkMzkyLjE5MmQyMTguMTEyZDQwNS41MDRkMTkxLjQ4OGQ0MDguNTc2ZDE2NS44ODhkNDA4LjU3NmQxNTQuNjI0ZDQwOC41NzZkMTQwLjI4OGQ0MDguMDYzZDEyNS45NTJkNDA3LjU1MmQxMTMuNjY0ZDQwNS41MDRkMzIyLjU2ZDQwNS41MDRkMzE4LjQ2NGQzODEuOTUyZDMxOC40NjRkMzU0LjMwNGQzMTguNDY0ZDM0Mi4wMTVkMzE5LjQ4OGQzMjkuMjE2ZDMyMC41MTJkMzE2LjQxNWQzMjIuNTZkMzAzLjEwNGQzMzQuODQ4ZDMwMS4wNTZkMzQ4LjY3MmQzMDAuMDMyZDM2Mi40OTZkMjk5LjAwOGQzNzMuNzZkMjk5LjAwOGQzODYuMDQ4ZDI5OS4wMDhkMzk5Ljg3MmQzMDAuMDMyZDQxMy42OTZkMzAxLjA1NmQ0MjcuMDA4ZDMwMy4xMDRkNDMwLjA4ZDMyOS43MjdkNDMwLjA4ZDM1NC4zMDRkNDMwLjA4ZDM3OS45MDRkNDI3LjAwOGQ0MDUuNTA0ZDQwMC4zODRkNDA4LjU3NmQzNzQuNzg0ZDQwOC41NzZkMzYzLjUyZDQwOC41NzZkMzQ5LjE4NGQ0MDguMDYzZDMzNC44NDhkNDA3LjU1MmQzMjIuNTZkNDA1LjUwNGhSM2Q1MzkuNjQ4UjRkNTI1LjMxMlI1ZDEzLjMxMlI2ZDcyNC45OTJSN2QtMjU0Ljk3NlI4ZDcxMS42OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI1NVIxMmQxMy4zMTJSMTNkNTM5LjY0OFIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTQyb1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNDJSMTJkMFIxM2Q1MTJSMTRhaGc6MjU0b1IxZDk1OC40NjRSMmFkNzkuODcyZDI3My40MDhkOTIuMTZkMjcxLjM2ZDEwNS45ODRkMjcwLjg0N2QxMTkuODA4ZDI3MC4zMzZkMTMxLjA3MmQyNzAuMzM2ZDE0Mi4zMzZkMjcwLjMzNmQxNTYuMTZkMjcwLjg0N2QxNjkuOTg0ZDI3MS4zNmQxODEuMjQ4ZDI3My40MDhkMTgxLjI0OGQ1NjUuMjQ4ZDIwMS43MjhkNTM0LjUyOGQyNDAuMTI4ZDUxMC40NjNkMjc4LjUyOGQ0ODYuNGQzMzYuODk2ZDQ4Ni40ZDM4Mi45NzZkNDg2LjRkNDIyLjRkNTAyLjI3MWQ0NjEuODI0ZDUxOC4xNDRkNDg5Ljk4NGQ1NTAuNGQ1MTguMTQ0ZDU4Mi42NTZkNTM0LjAxNmQ2MzEuODA4ZDU0OS44ODhkNjgwLjk2ZDU0OS44ODhkNzQ4LjU0NGQ1NDkuODg4ZDg4My43MTJkNDc2LjY3MmQ5NjBkNDAzLjQ1NmQxMDM2LjI4OGQyNjguMjg4ZDEwMzYuMjg4ZDI0Ni43ODRkMTAzNi4yODhkMjIzLjIzMmQxMDMyLjcwNGQxOTkuNjhkMTAyOS4xMTlkMTgxLjI0OGQxMDI0ZDE4MS4yNDhkMTI2NS42NjRkMTY5Ljk4NGQxMjY3LjcxMmQxNTUuNjQ4ZDEyNjguMjI0ZDE0MS4zMTJkMTI2OC43MzZkMTMxLjA3MmQxMjY4LjczNmQxMTkuODA4ZDEyNjguNzM2ZDEwNS45ODRkMTI2OC4yMjRkOTIuMTZkMTI2Ny43MTJkNzkuODcyZDEyNjUuNjY0ZDc5Ljg3MmQyNzMuNDA4ZDE4MS4yNDhkOTM3Ljk4NGQyMDAuNzA0ZDk0NS4xNTJkMjIxLjY5NmQ5NDguNzM2ZDI0Mi42ODhkOTUyLjMxOWQyNzQuNDMyZDk1Mi4zMTlkMzExLjI5NmQ5NTIuMzE5ZDM0Mi4wMTZkOTQwLjU0NGQzNzIuNzM2ZDkyOC43NjhkMzk0Ljc1MmQ5MDQuMTkyZDQxNi43NjhkODc5LjYxNmQ0MjkuNTY4ZDg0MS43MjhkNDQyLjM2OGQ4MDMuODRkNDQyLjM2OGQ3NTIuNjRkNDQyLjM2OGQ2NzEuNzQzZDQxMi42NzJkNjIzLjYxNmQzODIuOTc2ZDU3NS40ODhkMzE0LjM2OGQ1NzUuNDg4ZDI4OC43NjhkNTc1LjQ4OGQyNjQuNzA0ZDU4NC4xOTJkMjQwLjY0ZDU5Mi44OTZkMjIyLjIwOGQ2MTEuMzI4ZDIwMy43NzZkNjI5Ljc2ZDE5Mi41MTJkNjU3LjkyZDE4MS4yNDhkNjg2LjA3OWQxODEuMjQ4ZDcyNC45OTJkMTgxLjI0OGQ5MzcuOTg0aFIzZDYwNC4xNlI0ZDU0OS44ODhSNWQ3OS44NzJSNmQ3NTMuNjY0UjdkLTI0NC43MzZSOGQ2NzMuNzkyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjU0UjEyZDc5Ljg3MlIxM2Q2MDQuMTZSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MTQxb1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxNDFSMTJkMFIxM2Q1MTJSMTRhaGc6MjUzb1IxZDk1OC40NjRSMmFkMjYxLjEyZDEwMjUuMDIzZDI1Mi45MjhkMTAyNS4wMjNkMjQ0LjIyNGQxMDI1LjUzNmQyMzUuNTJkMTAyNi4wNDhkMjI3LjMyOGQxMDI2LjA0OGQyMTcuMDg4ZDEwMjYuMDQ4ZDIwNS44MjRkMTAyNS41MzZkMTk0LjU2ZDEwMjUuMDIzZDE4Ny4zOTJkMTAyNGQxMy4zMTJkNDk4LjY4OGQyNi42MjRkNDk2LjY0ZDQwLjk2ZDQ5Ni4xMjhkNTUuMjk2ZDQ5NS42MTZkNjcuNTg0ZDQ5NS42MTZkODAuODk2ZDQ5NS42MTZkOTcuMjhkNDk2LjEyOGQxMTMuNjY0ZDQ5Ni42NGQxMjQuOTI4ZDQ5OC42ODhkMjcwLjMzNmQ5ODcuMTM2ZDQyMC44NjRkNDk4LjY4OGQ0NDIuMzY4ZDQ5NS42MTZkNDcxLjA0ZDQ5NS42MTZkNDgyLjMwNGQ0OTUuNjE2ZDQ5Ni42NGQ0OTYuMTI4ZDUxMC45NzZkNDk2LjY0ZDUyNS4zMTJkNDk4LjY4OGQzMjEuNTM2ZDExMzAuNDk2ZDMwNy4yZDExNzIuNDhkMjkxLjg0ZDEyMDEuMTUyZDI3Ni40OGQxMjI5LjgyNGQyNTcuMDI0ZDEyNDcuMjMyZDIzNy41NjhkMTI2NC42NGQyMTMuNTA0ZDEyNzEuODA4ZDE4OS40NGQxMjc4Ljk3NmQxNTcuNjk2ZDEyNzguOTc2ZDEzNC4xNDRkMTI3OC45NzZkMTExLjEwNGQxMjc1LjM5MmQ4OC4wNjRkMTI3MS44MDhkNzAuNjU2ZDEyNjYuNjg4ZDcwLjY1NmQxMjQzLjEzNmQ3NC43NTJkMTIyNC43MDRkNzguODQ4ZDEyMDYuMjcyZDg3LjA0ZDExODcuODRkOTYuMjU2ZDExOTAuOTEyZDExMi4xMjhkMTE5NC40OTZkMTI4ZDExOTguMDhkMTQ2LjQzMmQxMTk4LjA4ZDE1OS43NDRkMTE5OC4wOGQxNzEuNTJkMTE5NS41MmQxODMuMjk2ZDExOTIuOTZkMTkzLjUzNmQxMTg1LjI4ZDIwMy43NzZkMTE3Ny42ZDIxMi40OGQxMTYzLjI2NGQyMjEuMTg0ZDExNDguOTI4ZDIyOS4zNzZkMTEyNC4zNTJkMjYxLjEyZDEwMjUuMDIzZDI4MS42ZDQxNS43NDRkMjcwLjMzNmQ0MTcuNzkyZDI1Ny4wMjRkNDE4LjgxNmQyNDMuNzEyZDQxOS44NGQyMjcuMzI4ZDQxOS44NGQyMTYuMDY0ZDQxOS44NGQyMDQuMjg4ZDQxOC44MTZkMTkyLjUxMmQ0MTcuNzkyZDE4MC4yMjRkNDE1Ljc0NGQyOTcuOTg0ZDI4NS42OTZkMzEzLjM0NGQyODMuNjQ4ZDMyOS43MjhkMjgyLjYyNGQzNDYuMTEyZDI4MS42ZDM2My41MmQyODEuNmQzODEuOTUyZDI4MS42ZDM5Ny4zMTJkMjgyLjYyNGQ0MTIuNjcyZDI4My42NDhkNDI3LjAwOGQyODUuNjk2ZDI4MS42ZDQxNS43NDRoUjNkNTM5LjY0OFI0ZDUyNS4zMTJSNWQxMy4zMTJSNmQ3NDIuNFI3ZC0yNTQuOTc2UjhkNzI5LjA4OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI1M1IxMmQxMy4zMTJSMTNkNTM5LjY0OFIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxNDBvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTE0MFIxMmQwUjEzZDUxMlIxNGFoZzoyNTJvUjFkOTU4LjQ2NFIyYWQ3NS43NzZkNDk4LjY4OGQ4Ny4wNGQ0OTYuNjRkMTAxLjM3NmQ0OTUuNjE2ZDExNS43MTJkNDk0LjU5MmQxMjUuOTUyZDQ5NC41OTJkMTM3LjIxNmQ0OTQuNTkyZDE1MS41NTJkNDk1LjYxNmQxNjUuODg4ZDQ5Ni42NGQxNzcuMTUyZDQ5OC42ODhkMTc3LjE1MmQ3ODYuNDMyZDE3Ny4xNTJkODM1LjU4NGQxODYuMzY4ZDg2Ny44NGQxOTUuNTg0ZDkwMC4wOTZkMjE0LjAxNmQ5MTguNTI4ZDIzMi40NDhkOTM2Ljk2ZDI1OS4wNzJkOTQ0LjEyOGQyODUuNjk2ZDk1MS4yOTZkMzIwLjUxMmQ5NTEuMjk2ZDM3Mi43MzZkOTUxLjI5NmQ0MDkuNmQ5NDAuMDMyZDQwOS42ZDQ5OC42ODhkNDIwLjg2NGQ0OTYuNjRkNDM0LjY4OGQ0OTUuNjE2ZDQ0OC41MTJkNDk0LjU5MmQ0NTkuNzc2ZDQ5NC41OTJkNDcxLjA0ZDQ5NC41OTJkNDg0Ljg2NGQ0OTUuNjE2ZDQ5OC42ODhkNDk2LjY0ZDUwOS45NTJkNDk4LjY4OGQ1MDkuOTUyZDEwMDcuNjE2ZDQ3NC4xMTJkMTAxNy44NTZkNDI0LjQ0OGQxMDI3LjA3MWQzNzQuNzg0ZDEwMzYuMjg4ZDMyMS41MzZkMTAzNi4yODhkMjcxLjM2ZDEwMzYuMjg4ZDIyNi44MTZkMTAyNy41ODRkMTgyLjI3MmQxMDE4Ljg4ZDE0OC40OGQ5OTIuMjU2ZDExNC42ODhkOTY1LjYzMmQ5NS4yMzJkOTE3LjUwNGQ3NS43NzZkODY5LjM3NmQ3NS43NzZkNzkwLjUyOGQ3NS43NzZkNDk4LjY4OGQxNDIuMzM2ZDQwNS41MDRkMTQwLjI4OGQzOTIuMTkyZDEzOS4yNjRkMzc5LjkwNGQxMzguMjRkMzY3LjYxNmQxMzguMjRkMzU0LjMwNGQxMzguMjRkMzQyLjAxNWQxMzkuMjY0ZDMyOS4yMTZkMTQwLjI4OGQzMTYuNDE1ZDE0Mi4zMzZkMzAzLjEwNGQxNTQuNjI0ZDMwMS4wNTZkMTY4LjQ0OGQzMDAuMDMyZDE4Mi4yNzJkMjk5LjAwOGQxOTQuNTZkMjk5LjAwOGQyMDUuODI0ZDI5OS4wMDhkMjE5LjY0OGQzMDAuMDMyZDIzMy40NzJkMzAxLjA1NmQyNDYuNzg0ZDMwMy4xMDRkMjUwLjg4ZDMyNi42NTVkMjUwLjg4ZDM1NC4zMDRkMjUwLjg4ZDM2Ni41OTJkMjQ5Ljg1NmQzNzkuMzkxZDI0OC44MzJkMzkyLjE5MmQyNDYuNzg0ZDQwNS41MDRkMjIwLjE2ZDQwOC41NzZkMTk0LjU2ZDQwOC41NzZkMTgzLjI5NmQ0MDguNTc2ZDE2OC45NmQ0MDguMDYzZDE1NC42MjRkNDA3LjU1MmQxNDIuMzM2ZDQwNS41MDRkMzUxLjIzMmQ0MDUuNTA0ZDM0Ny4xMzZkMzgxLjk1MmQzNDcuMTM2ZDM1NC4zMDRkMzQ3LjEzNmQzNDIuMDE1ZDM0OC4xNmQzMjkuMjE2ZDM0OS4xODRkMzE2LjQxNWQzNTEuMjMyZDMwMy4xMDRkMzYzLjUyZDMwMS4wNTZkMzc3LjM0NGQzMDAuMDMyZDM5MS4xNjhkMjk5LjAwOGQ0MDIuNDMyZDI5OS4wMDhkNDE0LjcyZDI5OS4wMDhkNDI4LjU0NGQzMDAuMDMyZDQ0Mi4zNjhkMzAxLjA1NmQ0NTUuNjhkMzAzLjEwNGQ0NTguNzUyZDMyOS43MjdkNDU4Ljc1MmQzNTQuMzA0ZDQ1OC43NTJkMzc5LjkwNGQ0NTUuNjhkNDA1LjUwNGQ0MjkuMDU2ZDQwOC41NzZkNDAzLjQ1NmQ0MDguNTc2ZDM5Mi4xOTJkNDA4LjU3NmQzNzcuODU2ZDQwOC4wNjNkMzYzLjUyZDQwNy41NTJkMzUxLjIzMmQ0MDUuNTA0aFIzZDU4Ny43NzZSNGQ1MDkuOTUyUjVkNzUuNzc2UjZkNzI0Ljk5MlI3ZC0xMi4yODhSOGQ2NDkuMjE2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjUyUjEyZDc1Ljc3NlIxM2Q1ODcuNzc2UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTM5b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMzlSMTJkMFIxM2Q1MTJSMTRhaGc6MjUxb1IxZDk1OC40NjRSMmFkNzUuNzc2ZDQ5OC42ODhkODcuMDRkNDk2LjY0ZDEwMS4zNzZkNDk1LjYxNmQxMTUuNzEyZDQ5NC41OTJkMTI1Ljk1MmQ0OTQuNTkyZDEzNy4yMTZkNDk0LjU5MmQxNTEuNTUyZDQ5NS42MTZkMTY1Ljg4OGQ0OTYuNjRkMTc3LjE1MmQ0OTguNjg4ZDE3Ny4xNTJkNzg2LjQzMmQxNzcuMTUyZDgzNS41ODRkMTg2LjM2OGQ4NjcuODRkMTk1LjU4NGQ5MDAuMDk2ZDIxNC4wMTZkOTE4LjUyOGQyMzIuNDQ4ZDkzNi45NmQyNTkuMDcyZDk0NC4xMjhkMjg1LjY5NmQ5NTEuMjk2ZDMyMC41MTJkOTUxLjI5NmQzNzIuNzM2ZDk1MS4yOTZkNDA5LjZkOTQwLjAzMmQ0MDkuNmQ0OTguNjg4ZDQyMC44NjRkNDk2LjY0ZDQzNC42ODhkNDk1LjYxNmQ0NDguNTEyZDQ5NC41OTJkNDU5Ljc3NmQ0OTQuNTkyZDQ3MS4wNGQ0OTQuNTkyZDQ4NC44NjRkNDk1LjYxNmQ0OTguNjg4ZDQ5Ni42NGQ1MDkuOTUyZDQ5OC42ODhkNTA5Ljk1MmQxMDA3LjYxNmQ0NzQuMTEyZDEwMTcuODU2ZDQyNC40NDhkMTAyNy4wNzFkMzc0Ljc4NGQxMDM2LjI4OGQzMjEuNTM2ZDEwMzYuMjg4ZDI3MS4zNmQxMDM2LjI4OGQyMjYuODE2ZDEwMjcuNTg0ZDE4Mi4yNzJkMTAxOC44OGQxNDguNDhkOTkyLjI1NmQxMTQuNjg4ZDk2NS42MzJkOTUuMjMyZDkxNy41MDRkNzUuNzc2ZDg2OS4zNzZkNzUuNzc2ZDc5MC41MjhkNzUuNzc2ZDQ5OC42ODhkNDYzLjg3MmQ0MTUuNzQ0ZDQ1NC42NTZkNDE3Ljc5MmQ0NDIuODhkNDE4LjgxNmQ0MzEuMTA0ZDQxOS44NGQ0MTcuNzkyZDQxOS44NGQ0MDQuNDhkNDE5Ljg0ZDM4OC42MDhkNDE4LjgxNmQzNzIuNzM2ZDQxNy43OTJkMzU5LjQyNGQ0MTUuNzQ0ZDI5Mi44NjRkMzMzLjgyM2QyMjYuMzA0ZDQxNS43NDRkMjE1LjA0ZDQxNy43OTJkMjAwLjE5MmQ0MTguODE2ZDE4NS4zNDRkNDE5Ljg0ZDE3Mi4wMzJkNDE5Ljg0ZDE0Mi4zMzZkNDE5Ljg0ZDEyMS44NTZkNDE1Ljc0NGQyMzMuNDcyZDI4NS42OTZkMjQ2Ljc4NGQyODMuNjQ4ZDI2My42OGQyODIuNjI0ZDI4MC41NzZkMjgxLjZkMjk1LjkzNmQyODEuNmQzMDcuMmQyODEuNmQzMjMuMDcyZDI4Mi42MjRkMzM4Ljk0NGQyODMuNjQ4ZDM1My4yOGQyODYuNzJkNDYzLjg3MmQ0MTUuNzQ0aFIzZDU4Ny43NzZSNGQ1MDkuOTUyUjVkNzUuNzc2UjZkNzQyLjRSN2QtMTIuMjg4UjhkNjY2LjYyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI1MVIxMmQ3NS43NzZSMTNkNTg3Ljc3NlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpMmhnOjEzOG9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTM4UjEyZDBSMTNkNTEyUjE0YWhnOjI1MG9SMWQ5NTguNDY0UjJhZDc1Ljc3NmQ0OTguNjg4ZDg3LjA0ZDQ5Ni42NGQxMDEuMzc2ZDQ5NS42MTZkMTE1LjcxMmQ0OTQuNTkyZDEyNS45NTJkNDk0LjU5MmQxMzcuMjE2ZDQ5NC41OTJkMTUxLjU1MmQ0OTUuNjE2ZDE2NS44ODhkNDk2LjY0ZDE3Ny4xNTJkNDk4LjY4OGQxNzcuMTUyZDc4Ni40MzJkMTc3LjE1MmQ4MzUuNTg0ZDE4Ni4zNjhkODY3Ljg0ZDE5NS41ODRkOTAwLjA5NmQyMTQuMDE2ZDkxOC41MjhkMjMyLjQ0OGQ5MzYuOTZkMjU5LjA3MmQ5NDQuMTI4ZDI4NS42OTZkOTUxLjI5NmQzMjAuNTEyZDk1MS4yOTZkMzcyLjczNmQ5NTEuMjk2ZDQwOS42ZDk0MC4wMzJkNDA5LjZkNDk4LjY4OGQ0MjAuODY0ZDQ5Ni42NGQ0MzQuNjg4ZDQ5NS42MTZkNDQ4LjUxMmQ0OTQuNTkyZDQ1OS43NzZkNDk0LjU5MmQ0NzEuMDRkNDk0LjU5MmQ0ODQuODY0ZDQ5NS42MTZkNDk4LjY4OGQ0OTYuNjRkNTA5Ljk1MmQ0OTguNjg4ZDUwOS45NTJkMTAwNy42MTZkNDc0LjExMmQxMDE3Ljg1NmQ0MjQuNDQ4ZDEwMjcuMDcxZDM3NC43ODRkMTAzNi4yODhkMzIxLjUzNmQxMDM2LjI4OGQyNzEuMzZkMTAzNi4yODhkMjI2LjgxNmQxMDI3LjU4NGQxODIuMjcyZDEwMTguODhkMTQ4LjQ4ZDk5Mi4yNTZkMTE0LjY4OGQ5NjUuNjMyZDk1LjIzMmQ5MTcuNTA0ZDc1Ljc3NmQ4NjkuMzc2ZDc1Ljc3NmQ3OTAuNTI4ZDc1Ljc3NmQ0OTguNjg4ZDMyMC41MTJkNDE1Ljc0NGQzMDkuMjQ4ZDQxNy43OTJkMjk1LjkzNmQ0MTguODE2ZDI4Mi42MjRkNDE5Ljg0ZDI2Ni4yNGQ0MTkuODRkMjU0Ljk3NmQ0MTkuODRkMjQzLjJkNDE4LjgxNmQyMzEuNDI0ZDQxNy43OTJkMjE5LjEzNmQ0MTUuNzQ0ZDMzNi44OTZkMjg1LjY5NmQzNTIuMjU2ZDI4My42NDhkMzY4LjY0ZDI4Mi42MjRkMzg1LjAyNGQyODEuNmQ0MDIuNDMyZDI4MS42ZDQyMC44NjRkMjgxLjZkNDM2LjIyNGQyODIuNjI0ZDQ1MS41ODRkMjgzLjY0OGQ0NjUuOTJkMjg1LjY5NmQzMjAuNTEyZDQxNS43NDRoUjNkNTg3Ljc3NlI0ZDUwOS45NTJSNWQ3NS43NzZSNmQ3NDIuNFI3ZC0xMi4yODhSOGQ2NjYuNjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjUwUjEyZDc1Ljc3NlIxM2Q1ODcuNzc2UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxMzdvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTEzN1IxMmQwUjEzZDUxMlIxNGFoZzoyNDlvUjFkOTU4LjQ2NFIyYWQ3NS43NzZkNDk4LjY4OGQ4Ny4wNGQ0OTYuNjRkMTAxLjM3NmQ0OTUuNjE2ZDExNS43MTJkNDk0LjU5MmQxMjUuOTUyZDQ5NC41OTJkMTM3LjIxNmQ0OTQuNTkyZDE1MS41NTJkNDk1LjYxNmQxNjUuODg4ZDQ5Ni42NGQxNzcuMTUyZDQ5OC42ODhkMTc3LjE1MmQ3ODYuNDMyZDE3Ny4xNTJkODM1LjU4NGQxODYuMzY4ZDg2Ny44NGQxOTUuNTg0ZDkwMC4wOTZkMjE0LjAxNmQ5MTguNTI4ZDIzMi40NDhkOTM2Ljk2ZDI1OS4wNzJkOTQ0LjEyOGQyODUuNjk2ZDk1MS4yOTZkMzIwLjUxMmQ5NTEuMjk2ZDM3Mi43MzZkOTUxLjI5NmQ0MDkuNmQ5NDAuMDMyZDQwOS42ZDQ5OC42ODhkNDIwLjg2NGQ0OTYuNjRkNDM0LjY4OGQ0OTUuNjE2ZDQ0OC41MTJkNDk0LjU5MmQ0NTkuNzc2ZDQ5NC41OTJkNDcxLjA0ZDQ5NC41OTJkNDg0Ljg2NGQ0OTUuNjE2ZDQ5OC42ODhkNDk2LjY0ZDUwOS45NTJkNDk4LjY4OGQ1MDkuOTUyZDEwMDcuNjE2ZDQ3NC4xMTJkMTAxNy44NTZkNDI0LjQ0OGQxMDI3LjA3MWQzNzQuNzg0ZDEwMzYuMjg4ZDMyMS41MzZkMTAzNi4yODhkMjcxLjM2ZDEwMzYuMjg4ZDIyNi44MTZkMTAyNy41ODRkMTgyLjI3MmQxMDE4Ljg4ZDE0OC40OGQ5OTIuMjU2ZDExNC42ODhkOTY1LjYzMmQ5NS4yMzJkOTE3LjUwNGQ3NS43NzZkODY5LjM3NmQ3NS43NzZkNzkwLjUyOGQ3NS43NzZkNDk4LjY4OGQxMzIuMDk2ZDI4NS42OTZkMTQ3LjQ1NmQyODMuNjQ4ZDE2Mi44MTZkMjgyLjYyNGQxNzguMTc2ZDI4MS42ZDE5Ni42MDhkMjgxLjZkMjEyLjk5MmQyODEuNmQyMjkuODg4ZDI4Mi42MjRkMjQ2Ljc4NGQyODMuNjQ4ZDI2Mi4xNDRkMjg1LjY5NmQzNzkuOTA0ZDQxNS43NDRkMzU2LjM1MmQ0MTkuODRkMzMxLjc3NmQ0MTkuODRkMzE2LjQxNmQ0MTkuODRkMzAyLjU5MmQ0MTguODE2ZDI4OC43NjhkNDE3Ljc5MmQyNzcuNTA0ZDQxNS43NDRkMTMyLjA5NmQyODUuNjk2aFIzZDU4Ny43NzZSNGQ1MDkuOTUyUjVkNzUuNzc2UjZkNzQyLjRSN2QtMTIuMjg4UjhkNjY2LjYyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI0OVIxMmQ3NS43NzZSMTNkNTg3Ljc3NlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTJpM2kzaTNpMmhnOjEzNm9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTM2UjEyZDBSMTNkNTEyUjE0YWhnOjI0OG9SMWQ5NTguNDY0UjJhZDI5NC45MTJkMTAzNi4yODhkMjExLjk2OGQxMDM2LjI4OGQxNTUuNjQ4ZDk5Ny4zNzZkMTM2LjE5MmQxMDIyLjk3NmQxMTkuODA4ZDEwMjcuMDcxZDk5LjMyOGQxMDI3LjA3MWQ3NS43NzZkMTAyNy4wNzFkNjAuNDE2ZDEwMjRkMTEyLjY0ZDk1Ny40NGQ4MS45MmQ5MjAuNTc2ZDY3LjA3MmQ4NzAuNGQ1Mi4yMjRkODIwLjIyM2Q1Mi4yMjRkNzYxLjg1NmQ1Mi4yMjRkNzAzLjQ4OGQ2Ny4wNzJkNjUzLjMxMmQ4MS45MmQ2MDMuMTM2ZDExMi4xMjhkNTY2LjI3MWQxNDIuMzM2ZDUyOS40MDhkMTg3LjkwNGQ1MDcuOTA0ZDIzMy40NzJkNDg2LjRkMjk0LjkxMmQ0ODYuNGQzNDAuOTkyZDQ4Ni40ZDM3OC4zNjhkNDk5LjJkNDE1Ljc0NGQ1MTJkNDQ0LjQxNmQ1MzQuNTI4ZDQ3MC4wMTZkNTAyLjc4NGQ0ODUuMzc2ZDQ5OC42ODhkNTA3LjkwNGQ0OTguNjg4ZDUzMC40MzJkNDk4LjY4OGQ1NDUuNzkyZDUwMS43NmQ0ODUuMzc2ZDU3Ny41MzZkNTEyZDYxNC40ZDUyNC44ZDY2MC45OTJkNTM3LjZkNzA3LjU4NGQ1MzcuNmQ3NjEuODU2ZDUzNy42ZDgyMC4yMjNkNTIyLjc1MmQ4NzAuNGQ1MDcuOTA0ZDkyMC41NzZkNDc3LjY5NmQ5NTcuNDRkNDQ3LjQ4OGQ5OTQuMzA0ZDQwMS45MmQxMDE1LjI5NmQzNTYuMzUyZDEwMzYuMjg4ZDI5NC45MTJkMTAzNi4yODhkMTU2LjY3MmQ3NjEuODU2ZDE1Ni42NzJkODMyLjUxMmQxNzYuMTI4ZDg3Ny41NjhkMzg4LjA5NmQ2MDYuMjA4ZDM1My4yOGQ1NjkuMzQ0ZDI5NC45MTJkNTY5LjM0NGQyMjQuMjU2ZDU2OS4zNDRkMTkwLjQ2NGQ2MjAuMDMxZDE1Ni42NzJkNjcwLjcyZDE1Ni42NzJkNzYxLjg1NmQyOTQuOTEyZDk1NS4zOTJkMzY1LjU2OGQ5NTUuMzkyZDM5OS44NzJkOTA0LjE5MmQ0MzQuMTc2ZDg1Mi45OTJkNDM0LjE3NmQ3NjEuODU2ZDQzNC4xNzZkNzMyLjE2ZDQzMC41OTJkNzA3LjU4NGQ0MjcuMDA4ZDY4My4wMDhkNDE5Ljg0ZDY2MS41MDRkMjEwLjk0NGQ5MjcuNzQ0ZDI0Mi42ODhkOTU1LjM5MmQyOTQuOTEyZDk1NS4zOTJoUjNkNTkwLjg0OFI0ZDU0NS43OTJSNWQ1Mi4yMjRSNmQ1MzcuNlI3ZC0xMi4yODhSOGQ0ODUuMzc2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjQ4UjEyZDUyLjIyNFIxM2Q1OTAuODQ4UjE0YWkxaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kxaTNpMmkzaTNpM2kxaTNpM2kzaTNpMmkzaGc6MTM1b1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMzVSMTJkMFIxM2Q1MTJSMTRhaGc6MjQ3b1IxZDk1OC40NjRSMmFkMjMzLjQ3MmQ0NzYuMTU5ZDIzMy40NzJkNDQ2LjQ2M2QyNTMuOTUyZDQyNS45ODRkMjc0LjQzMmQ0MDUuNTA0ZDMwNC4xMjhkNDA1LjUwNGQzMzIuOGQ0MDUuNTA0ZDM1My43OTJkNDI1Ljk4NGQzNzQuNzg0ZDQ0Ni40NjNkMzc0Ljc4NGQ0NzYuMTU5ZDM3NC43ODRkNTA1Ljg1NmQzNTMuNzkyZDUyNS44MjRkMzMyLjhkNTQ1Ljc5MWQzMDQuMTI4ZDU0NS43OTFkMjc0LjQzMmQ1NDUuNzkxZDI1My45NTJkNTI1LjgyNGQyMzMuNDcyZDUwNS44NTZkMjMzLjQ3MmQ0NzYuMTU5ZDIzMy40NzJkODQ1LjgyNGQyMzMuNDcyZDgxNy4xNTJkMjUzLjk1MmQ3OTYuMTZkMjc0LjQzMmQ3NzUuMTY4ZDMwNC4xMjhkNzc1LjE2OGQzMzIuOGQ3NzUuMTY4ZDM1My43OTJkNzk2LjE2ZDM3NC43ODRkODE3LjE1MmQzNzQuNzg0ZDg0NS44MjRkMzc0Ljc4NGQ4NzUuNTJkMzUzLjc5MmQ4OTZkMzMyLjhkOTE2LjQ4ZDMwNC4xMjhkOTE2LjQ4ZDI3NC40MzJkOTE2LjQ4ZDI1My45NTJkODk2ZDIzMy40NzJkODc1LjUyZDIzMy40NzJkODQ1LjgyNGQ1MjQuMjg4ZDYxNi40NDhkNTI2LjMzNmQ2MjYuNjg4ZDUyNy4zNmQ2MzkuNDg4ZDUyOC4zODRkNjUyLjI4OGQ1MjguMzg0ZDY2My41NTJkNTI4LjM4NGQ2NzQuODE2ZDUyNy4zNmQ2ODcuNjE2ZDUyNi4zMzZkNzAwLjQxNWQ1MjQuMjg4ZDcwOS42MzJkOTAuMTEyZDcwOS42MzJkODguMDY0ZDcwMC40MTVkODcuNTUyZDY4Ny42MTZkODcuMDRkNjc0LjgxNmQ4Ny4wNGQ2NjMuNTUyZDg3LjA0ZDY1Mi4yODhkODcuNTUyZDYzOS40ODhkODguMDY0ZDYyNi42ODhkOTAuMTEyZDYxNi40NDhkNTI0LjI4OGQ2MTYuNDQ4aFIzZDYxNC40UjRkNTI4LjM4NFI1ZDg3LjA0UjZkNjE4LjQ5NlI3ZDEwNy41MlI4ZDUzMS40NTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyNDdSMTJkODcuMDRSMTNkNjE0LjRSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjEzNG9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTM0UjEyZDBSMTNkNTEyUjE0YWhnOjI0Nm9SMWQ5NTguNDY0UjJhZDI5NC45MTJkMTAzNi4yODhkMjMzLjQ3MmQxMDM2LjI4OGQxODcuMzkyZDEwMTUuMjk2ZDE0MS4zMTJkOTk0LjMwNGQxMTAuNTkyZDk1Ny40NGQ3OS44NzJkOTIwLjU3NmQ2NS4wMjRkODcwLjRkNTAuMTc2ZDgyMC4yMjNkNTAuMTc2ZDc2MS44NTZkNTAuMTc2ZDcwMy40ODhkNjUuMDI0ZDY1My4zMTJkNzkuODcyZDYwMy4xMzZkMTEwLjU5MmQ1NjYuMjcxZDE0MS4zMTJkNTI5LjQwOGQxODcuMzkyZDUwNy45MDRkMjMzLjQ3MmQ0ODYuNGQyOTQuOTEyZDQ4Ni40ZDM1Ni4zNTJkNDg2LjRkNDAyLjQzMmQ1MDcuOTA0ZDQ0OC41MTJkNTI5LjQwOGQ0NzkuMjMyZDU2Ni4yNzFkNTA5Ljk1MmQ2MDMuMTM2ZDUyNC44ZDY1My4zMTJkNTM5LjY0OGQ3MDMuNDg4ZDUzOS42NDhkNzYxLjg1NmQ1MzkuNjQ4ZDgyMC4yMjNkNTI0LjhkODcwLjRkNTA5Ljk1MmQ5MjAuNTc2ZDQ3OS4yMzJkOTU3LjQ0ZDQ0OC41MTJkOTk0LjMwNGQ0MDIuNDMyZDEwMTUuMjk2ZDM1Ni4zNTJkMTAzNi4yODhkMjk0LjkxMmQxMDM2LjI4OGQyOTQuOTEyZDk1NS4zOTJkMzY1LjU2OGQ5NTUuMzkyZDM5OS4zNmQ5MDQuMTkyZDQzMy4xNTJkODUyLjk5MmQ0MzMuMTUyZDc2MS44NTZkNDMzLjE1MmQ2NzAuNzJkMzk5LjM2ZDYyMC4wMzFkMzY1LjU2OGQ1NjkuMzQ0ZDI5NC45MTJkNTY5LjM0NGQyMjQuMjU2ZDU2OS4zNDRkMTkwLjk3NmQ2MjAuMDMxZDE1Ny42OTZkNjcwLjcyZDE1Ny42OTZkNzYxLjg1NmQxNTcuNjk2ZDg1Mi45OTJkMTkwLjk3NmQ5MDQuMTkyZDIyNC4yNTZkOTU1LjM5MmQyOTQuOTEyZDk1NS4zOTJkMTM3LjIxNmQ0MDUuNTA0ZDEzNS4xNjhkMzkyLjE5MmQxMzQuMTQ0ZDM3OS45MDRkMTMzLjEyZDM2Ny42MTZkMTMzLjEyZDM1NC4zMDRkMTMzLjEyZDM0Mi4wMTVkMTM0LjE0NGQzMjkuMjE2ZDEzNS4xNjhkMzE2LjQxNWQxMzcuMjE2ZDMwMy4xMDRkMTQ5LjUwNGQzMDEuMDU2ZDE2My4zMjhkMzAwLjAzMmQxNzcuMTUyZDI5OS4wMDhkMTg5LjQ0ZDI5OS4wMDhkMjAwLjcwNGQyOTkuMDA4ZDIxNC41MjhkMzAwLjAzMmQyMjguMzUyZDMwMS4wNTZkMjQxLjY2NGQzMDMuMTA0ZDI0NS43NmQzMjYuNjU1ZDI0NS43NmQzNTQuMzA0ZDI0NS43NmQzNjYuNTkyZDI0NC43MzZkMzc5LjM5MWQyNDMuNzEyZDM5Mi4xOTJkMjQxLjY2NGQ0MDUuNTA0ZDIxNS4wNGQ0MDguNTc2ZDE4OS40NGQ0MDguNTc2ZDE3OC4xNzZkNDA4LjU3NmQxNjMuODRkNDA4LjA2M2QxNDkuNTA0ZDQwNy41NTJkMTM3LjIxNmQ0MDUuNTA0ZDM0Ni4xMTJkNDA1LjUwNGQzNDIuMDE2ZDM4MS45NTJkMzQyLjAxNmQzNTQuMzA0ZDM0Mi4wMTZkMzQyLjAxNWQzNDMuMDRkMzI5LjIxNmQzNDQuMDY0ZDMxNi40MTVkMzQ2LjExMmQzMDMuMTA0ZDM1OC40ZDMwMS4wNTZkMzcyLjIyNGQzMDAuMDMyZDM4Ni4wNDhkMjk5LjAwOGQzOTcuMzEyZDI5OS4wMDhkNDA5LjZkMjk5LjAwOGQ0MjMuNDI0ZDMwMC4wMzJkNDM3LjI0OGQzMDEuMDU2ZDQ1MC41NmQzMDMuMTA0ZDQ1My42MzJkMzI5LjcyN2Q0NTMuNjMyZDM1NC4zMDRkNDUzLjYzMmQzNzkuOTA0ZDQ1MC41NmQ0MDUuNTA0ZDQyMy45MzZkNDA4LjU3NmQzOTguMzM2ZDQwOC41NzZkMzg3LjA3MmQ0MDguNTc2ZDM3Mi43MzZkNDA4LjA2M2QzNTguNGQ0MDcuNTUyZDM0Ni4xMTJkNDA1LjUwNGhSM2Q1OTAuODQ4UjRkNTM5LjY0OFI1ZDUwLjE3NlI2ZDcyNC45OTJSN2QtMTIuMjg4UjhkNjc0LjgxNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI0NlIxMmQ1MC4xNzZSMTNkNTkwLjg0OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMzNvUjFkOTU4LjQ2NFIyYWhSM2Q1MTJSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTEzM1IxMmQwUjEzZDUxMlIxNGFoZzoyNDVvUjFkOTU4LjQ2NFIyYWQyOTQuOTEyZDEwMzYuMjg4ZDIzMy40NzJkMTAzNi4yODhkMTg3LjM5MmQxMDE1LjI5NmQxNDEuMzEyZDk5NC4zMDRkMTEwLjU5MmQ5NTcuNDRkNzkuODcyZDkyMC41NzZkNjUuMDI0ZDg3MC40ZDUwLjE3NmQ4MjAuMjIzZDUwLjE3NmQ3NjEuODU2ZDUwLjE3NmQ3MDMuNDg4ZDY1LjAyNGQ2NTMuMzEyZDc5Ljg3MmQ2MDMuMTM2ZDExMC41OTJkNTY2LjI3MWQxNDEuMzEyZDUyOS40MDhkMTg3LjM5MmQ1MDcuOTA0ZDIzMy40NzJkNDg2LjRkMjk0LjkxMmQ0ODYuNGQzNTYuMzUyZDQ4Ni40ZDQwMi40MzJkNTA3LjkwNGQ0NDguNTEyZDUyOS40MDhkNDc5LjIzMmQ1NjYuMjcxZDUwOS45NTJkNjAzLjEzNmQ1MjQuOGQ2NTMuMzEyZDUzOS42NDhkNzAzLjQ4OGQ1MzkuNjQ4ZDc2MS44NTZkNTM5LjY0OGQ4MjAuMjIzZDUyNC44ZDg3MC40ZDUwOS45NTJkOTIwLjU3NmQ0NzkuMjMyZDk1Ny40NGQ0NDguNTEyZDk5NC4zMDRkNDAyLjQzMmQxMDE1LjI5NmQzNTYuMzUyZDEwMzYuMjg4ZDI5NC45MTJkMTAzNi4yODhkMjk0LjkxMmQ5NTUuMzkyZDM2NS41NjhkOTU1LjM5MmQzOTkuMzZkOTA0LjE5MmQ0MzMuMTUyZDg1Mi45OTJkNDMzLjE1MmQ3NjEuODU2ZDQzMy4xNTJkNjcwLjcyZDM5OS4zNmQ2MjAuMDMxZDM2NS41NjhkNTY5LjM0NGQyOTQuOTEyZDU2OS4zNDRkMjI0LjI1NmQ1NjkuMzQ0ZDE5MC45NzZkNjIwLjAzMWQxNTcuNjk2ZDY3MC43MmQxNTcuNjk2ZDc2MS44NTZkMTU3LjY5NmQ4NTIuOTkyZDE5MC45NzZkOTA0LjE5MmQyMjQuMjU2ZDk1NS4zOTJkMjk0LjkxMmQ5NTUuMzkyZDExNy43NmQzMzkuOTY3ZDEzMy4xMmQzMTkuNDg3ZDE1Ny42OTZkMzA0LjY0ZDE4Mi4yNzJkMjg5Ljc5MmQyMTYuMDY0ZDI4OS43OTJkMjM3LjU2OGQyODkuNzkyZDI1Ny4wMjRkMjk2Ljk2ZDI3Ni40OGQzMDQuMTI3ZDI5NC40ZDMxMi4zMTlkMzEyLjMyZDMyMC41MTFkMzMwLjc1MmQzMjcuNjc5ZDM0OS4xODRkMzM0Ljg0N2QzNjkuNjY0ZDMzNC44NDdkMzg3LjA3MmQzMzQuODQ3ZDQwMS45MmQzMjguNzAzZDQxNi43NjhkMzIyLjU1OWQ0MzguMjcyZDMwMy4xMDRkNDYwLjhkMzMwLjc1MWQ0NzEuMDRkMzY1LjU2OGQ0NTQuNjU2ZDM4NS4wMjRkNDI5LjU2OGQzOTkuMzZkNDA0LjQ4ZDQxMy42OTZkMzcxLjcxMmQ0MTMuNjk2ZDM1MC4yMDhkNDEzLjY5NmQzMzAuNzUyZDQwNi41MjhkMzExLjI5NmQzOTkuMzZkMjkyLjg2NGQzOTEuMTY4ZDI3NC40MzJkMzgyLjk3NmQyNTYuNTEyZDM3NS44MDhkMjM4LjU5MmQzNjguNjRkMjE5LjEzNmQzNjguNjRkMTk4LjY1NmQzNjguNjRkMTg0LjMyZDM3NS44MDhkMTY5Ljk4NGQzODIuOTc2ZDE0OS41MDRkNDAwLjM4NGQxMzguMjRkMzg2LjA0OGQxMzAuMDQ4ZDM3MS4xOTlkMTIxLjg1NmQzNTYuMzUyZDExNy43NmQzMzkuOTY3aFIzZDU5MC44NDhSNGQ1MzkuNjQ4UjVkNTAuMTc2UjZkNzM0LjIwOFI3ZC0xMi4yODhSOGQ2ODQuMDMyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjQ1UjEyZDUwLjE3NlIxM2Q1OTAuODQ4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTMyb1IxZDk1OC40NjRSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMzJSMTJkMFIxM2Q1MTJSMTRhaGc6MjQ0b1IxZDk1OC40NjRSMmFkMjk0LjkxMmQxMDM2LjI4OGQyMzMuNDcyZDEwMzYuMjg4ZDE4Ny4zOTJkMTAxNS4yOTZkMTQxLjMxMmQ5OTQuMzA0ZDExMC41OTJkOTU3LjQ0ZDc5Ljg3MmQ5MjAuNTc2ZDY1LjAyNGQ4NzAuNGQ1MC4xNzZkODIwLjIyM2Q1MC4xNzZkNzYxLjg1NmQ1MC4xNzZkNzAzLjQ4OGQ2NS4wMjRkNjUzLjMxMmQ3OS44NzJkNjAzLjEzNmQxMTAuNTkyZDU2Ni4yNzFkMTQxLjMxMmQ1MjkuNDA4ZDE4Ny4zOTJkNTA3LjkwNGQyMzMuNDcyZDQ4Ni40ZDI5NC45MTJkNDg2LjRkMzU2LjM1MmQ0ODYuNGQ0MDIuNDMyZDUwNy45MDRkNDQ4LjUxMmQ1MjkuNDA4ZDQ3OS4yMzJkNTY2LjI3MWQ1MDkuOTUyZDYwMy4xMzZkNTI0LjhkNjUzLjMxMmQ1MzkuNjQ4ZDcwMy40ODhkNTM5LjY0OGQ3NjEuODU2ZDUzOS42NDhkODIwLjIyM2Q1MjQuOGQ4NzAuNGQ1MDkuOTUyZDkyMC41NzZkNDc5LjIzMmQ5NTcuNDRkNDQ4LjUxMmQ5OTQuMzA0ZDQwMi40MzJkMTAxNS4yOTZkMzU2LjM1MmQxMDM2LjI4OGQyOTQuOTEyZDEwMzYuMjg4ZDI5NC45MTJkOTU1LjM5MmQzNjUuNTY4ZDk1NS4zOTJkMzk5LjM2ZDkwNC4xOTJkNDMzLjE1MmQ4NTIuOTkyZDQzMy4xNTJkNzYxLjg1NmQ0MzMuMTUyZDY3MC43MmQzOTkuMzZkNjIwLjAzMWQzNjUuNTY4ZDU2OS4zNDRkMjk0LjkxMmQ1NjkuMzQ0ZDIyNC4yNTZkNTY5LjM0NGQxOTAuOTc2ZDYyMC4wMzFkMTU3LjY5NmQ2NzAuNzJkMTU3LjY5NmQ3NjEuODU2ZDE1Ny42OTZkODUyLjk5MmQxOTAuOTc2ZDkwNC4xOTJkMjI0LjI1NmQ5NTUuMzkyZDI5NC45MTJkOTU1LjM5MmQ0NjQuODk2ZDQxNS43NDRkNDU1LjY4ZDQxNy43OTJkNDQzLjkwNGQ0MTguODE2ZDQzMi4xMjhkNDE5Ljg0ZDQxOC44MTZkNDE5Ljg0ZDQwNS41MDRkNDE5Ljg0ZDM4OS42MzJkNDE4LjgxNmQzNzMuNzZkNDE3Ljc5MmQzNjAuNDQ4ZDQxNS43NDRkMjkzLjg4OGQzMzMuODIzZDIyNy4zMjhkNDE1Ljc0NGQyMTYuMDY0ZDQxNy43OTJkMjAxLjIxNmQ0MTguODE2ZDE4Ni4zNjhkNDE5Ljg0ZDE3My4wNTZkNDE5Ljg0ZDE0My4zNmQ0MTkuODRkMTIyLjg4ZDQxNS43NDRkMjM0LjQ5NmQyODUuNjk2ZDI0Ny44MDhkMjgzLjY0OGQyNjQuNzA0ZDI4Mi42MjRkMjgxLjZkMjgxLjZkMjk2Ljk2ZDI4MS42ZDMwOC4yMjRkMjgxLjZkMzI0LjA5NmQyODIuNjI0ZDMzOS45NjhkMjgzLjY0OGQzNTQuMzA0ZDI4Ni43MmQ0NjQuODk2ZDQxNS43NDRoUjNkNTkwLjg0OFI0ZDUzOS42NDhSNWQ1MC4xNzZSNmQ3NDIuNFI3ZC0xMi4yODhSOGQ2OTIuMjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjQ0UjEyZDUwLjE3NlIxM2Q1OTAuODQ4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpMmhnOjEzMW9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTMxUjEyZDBSMTNkNTEyUjE0YWhnOjI0M29SMWQ5NTguNDY0UjJhZDI5NC45MTJkMTAzNi4yODhkMjMzLjQ3MmQxMDM2LjI4OGQxODcuMzkyZDEwMTUuMjk2ZDE0MS4zMTJkOTk0LjMwNGQxMTAuNTkyZDk1Ny40NGQ3OS44NzJkOTIwLjU3NmQ2NS4wMjRkODcwLjRkNTAuMTc2ZDgyMC4yMjNkNTAuMTc2ZDc2MS44NTZkNTAuMTc2ZDcwMy40ODhkNjUuMDI0ZDY1My4zMTJkNzkuODcyZDYwMy4xMzZkMTEwLjU5MmQ1NjYuMjcxZDE0MS4zMTJkNTI5LjQwOGQxODcuMzkyZDUwNy45MDRkMjMzLjQ3MmQ0ODYuNGQyOTQuOTEyZDQ4Ni40ZDM1Ni4zNTJkNDg2LjRkNDAyLjQzMmQ1MDcuOTA0ZDQ0OC41MTJkNTI5LjQwOGQ0NzkuMjMyZDU2Ni4yNzFkNTA5Ljk1MmQ2MDMuMTM2ZDUyNC44ZDY1My4zMTJkNTM5LjY0OGQ3MDMuNDg4ZDUzOS42NDhkNzYxLjg1NmQ1MzkuNjQ4ZDgyMC4yMjNkNTI0LjhkODcwLjRkNTA5Ljk1MmQ5MjAuNTc2ZDQ3OS4yMzJkOTU3LjQ0ZDQ0OC41MTJkOTk0LjMwNGQ0MDIuNDMyZDEwMTUuMjk2ZDM1Ni4zNTJkMTAzNi4yODhkMjk0LjkxMmQxMDM2LjI4OGQyOTQuOTEyZDk1NS4zOTJkMzY1LjU2OGQ5NTUuMzkyZDM5OS4zNmQ5MDQuMTkyZDQzMy4xNTJkODUyLjk5MmQ0MzMuMTUyZDc2MS44NTZkNDMzLjE1MmQ2NzAuNzJkMzk5LjM2ZDYyMC4wMzFkMzY1LjU2OGQ1NjkuMzQ0ZDI5NC45MTJkNTY5LjM0NGQyMjQuMjU2ZDU2OS4zNDRkMTkwLjk3NmQ2MjAuMDMxZDE1Ny42OTZkNjcwLjcyZDE1Ny42OTZkNzYxLjg1NmQxNTcuNjk2ZDg1Mi45OTJkMTkwLjk3NmQ5MDQuMTkyZDIyNC4yNTZkOTU1LjM5MmQyOTQuOTEyZDk1NS4zOTJkMzAxLjA1NmQ0MTUuNzQ0ZDI4OS43OTJkNDE3Ljc5MmQyNzYuNDhkNDE4LjgxNmQyNjMuMTY4ZDQxOS44NGQyNDYuNzg0ZDQxOS44NGQyMzUuNTJkNDE5Ljg0ZDIyMy43NDRkNDE4LjgxNmQyMTEuOTY4ZDQxNy43OTJkMTk5LjY4ZDQxNS43NDRkMzE3LjQ0ZDI4NS42OTZkMzMyLjhkMjgzLjY0OGQzNDkuMTg0ZDI4Mi42MjRkMzY1LjU2OGQyODEuNmQzODIuOTc2ZDI4MS42ZDQwMS40MDhkMjgxLjZkNDE2Ljc2OGQyODIuNjI0ZDQzMi4xMjhkMjgzLjY0OGQ0NDYuNDY0ZDI4NS42OTZkMzAxLjA1NmQ0MTUuNzQ0aFIzZDU5MC44NDhSNGQ1MzkuNjQ4UjVkNTAuMTc2UjZkNzQyLjRSN2QtMTIuMjg4UjhkNjkyLjIyNFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI0M1IxMmQ1MC4xNzZSMTNkNTkwLjg0OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjEzMG9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTMwUjEyZDBSMTNkNTEyUjE0YWhnOjI0Mm9SMWQ5NTguNDY0UjJhZDI5NC45MTJkMTAzNi4yODhkMjMzLjQ3MmQxMDM2LjI4OGQxODcuMzkyZDEwMTUuMjk2ZDE0MS4zMTJkOTk0LjMwNGQxMTAuNTkyZDk1Ny40NGQ3OS44NzJkOTIwLjU3NmQ2NS4wMjRkODcwLjRkNTAuMTc2ZDgyMC4yMjNkNTAuMTc2ZDc2MS44NTZkNTAuMTc2ZDcwMy40ODhkNjUuMDI0ZDY1My4zMTJkNzkuODcyZDYwMy4xMzZkMTEwLjU5MmQ1NjYuMjcxZDE0MS4zMTJkNTI5LjQwOGQxODcuMzkyZDUwNy45MDRkMjMzLjQ3MmQ0ODYuNGQyOTQuOTEyZDQ4Ni40ZDM1Ni4zNTJkNDg2LjRkNDAyLjQzMmQ1MDcuOTA0ZDQ0OC41MTJkNTI5LjQwOGQ0NzkuMjMyZDU2Ni4yNzFkNTA5Ljk1MmQ2MDMuMTM2ZDUyNC44ZDY1My4zMTJkNTM5LjY0OGQ3MDMuNDg4ZDUzOS42NDhkNzYxLjg1NmQ1MzkuNjQ4ZDgyMC4yMjNkNTI0LjhkODcwLjRkNTA5Ljk1MmQ5MjAuNTc2ZDQ3OS4yMzJkOTU3LjQ0ZDQ0OC41MTJkOTk0LjMwNGQ0MDIuNDMyZDEwMTUuMjk2ZDM1Ni4zNTJkMTAzNi4yODhkMjk0LjkxMmQxMDM2LjI4OGQyOTQuOTEyZDk1NS4zOTJkMzY1LjU2OGQ5NTUuMzkyZDM5OS4zNmQ5MDQuMTkyZDQzMy4xNTJkODUyLjk5MmQ0MzMuMTUyZDc2MS44NTZkNDMzLjE1MmQ2NzAuNzJkMzk5LjM2ZDYyMC4wMzFkMzY1LjU2OGQ1NjkuMzQ0ZDI5NC45MTJkNTY5LjM0NGQyMjQuMjU2ZDU2OS4zNDRkMTkwLjk3NmQ2MjAuMDMxZDE1Ny42OTZkNjcwLjcyZDE1Ny42OTZkNzYxLjg1NmQxNTcuNjk2ZDg1Mi45OTJkMTkwLjk3NmQ5MDQuMTkyZDIyNC4yNTZkOTU1LjM5MmQyOTQuOTEyZDk1NS4zOTJkMzkyLjE5MmQyODUuNjk2ZDQwNy41NTJkMjgzLjY0OGQ0MjIuOTEyZDI4Mi42MjRkNDM4LjI3MmQyODEuNmQ0NTYuNzA0ZDI4MS42ZDQ3My4wODhkMjgxLjZkNDg5Ljk4NGQyODIuNjI0ZDUwNi44OGQyODMuNjQ4ZDUyMi4yNGQyODUuNjk2ZDY0MGQ0MTUuNzQ0ZDYxNi40NDhkNDE5Ljg0ZDU5MS44NzJkNDE5Ljg0ZDU3Ni41MTJkNDE5Ljg0ZDU2Mi42ODhkNDE4LjgxNmQ1NDguODY0ZDQxNy43OTJkNTM3LjZkNDE1Ljc0NGQzOTIuMTkyZDI4NS42OTZoUjNkNTkwLjg0OFI0ZDUzOS42NDhSNWQ1MC4xNzZSNmQ3NDIuNFI3ZC0xMi4yODhSOGQ2OTIuMjI0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjQyUjEyZDUwLjE3NlIxM2Q1OTAuODQ4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTJpM2kzaTNpMmhnOjEyOW9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTI5UjEyZDBSMTNkNTEyUjE0YWhnOjI0MW9SMWQ5NTguNDY0UjJhZDgxLjkyZDQ5OC42ODhkOTMuMTg0ZDQ5Ni42NGQxMDMuOTM2ZDQ5NS42MTZkMTE0LjY4OGQ0OTQuNTkyZDEyNS45NTJkNDk0LjU5MmQxMzcuMjE2ZDQ5NC41OTJkMTQ2Ljk0NGQ0OTUuNjE2ZDE1Ni42NzJkNDk2LjY0ZDE2Ny45MzZkNDk4LjY4OGQxNzEuMDA4ZDUxNC4wNDhkMTc0LjA4ZDU0MC4xNmQxNzcuMTUyZDU2Ni4yNzFkMTc3LjE1MmQ1ODMuNjhkMTg3LjM5MmQ1NjYuMjcxZDIwMy4yNjRkNTQ4Ljg2NGQyMTkuMTM2ZDUzMS40NTZkMjM5LjYxNmQ1MTcuNjMyZDI2MC4wOTZkNTAzLjgwOGQyODYuNzJkNDk1LjEwNGQzMTMuMzQ0ZDQ4Ni40ZDM0NS4wODhkNDg2LjRkNDM1LjJkNDg2LjRkNDc4LjIwOGQ1MzguMTEyZDUyMS4yMTZkNTg5LjgyNGQ1MjEuMjE2ZDY5MS4yZDUyMS4yMTZkMTAyNGQ1MDkuOTUyZDEwMjYuMDQ4ZDQ5NS42MTZkMTAyNy4wNzFkNDgxLjI4ZDEwMjguMDk2ZDQ3MC4wMTZkMTAyOC4wOTZkNDU4Ljc1MmQxMDI4LjA5NmQ0NDQuOTI4ZDEwMjcuMDcxZDQzMS4xMDRkMTAyNi4wNDhkNDE5Ljg0ZDEwMjRkNDE5Ljg0ZDcxOC44NDhkNDE5Ljg0ZDY0Ni4xNDRkMzk3LjMxMmQ2MTEuODM5ZDM3NC43ODRkNTc3LjUzNmQzMjUuNjMyZDU3Ny41MzZkMjk2Ljk2ZDU3Ny41MzZkMjcxLjM2ZDU4Ny43NzZkMjQ1Ljc2ZDU5OC4wMTZkMjI2LjMwNGQ2MTkuNTJkMjA2Ljg0OGQ2NDEuMDI0ZDE5NS4wNzJkNjc1LjMyOGQxODMuMjk2ZDcwOS42MzJkMTgzLjI5NmQ3NTcuNzZkMTgzLjI5NmQxMDI0ZDE3Mi4wMzJkMTAyNi4wNDhkMTU4LjIwOGQxMDI3LjA3MWQxNDQuMzg0ZDEwMjguMDk2ZDEzMy4xMmQxMDI4LjA5NmQxMjEuODU2ZDEwMjguMDk2ZDEwNy41MmQxMDI3LjA3MWQ5My4xODRkMTAyNi4wNDhkODEuOTJkMTAyNGQ4MS45MmQ0OTguNjg4ZDEyMC44MzJkMzM5Ljk2N2QxMzYuMTkyZDMxOS40ODdkMTYwLjc2OGQzMDQuNjRkMTg1LjM0NGQyODkuNzkyZDIxOS4xMzZkMjg5Ljc5MmQyNDAuNjRkMjg5Ljc5MmQyNjAuMDk2ZDI5Ni45NmQyNzkuNTUyZDMwNC4xMjdkMjk3LjQ3MmQzMTIuMzE5ZDMxNS4zOTJkMzIwLjUxMWQzMzMuODI0ZDMyNy42NzlkMzUyLjI1NmQzMzQuODQ3ZDM3Mi43MzZkMzM0Ljg0N2QzOTAuMTQ0ZDMzNC44NDdkNDA0Ljk5MmQzMjguNzAzZDQxOS44NGQzMjIuNTU5ZDQ0MS4zNDRkMzAzLjEwNGQ0NjMuODcyZDMzMC43NTFkNDc0LjExMmQzNjUuNTY4ZDQ1Ny43MjhkMzg1LjAyNGQ0MzIuNjRkMzk5LjM2ZDQwNy41NTJkNDEzLjY5NmQzNzQuNzg0ZDQxMy42OTZkMzUzLjI4ZDQxMy42OTZkMzMzLjgyNGQ0MDYuNTI4ZDMxNC4zNjhkMzk5LjM2ZDI5NS45MzZkMzkxLjE2OGQyNzcuNTA0ZDM4Mi45NzZkMjU5LjU4NGQzNzUuODA4ZDI0MS42NjRkMzY4LjY0ZDIyMi4yMDhkMzY4LjY0ZDIwMS43MjhkMzY4LjY0ZDE4Ny4zOTJkMzc1LjgwOGQxNzMuMDU2ZDM4Mi45NzZkMTUyLjU3NmQ0MDAuMzg0ZDE0MS4zMTJkMzg2LjA0OGQxMzMuMTJkMzcxLjE5OWQxMjQuOTI4ZDM1Ni4zNTJkMTIwLjgzMmQzMzkuOTY3aFIzZDU5MS44NzJSNGQ1MjEuMjE2UjVkODEuOTJSNmQ3MzQuMjA4UjdkLTQuMDk2UjhkNjUyLjI4OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTI0MVIxMmQ4MS45MlIxM2Q1OTEuODcyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjEyOG9SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTI4UjEyZDBSMTNkNTEyUjE0YWhnOjI0MG9SMWQ5NTguNDY0UjJhZDI1NmQzODEuOTUyZDIzMi40NDhkMzcwLjY4OGQyMDYuODQ4ZDM2NS4wNTZkMTgxLjI0OGQzNTkuNDI0ZDE1Mi41NzZkMzU1LjMyOGQxNDcuNDU2ZDM0MC45OTFkMTQ3LjQ1NmQzMTkuNDg3ZDE0Ny40NTZkMzA4LjIyM2QxNTAuMDE2ZDI5NC45MTJkMTUyLjU3NmQyODEuNmQxNTYuNjcyZDI3MC4zMzZkMjEwLjk0NGQyNzMuNDA4ZDI1Ny41MzZkMjg3Ljc0NGQzMDQuMTI4ZDMwMi4wOGQzNDMuMDRkMzI1LjYzMWQ0MzMuMTUyZDI2OC4yODhkNDQ1LjQ0ZDI3OC41MjhkNDU1LjE2OGQyOTMuODg4ZDQ2NC44OTZkMzA5LjI0N2Q0NzIuMDY0ZDMyMy41ODNkNDU0LjY1NmQzMzQuODQ3ZDQzNi43MzZkMzQ1LjZkNDE4LjgxNmQzNTYuMzUyZDQwMC4zODRkMzY3LjYxNmQ0NzAuMDE2ZDQzMi4xMjhkNTA1Ljg1NmQ1MjguODk2ZDU0MS42OTZkNjI1LjY2NGQ1NDEuNjk2ZDc0MC4zNTJkNTQxLjY5NmQ4MDcuOTM2ZDUyNi44NDhkODYyLjcyZDUxMmQ5MTcuNTA0ZDQ4MS43OTJkOTU1LjkwNGQ0NTEuNTg0ZDk5NC4zMDRkNDA1LjUwNGQxMDE1LjI5NmQzNTkuNDI0ZDEwMzYuMjg4ZDI5Ni45NmQxMDM2LjI4OGQyMzQuNDk2ZDEwMzYuMjg4ZDE4OC40MTZkMTAxNy4zNDRkMTQyLjMzNmQ5OTguNGQxMTIuMTI4ZDk2NC4wOTZkODEuOTJkOTI5Ljc5MmQ2Ny4wNzJkODgzLjJkNTIuMjI0ZDgzNi42MDhkNTIuMjI0ZDc4MS4zMTJkNTIuMjI0ZDcyNy4wNGQ2Ny4wNzJkNjgwLjQ0OGQ4MS45MmQ2MzMuODU2ZDExMC41OTJkNTk5LjA0ZDEzOS4yNjRkNTY0LjIyM2QxODIuMjcyZDU0NC43NjhkMjI1LjI4ZDUyNS4zMTJkMjgxLjZkNTI1LjMxMmQzMjAuNTEyZDUyNS4zMTJkMzU3LjM3NmQ1MzguMTEyZDM5NC4yNGQ1NTAuOTEyZDQxNy43OTJkNTc0LjQ2NGQzOTcuMzEyZDUyMC4xOTJkMzc1LjI5NmQ0ODMuMzI4ZDM1My4yOGQ0NDYuNDYzZDMyMC41MTJkNDE5Ljg0ZDIyMC4xNmQ0ODIuMzA0ZDIwNy44NzJkNDcxLjAzOWQxOTguNjU2ZDQ1Ni4xOTJkMTg5LjQ0ZDQ0MS4zNDNkMTg0LjMyZDQyNy4wMDhkMjU2ZDM4MS45NTJkMjk2Ljk2ZDk1Ny40NGQzNjguNjRkOTU3LjQ0ZDQwMS40MDhkOTEwLjg0OGQ0MzQuMTc2ZDg2NC4yNTZkNDM0LjE3NmQ3ODEuMzEyZDQzNC4xNzZkNjk0LjI3MWQ0MDEuNDA4ZDY1MC43NTJkMzY4LjY0ZDYwNy4yMzJkMjk2Ljk2ZDYwNy4yMzJkMjI5LjM3NmQ2MDcuMjMyZDE5NC4wNDhkNjUwLjc1MmQxNTguNzJkNjk0LjI3MWQxNTguNzJkNzgxLjMxMmQxNTguNzJkODY0LjI1NmQxOTJkOTEwLjg0OGQyMjUuMjhkOTU3LjQ0ZDI5Ni45NmQ5NTcuNDRoUjNkNTk0Ljk0NFI0ZDU0MS42OTZSNWQ1Mi4yMjRSNmQ3NTUuNzEyUjdkLTEyLjI4OFI4ZDcwMy40ODhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyNDBSMTJkNTIuMjI0UjEzZDU5NC45NDRSMTRhaTFpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2hnOjEyN29SMWQ5NTguNDY0UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTI3UjEyZDBSMTNkNTEyUjE0YWhnOjIzOW9SMWQ5NTguNDY0UjJhZDI1My45NTJkNDA1LjUwNGQyNTEuOTA0ZDM5Mi4xOTJkMjUwLjg4ZDM3OS45MDRkMjQ5Ljg1NmQzNjcuNjE2ZDI0OS44NTZkMzU0LjMwNGQyNDkuODU2ZDM0Mi4wMTVkMjUwLjg4ZDMyOS4yMTZkMjUxLjkwNGQzMTYuNDE1ZDI1My45NTJkMzAzLjEwNGQyNjYuMjRkMzAxLjA1NmQyODAuMDY0ZDMwMC4wMzJkMjkzLjg4OGQyOTkuMDA4ZDMwNi4xNzZkMjk5LjAwOGQzMTcuNDRkMjk5LjAwOGQzMzEuMjY0ZDMwMC4wMzJkMzQ1LjA4OGQzMDEuMDU2ZDM1OC40ZDMwMy4xMDRkMzYyLjQ5NmQzMjYuNjU1ZDM2Mi40OTZkMzU0LjMwNGQzNjIuNDk2ZDM2Ni41OTJkMzYxLjQ3MmQzNzkuMzkxZDM2MC40NDhkMzkyLjE5MmQzNTguNGQ0MDUuNTA0ZDMzMS43NzZkNDA4LjU3NmQzMDYuMTc2ZDQwOC41NzZkMjk0LjkxMmQ0MDguNTc2ZDI4MC41NzZkNDA4LjA2M2QyNjYuMjRkNDA3LjU1MmQyNTMuOTUyZDQwNS41MDRkNDYyLjg0OGQ0MDUuNTA0ZDQ1OC43NTJkMzgxLjk1MmQ0NTguNzUyZDM1NC4zMDRkNDU4Ljc1MmQzNDIuMDE1ZDQ1OS43NzZkMzI5LjIxNmQ0NjAuOGQzMTYuNDE1ZDQ2Mi44NDhkMzAzLjEwNGQ0NzUuMTM2ZDMwMS4wNTZkNDg4Ljk2ZDMwMC4wMzJkNTAyLjc4NGQyOTkuMDA4ZDUxNC4wNDhkMjk5LjAwOGQ1MjYuMzM2ZDI5OS4wMDhkNTQwLjE2ZDMwMC4wMzJkNTUzLjk4NGQzMDEuMDU2ZDU2Ny4yOTZkMzAzLjEwNGQ1NzAuMzY4ZDMyOS43MjdkNTcwLjM2OGQzNTQuMzA0ZDU3MC4zNjhkMzc5LjkwNGQ1NjcuMjk2ZDQwNS41MDRkNTQwLjY3MmQ0MDguNTc2ZDUxNS4wNzJkNDA4LjU3NmQ1MDMuODA4ZDQwOC41NzZkNDg5LjQ3MmQ0MDguMDYzZDQ3NS4xMzZkNDA3LjU1MmQ0NjIuODQ4ZDQwNS41MDRkMTEyLjY0ZDU3OC41NmQ0Ni4wOGQ1NzguNTZkNDQuMDMyZDU3MC4zNjdkNDMuMDA4ZDU1OS42MTZkNDEuOTg0ZDU0OC44NjRkNDEuOTg0ZDUzOC42MjRkNDEuOTg0ZDUyOC4zODRkNDMuMDA4ZDUxNy42MzJkNDQuMDMyZDUwNi44OGQ0Ni4wOGQ0OTguNjg4ZDIxMS45NjhkNDk4LjY4OGQyMTEuOTY4ZDEwMjRkMjAwLjcwNGQxMDI2LjA0OGQxODYuODhkMTAyNy4wNzFkMTczLjA1NmQxMDI4LjA5NmQxNjEuNzkyZDEwMjguMDk2ZDE1MS41NTJkMTAyOC4wOTZkMTM3LjcyOGQxMDI3LjA3MWQxMjMuOTA0ZDEwMjYuMDQ4ZDExMi42NGQxMDI0ZDExMi42NGQ1NzguNTZoUjNkMjk0LjkxMlI0ZDMwOC4yMjRSNWQtMTIuMjg4UjZkNzI0Ljk5MlI3ZC00LjA5NlI4ZDczNy4yOFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIzOVIxMmQtMTIuMjg4UjEzZDI5NC45MTJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjEyNm9SMWQ5NTguNDY0UjJhZDE5LjQ1NmQ2MDUuMTg0ZDM5LjkzNmQ1ODAuNjA4ZDc2LjhkNTYyLjY4OGQxMTMuNjY0ZDU0NC43NjhkMTU0LjYyNGQ1NDQuNzY4ZDE3OC4xNzZkNTQ0Ljc2OGQyMDAuNzA0ZDU1MS40MjRkMjIzLjIzMmQ1NTguMDc5ZDI0Ni4yNzJkNTY1Ljc2ZDI2OS4zMTJkNTczLjQ0ZDI5Mi4zNTJkNTc5LjU4NGQzMTUuMzkyZDU4NS43MjhkMzM4Ljk0NGQ1ODUuNzI4ZDM1OS40MjRkNTg1LjcyOGQzODAuNDE2ZDU3OC41NmQ0MDEuNDA4ZDU3MS4zOTJkNDI3LjAwOGQ1NDcuODM5ZDQ0My4zOTJkNTYzLjJkNDUzLjEyZDU4MS4xMmQ0NjIuODQ4ZDU5OS4wNGQ0NzAuMDE2ZDYxOC40OTZkNDQ2LjQ2NGQ2NDIuMDQ4ZDQxNC43MmQ2NTYuODk2ZDM4Mi45NzZkNjcxLjc0M2QzMzkuOTY4ZDY3MS43NDNkMzE2LjQxNmQ2NzEuNzQzZDI5My4zNzZkNjY1LjU5OWQyNzAuMzM2ZDY1OS40NTZkMjQ3LjI5NmQ2NTEuNzc2ZDIyNC4yNTZkNjQ0LjA5NmQyMDEuMjE2ZDYzNy40NGQxNzguMTc2ZDYzMC43ODRkMTU2LjY3MmQ2MzAuNzg0ZDEzMi4wOTZkNjMwLjc4NGQxMTAuMDhkNjM4Ljk3NmQ4OC4wNjRkNjQ3LjE2OGQ2My40ODhkNjcwLjcyZDMwLjcyZDY0Mi4wNDhkMTkuNDU2ZDYwNS4xODRoUjNkNDg4LjQ0OFI0ZDQ3MC4wMTZSNWQxOS40NTZSNmQ0NzkuMjMyUjdkMzUyLjI1NlI4ZDQ1OS43NzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMjZSMTJkMTkuNDU2UjEzZDQ4OC40NDhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIzOG9SMWQ5NTguNDY0UjJhZDExMi42NGQ1NzguNTZkNDYuMDhkNTc4LjU2ZDQ0LjAzMmQ1NzAuMzY3ZDQzLjAwOGQ1NTkuNjE2ZDQxLjk4NGQ1NDguODY0ZDQxLjk4NGQ1MzguNjI0ZDQxLjk4NGQ1MjguMzg0ZDQzLjAwOGQ1MTcuNjMyZDQ0LjAzMmQ1MDYuODhkNDYuMDhkNDk4LjY4OGQyMTEuOTY4ZDQ5OC42ODhkMjExLjk2OGQxMDI0ZDIwMC43MDRkMTAyNi4wNDhkMTg2Ljg4ZDEwMjcuMDcxZDE3My4wNTZkMTAyOC4wOTZkMTYxLjc5MmQxMDI4LjA5NmQxNTEuNTUyZDEwMjguMDk2ZDEzNy43MjhkMTAyNy4wNzFkMTIzLjkwNGQxMDI2LjA0OGQxMTIuNjRkMTAyNGQxMTIuNjRkNTc4LjU2ZDU4MC42MDhkNDE1Ljc0NGQ1NzEuMzkyZDQxNy43OTJkNTU5LjYxNmQ0MTguODE2ZDU0Ny44NGQ0MTkuODRkNTM0LjUyOGQ0MTkuODRkNTIxLjIxNmQ0MTkuODRkNTA1LjM0NGQ0MTguODE2ZDQ4OS40NzJkNDE3Ljc5MmQ0NzYuMTZkNDE1Ljc0NGQ0MDkuNmQzMzMuODIzZDM0My4wNGQ0MTUuNzQ0ZDMzMS43NzZkNDE3Ljc5MmQzMTYuOTI4ZDQxOC44MTZkMzAyLjA4ZDQxOS44NGQyODguNzY4ZDQxOS44NGQyNTkuMDcyZDQxOS44NGQyMzguNTkyZDQxNS43NDRkMzUwLjIwOGQyODUuNjk2ZDM2My41MmQyODMuNjQ4ZDM4MC40MTZkMjgyLjYyNGQzOTcuMzEyZDI4MS42ZDQxMi42NzJkMjgxLjZkNDIzLjkzNmQyODEuNmQ0MzkuODA4ZDI4Mi42MjRkNDU1LjY4ZDI4My42NDhkNDcwLjAxNmQyODYuNzJkNTgwLjYwOGQ0MTUuNzQ0aFIzZDI5NC45MTJSNGQzMTguNDY0UjVkLTIzLjU1MlI2ZDc0Mi40UjdkLTQuMDk2UjhkNzY1Ljk1MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIzOFIxMmQtMjMuNTUyUjEzZDI5NC45MTJSMTRhaTFpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpMmhnOjEyNW9SMWQ5NTguNDY0UjJhZDI2Ny4yNjRkOTg0LjA2NGQyNjcuMjY0ZDEwMzguMzM2ZDI1Ny4wMjRkMTA3OC4yNzJkMjQ2Ljc4NGQxMTE4LjIwOGQyMjIuMjA4ZDExNDMuODA4ZDE5Ny42MzJkMTE2OS40MDhkMTU3LjE4NGQxMTgxLjY5NmQxMTYuNzM2ZDExOTMuOTg0ZDU1LjI5NmQxMTkzLjk4NGQ1My4yNDhkMTE4My43NDRkNTIuMjI0ZDExNzMuNTA0ZDUxLjJkMTE2My4yNjRkNTEuMmQxMTUzLjAyNGQ1MS4yZDExNDEuNzZkNTIuMjI0ZDExMzIuMDMyZDUzLjI0OGQxMTIyLjMwNGQ1NS4yOTZkMTExMy4wODhkOTMuMTg0ZDExMTMuMDg4ZDExNi4yMjRkMTEwNC4zODRkMTM5LjI2NGQxMDk1LjY4ZDE1MS4wNGQxMDc3LjI0OGQxNjIuODE2ZDEwNTguODE2ZDE2Ni40ZDEwMjkuMTE5ZDE2OS45ODRkOTk5LjQyNGQxNjkuOTg0ZDk1Ny40NGQxNjkuOTg0ZDk1MC4yNzFkMTY5Ljk4NGQ4OTMuOTUyZDE3NC4wOGQ4NTUuMDRkMTc4LjE3NmQ4MTYuMTI3ZDE4OC40MTZkNzkwLjAxNmQxOTguNjU2ZDc2My45MDRkMjE1LjU1MmQ3NDcuMDA4ZDIzMi40NDhkNzMwLjExMmQyNTcuMDI0ZDcxNi44ZDIzMi40NDhkNzA0LjUxMmQyMTUuNTUyZDY4Ny42MTZkMTk4LjY1NmQ2NzAuNzJkMTg4LjQxNmQ2NDQuNjA4ZDE3OC4xNzZkNjE4LjQ5NmQxNzQuMDhkNTc5LjU4NGQxNjkuOTg0ZDU0MC42NzJkMTY5Ljk4NGQ0ODQuMzUyZDE2OS45ODRkNDc4LjIwN2QxNjkuOTg0ZDQzNS4xOTlkMTY2LjRkNDA1LjUwNGQxNjIuODE2ZDM3NS44MDhkMTUxLjA0ZDM1Ni44NjRkMTM5LjI2NGQzMzcuOTE5ZDExNi4yMjRkMzI5LjcyN2Q5My4xODRkMzIxLjUzNWQ1NS4yOTZkMzIxLjUzNWQ1My4yNDhkMzEyLjMxOWQ1Mi4yMjRkMzAyLjU5MmQ1MS4yZDI5Mi44NjRkNTEuMmQyODEuNmQ1MS4yZDI3MC4zMzZkNTIuMjI0ZDI2MC42MDdkNTMuMjQ4ZDI1MC44OGQ1NS4yOTZkMjQwLjY0ZDY5LjYzMmQyNDAuNjRkMTM5LjI2NGQyNDAuNjRkMTc5LjJkMjU5LjU4M2QyMTkuMTM2ZDI3OC41MjhkMjM5LjEwNGQzMTUuOTA0ZDI1OS4wNzJkMzUzLjI4ZDI2My42OGQ0MDguNTc2ZDI2OC4yODhkNDYzLjg3MWQyNjguMjg4ZDUzNi41NzZkMjY4LjI4OGQ1NzEuMzkyZDI3My45MmQ1OTcuNTA0ZDI3OS41NTJkNjIzLjYxNmQyOTEuODRkNjQ0LjA5NmQzMDQuMTI4ZDY2NC41NzZkMzI0LjA5NmQ2ODAuNDQ4ZDM0NC4wNjRkNjk2LjMxOWQzNzEuNzEyZDcxMC42NTZkMzcxLjcxMmQ3MjMuOTY4ZDMzMy44MjRkNzQzLjQyNGQzMTIuODMyZDc2My45MDRkMjkxLjg0ZDc4NC4zODRkMjgxLjZkODEzLjU2OGQyNzEuMzZkODQyLjc1MmQyNjkuMzEyZDg4My43MTJkMjY3LjI2NGQ5MjQuNjcyZDI2Ny4yNjRkOTg0LjA2NGhSM2Q0MjMuOTM2UjRkMzcxLjcxMlI1ZDUxLjJSNmQ3ODMuMzZSN2QtMTY5Ljk4NFI4ZDczMi4xNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTEyNVIxMmQ1MS4yUjEzZDQyMy45MzZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaGc6MjM3b1IxZDk1OC40NjRSMmFkNDE0LjcyZDQxNS43NDRkNDAzLjQ1NmQ0MTcuNzkyZDM5MC4xNDRkNDE4LjgxNmQzNzYuODMyZDQxOS44NGQzNjAuNDQ4ZDQxOS44NGQzNDkuMTg0ZDQxOS44NGQzMzcuNDA4ZDQxOC44MTZkMzI1LjYzMmQ0MTcuNzkyZDMxMy4zNDRkNDE1Ljc0NGQ0MzEuMTA0ZDI4NS42OTZkNDQ2LjQ2NGQyODMuNjQ4ZDQ2Mi44NDhkMjgyLjYyNGQ0NzkuMjMyZDI4MS42ZDQ5Ni42NGQyODEuNmQ1MTUuMDcyZDI4MS42ZDUzMC40MzJkMjgyLjYyNGQ1NDUuNzkyZDI4My42NDhkNTYwLjEyOGQyODUuNjk2ZDQxNC43MmQ0MTUuNzQ0ZDExMi42NGQ1NzguNTZkNDYuMDhkNTc4LjU2ZDQ0LjAzMmQ1NzAuMzY3ZDQzLjAwOGQ1NTkuNjE2ZDQxLjk4NGQ1NDguODY0ZDQxLjk4NGQ1MzguNjI0ZDQxLjk4NGQ1MjguMzg0ZDQzLjAwOGQ1MTcuNjMyZDQ0LjAzMmQ1MDYuODhkNDYuMDhkNDk4LjY4OGQyMTEuOTY4ZDQ5OC42ODhkMjExLjk2OGQxMDI0ZDIwMC43MDRkMTAyNi4wNDhkMTg2Ljg4ZDEwMjcuMDcxZDE3My4wNTZkMTAyOC4wOTZkMTYxLjc5MmQxMDI4LjA5NmQxNTEuNTUyZDEwMjguMDk2ZDEzNy43MjhkMTAyNy4wNzFkMTIzLjkwNGQxMDI2LjA0OGQxMTIuNjRkMTAyNGQxMTIuNjRkNTc4LjU2aFIzZDI5NC45MTJSNGQyOTcuOTg0UjVkNDEuOTg0UjZkNzQyLjRSN2QtNC4wOTZSOGQ3MDAuNDE2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjM3UjEyZDQxLjk4NFIxM2QyOTQuOTEyUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmhnOjEyNG9SMWQ5NTguNDY0UjJhZDEyMC44MzJkMjI5LjM3NWQxMzIuMDk2ZDIyNy4zMjdkMTQ0Ljg5NmQyMjYuMzAzZDE1Ny42OTZkMjI1LjI3OWQxNzEuMDA4ZDIyNS4yNzlkMTgzLjI5NmQyMjUuMjc5ZDE5Ni4wOTZkMjI2LjMwM2QyMDguODk2ZDIyNy4zMjdkMjIwLjE2ZDIyOS4zNzVkMjIwLjE2ZDExOTYuMDMyZDIwOC44OTZkMTE5OC4wOGQxOTYuNjA4ZDExOTkuMTA0ZDE4NC4zMmQxMjAwLjEyOGQxNzEuMDA4ZDEyMDAuMTI4ZDE1Ny42OTZkMTIwMC4xMjhkMTQ0Ljg5NmQxMTk5LjEwNGQxMzIuMDk2ZDExOTguMDhkMTIwLjgzMmQxMTk2LjAzMmQxMjAuODMyZDIyOS4zNzVoUjNkMzQwLjk5MlI0ZDIyMC4xNlI1ZDEyMC44MzJSNmQ3OTguNzJSN2QtMTc2LjEyOFI4ZDY3Ny44ODhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMjRSMTJkMTIwLjgzMlIxM2QzNDAuOTkyUjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoyMzZvUjFkOTU4LjQ2NFIyYWQtMTQuMzM2ZDI4NS42OTZkMS4wMjRkMjgzLjY0OGQxNi4zODRkMjgyLjYyNGQzMS43NDRkMjgxLjZkNTAuMTc2ZDI4MS42ZDY2LjU2ZDI4MS42ZDgzLjQ1NmQyODIuNjI0ZDEwMC4zNTJkMjgzLjY0OGQxMTUuNzEyZDI4NS42OTZkMjMzLjQ3MmQ0MTUuNzQ0ZDIwOS45MmQ0MTkuODRkMTg1LjM0NGQ0MTkuODRkMTY5Ljk4NGQ0MTkuODRkMTU2LjE2ZDQxOC44MTZkMTQyLjMzNmQ0MTcuNzkyZDEzMS4wNzJkNDE1Ljc0NGQtMTQuMzM2ZDI4NS42OTZkMTEyLjY0ZDU3OC41NmQ0Ni4wOGQ1NzguNTZkNDQuMDMyZDU3MC4zNjdkNDMuMDA4ZDU1OS42MTZkNDEuOTg0ZDU0OC44NjRkNDEuOTg0ZDUzOC42MjRkNDEuOTg0ZDUyOC4zODRkNDMuMDA4ZDUxNy42MzJkNDQuMDMyZDUwNi44OGQ0Ni4wOGQ0OTguNjg4ZDIxMS45NjhkNDk4LjY4OGQyMTEuOTY4ZDEwMjRkMjAwLjcwNGQxMDI2LjA0OGQxODYuODhkMTAyNy4wNzFkMTczLjA1NmQxMDI4LjA5NmQxNjEuNzkyZDEwMjguMDk2ZDE1MS41NTJkMTAyOC4wOTZkMTM3LjcyOGQxMDI3LjA3MWQxMjMuOTA0ZDEwMjYuMDQ4ZDExMi42NGQxMDI0ZDExMi42NGQ1NzguNTZoUjNkMjk0LjkxMlI0ZDIzMy40NzJSNWQtMTQuMzM2UjZkNzQyLjRSN2QtNC4wOTZSOGQ3NTYuNzM2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjM2UjEyZC0xNC4zMzZSMTNkMjk0LjkxMlIxNGFpMWkzaTNpM2kzaTJpM2kzaTNpMmkxaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaGc6MTIzb1IxZDk1OC40NjRSMmFkMTU1LjY0OGQ5ODQuMDY0ZDE1NS42NDhkOTI0LjY3MmQxNTMuNmQ4ODMuNzEyZDE1MS41NTJkODQyLjc1MmQxNDEuMzEyZDgxMy41NjhkMTMxLjA3MmQ3ODQuMzg0ZDExMC4wOGQ3NjMuOTA0ZDg5LjA4OGQ3NDMuNDI0ZDUxLjJkNzIzLjk2OGQ1MS4yZDcxMC42NTZkNzguODQ4ZDY5Ni4zMTlkOTguODE2ZDY4MC40NDhkMTE4Ljc4NGQ2NjQuNTc2ZDEzMS4wNzJkNjQ0LjA5NmQxNDMuMzZkNjIzLjYxNmQxNDguOTkyZDU5Ny41MDRkMTU0LjYyNGQ1NzEuMzkyZDE1NC42MjRkNTM2LjU3NmQxNTQuNjI0ZDQ2My44NzFkMTU5LjIzMmQ0MDguNTc2ZDE2My44NGQzNTMuMjhkMTgzLjgwOGQzMTUuOTA0ZDIwMy43NzZkMjc4LjUyOGQyNDMuNzEyZDI1OS41ODNkMjgzLjY0OGQyNDAuNjRkMzUzLjI4ZDI0MC42NGQzNjcuNjE2ZDI0MC42NGQzNjkuNjY0ZDI1MC44OGQzNzAuNjg4ZDI2MC42MDdkMzcxLjcxMmQyNzAuMzM2ZDM3MS43MTJkMjgxLjZkMzcxLjcxMmQyOTIuODY0ZDM3MC42ODhkMzAyLjU5MmQzNjkuNjY0ZDMxMi4zMTlkMzY3LjYxNmQzMjEuNTM1ZDMyOC43MDRkMzIxLjUzNWQzMDYuMTc2ZDMyOS43MjdkMjgzLjY0OGQzMzcuOTE5ZDI3MS44NzJkMzU2Ljg2NGQyNjAuMDk2ZDM3NS44MDhkMjU2LjUxMmQ0MDUuNTA0ZDI1Mi45MjhkNDM1LjE5OWQyNTIuOTI4ZDQ3OC4yMDdkMjUyLjkyOGQ0ODQuMzUyZDI1Mi45MjhkNTQwLjY3MmQyNDguODMyZDU3OS41ODRkMjQ0LjczNmQ2MTguNDk2ZDIzNC40OTZkNjQ0LjYwOGQyMjQuMjU2ZDY3MC43MmQyMDcuMzZkNjg3LjYxNmQxOTAuNDY0ZDcwNC41MTJkMTY1Ljg4OGQ3MTYuOGQxOTAuNDY0ZDczMC4xMTJkMjA3LjM2ZDc0Ny4wMDhkMjI0LjI1NmQ3NjMuOTA0ZDIzNC40OTZkNzkwLjAxNmQyNDQuNzM2ZDgxNi4xMjdkMjQ4LjgzMmQ4NTUuMDRkMjUyLjkyOGQ4OTMuOTUyZDI1Mi45MjhkOTUwLjI3MWQyNTIuOTI4ZDk1Ny40NGQyNTIuOTI4ZDk5OS40MjRkMjU2LjUxMmQxMDI5LjExOWQyNjAuMDk2ZDEwNTguODE2ZDI3MS44NzJkMTA3Ny4yNDhkMjgzLjY0OGQxMDk1LjY4ZDMwNi4xNzZkMTEwNC4zODRkMzI4LjcwNGQxMTEzLjA4OGQzNjcuNjE2ZDExMTMuMDg4ZDM2OS42NjRkMTEyMi4zMDRkMzcwLjY4OGQxMTMyLjAzMmQzNzEuNzEyZDExNDEuNzZkMzcxLjcxMmQxMTUzLjAyNGQzNzEuNzEyZDExNjMuMjY0ZDM3MC42ODhkMTE3My41MDRkMzY5LjY2NGQxMTgzLjc0NGQzNjcuNjE2ZDExOTMuOTg0ZDMwNi4xNzZkMTE5My45ODRkMjY1LjcyOGQxMTgxLjY5NmQyMjUuMjhkMTE2OS40MDhkMjAwLjcwNGQxMTQzLjgwOGQxNzYuMTI4ZDExMTguMjA4ZDE2NS44ODhkMTA3OC4yNzJkMTU1LjY0OGQxMDM4LjMzNmQxNTUuNjQ4ZDk4NC4wNjRoUjNkNDIzLjkzNlI0ZDM3MS43MTJSNWQ1MS4yUjZkNzgzLjM2UjdkLTE2OS45ODRSOGQ3MzIuMTZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMjNSMTJkNTEuMlIxM2Q0MjMuOTM2UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIzNW9SMWQ5NTguNDY0UjJhZDE1OC43MmQ3ODYuNDMyZDE2MC43NjhkODcyLjQ0OGQyMDMuMjY0ZDkxMi4zODRkMjQ1Ljc2ZDk1Mi4zMTlkMzI4LjcwNGQ5NTIuMzE5ZDQwMS40MDhkOTUyLjMxOWQ0NjYuOTQ0ZDkyNi43MmQ0NzUuMTM2ZDk0Mi4wOGQ0ODAuMjU2ZDk2NC4wOTZkNDg1LjM3NmQ5ODYuMTEyZDQ4Ni40ZDEwMDcuNjE2ZDQ1Mi42MDhkMTAyMS45NTJkNDEyLjE2ZDEwMjkuMTE5ZDM3MS43MTJkMTAzNi4yODhkMzIyLjU2ZDEwMzYuMjg4ZDI1MC44OGQxMDM2LjI4OGQxOTkuNjhkMTAxNi4zMmQxNDguNDhkOTk2LjM1MmQxMTUuMmQ5NjBkODEuOTJkOTIzLjY0OGQ2Ni41NmQ4NzMuOTg0ZDUxLjJkODI0LjMxOWQ1MS4yZDc2NC45MjhkNTEuMmQ3MDYuNTZkNjYuMDQ4ZDY1NS44NzJkODAuODk2ZDYwNS4xODRkMTExLjYxNmQ1NjcuODA4ZDE0Mi4zMzZkNTMwLjQzMmQxODguOTI4ZDUwOC40MTVkMjM1LjUyZDQ4Ni40ZDI5OS4wMDhkNDg2LjRkMzUzLjI4ZDQ4Ni40ZDM5NC4yNGQ1MDQuODMyZDQzNS4yZDUyMy4yNjRkNDYyLjg0OGQ1NTUuNTJkNDkwLjQ5NmQ1ODcuNzc2ZDUwNC44MzJkNjMyLjMxOWQ1MTkuMTY4ZDY3Ni44NjRkNTE5LjE2OGQ3MjkuMDg4ZDUxOS4xNjhkNzQzLjQyNGQ1MTguMTQ0ZDc1OS4yOTZkNTE3LjEyZDc3NS4xNjhkNTE2LjA5NmQ3ODYuNDMyZDE1OC43MmQ3ODYuNDMyZDQxOC44MTZkNzEwLjY1NmQ0MTguODE2ZDY4MS45ODNkNDExLjEzNmQ2NTUuODcyZDQwMy40NTZkNjI5Ljc2ZDM4OC42MDhkNjEwLjMwNGQzNzMuNzZkNTkwLjg0OGQzNTAuNzJkNTc5LjA3MmQzMjcuNjhkNTY3LjI5NmQyOTUuOTM2ZDU2Ny4yOTZkMjMzLjQ3MmQ1NjcuMjk2ZDIwMC4xOTJkNjA1LjE4NGQxNjYuOTEyZDY0My4wNzJkMTU5Ljc0NGQ3MTAuNjU2ZDQxOC44MTZkNzEwLjY1NmQxMzIuMDk2ZDQwNS41MDRkMTMwLjA0OGQzOTIuMTkyZDEyOS4wMjRkMzc5LjkwNGQxMjhkMzY3LjYxNmQxMjhkMzU0LjMwNGQxMjhkMzQyLjAxNWQxMjkuMDI0ZDMyOS4yMTZkMTMwLjA0OGQzMTYuNDE1ZDEzMi4wOTZkMzAzLjEwNGQxNDQuMzg0ZDMwMS4wNTZkMTU4LjIwOGQzMDAuMDMyZDE3Mi4wMzJkMjk5LjAwOGQxODQuMzJkMjk5LjAwOGQxOTUuNTg0ZDI5OS4wMDhkMjA5LjQwOGQzMDAuMDMyZDIyMy4yMzJkMzAxLjA1NmQyMzYuNTQ0ZDMwMy4xMDRkMjQwLjY0ZDMyNi42NTVkMjQwLjY0ZDM1NC4zMDRkMjQwLjY0ZDM2Ni41OTJkMjM5LjYxNmQzNzkuMzkxZDIzOC41OTJkMzkyLjE5MmQyMzYuNTQ0ZDQwNS41MDRkMjA5LjkyZDQwOC41NzZkMTg0LjMyZDQwOC41NzZkMTczLjA1NmQ0MDguNTc2ZDE1OC43MmQ0MDguMDYzZDE0NC4zODRkNDA3LjU1MmQxMzIuMDk2ZDQwNS41MDRkMzQwLjk5MmQ0MDUuNTA0ZDMzNi44OTZkMzgxLjk1MmQzMzYuODk2ZDM1NC4zMDRkMzM2Ljg5NmQzNDIuMDE1ZDMzNy45MmQzMjkuMjE2ZDMzOC45NDRkMzE2LjQxNWQzNDAuOTkyZDMwMy4xMDRkMzUzLjI4ZDMwMS4wNTZkMzY3LjEwNGQzMDAuMDMyZDM4MC45MjhkMjk5LjAwOGQzOTIuMTkyZDI5OS4wMDhkNDA0LjQ4ZDI5OS4wMDhkNDE4LjMwNGQzMDAuMDMyZDQzMi4xMjhkMzAxLjA1NmQ0NDUuNDRkMzAzLjEwNGQ0NDguNTEyZDMyOS43MjdkNDQ4LjUxMmQzNTQuMzA0ZDQ0OC41MTJkMzc5LjkwNGQ0NDUuNDRkNDA1LjUwNGQ0MTguODE2ZDQwOC41NzZkMzkzLjIxNmQ0MDguNTc2ZDM4MS45NTJkNDA4LjU3NmQzNjcuNjE2ZDQwOC4wNjNkMzUzLjI4ZDQwNy41NTJkMzQwLjk5MmQ0MDUuNTA0aFIzZDU3MC4zNjhSNGQ1MTkuMTY4UjVkNTEuMlI2ZDcyNC45OTJSN2QtMTIuMjg4UjhkNjczLjc5MlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIzNVIxMmQ1MS4yUjEzZDU3MC4zNjhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjEyMm9SMWQ5NTguNDY0UjJhZDI5LjY5NmQxMDA5LjY2NGQzMDYuMTc2ZDU3OS41ODRkNjIuNDY0ZDU3OS41ODRkNTkuMzkyZDU2MS4xNTJkNTkuMzkyZDUzOC42MjRkNTkuMzkyZDUxNy4xMmQ2Mi40NjRkNDk4LjY4OGQ0NTYuNzA0ZDQ5OC42ODhkNDYxLjgyNGQ1MTJkMTgzLjI5NmQ5NDMuMTA0ZDQ0NC40MTZkOTQzLjEwNGQ0NDcuNDg4ZDk2My41ODRkNDQ3LjQ4OGQ5ODUuMDg4ZDQ0Ny40ODhkMTAwNS41NjhkNDQ0LjQxNmQxMDI0ZDM0LjgxNmQxMDI0ZDI5LjY5NmQxMDA5LjY2NGhSM2Q0ODguNDQ4UjRkNDYxLjgyNFI1ZDI5LjY5NlI2ZDUyNS4zMTJSN2QwUjhkNDk1LjYxNlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTEyMlIxMmQyOS42OTZSMTNkNDg4LjQ0OFIxNGFpMWkyaTJpM2kzaTJpMmkyaTJpM2kzaTJpMmhnOjIzNG9SMWQ5NTguNDY0UjJhZDE1OC43MmQ3ODYuNDMyZDE2MC43NjhkODcyLjQ0OGQyMDMuMjY0ZDkxMi4zODRkMjQ1Ljc2ZDk1Mi4zMTlkMzI4LjcwNGQ5NTIuMzE5ZDQwMS40MDhkOTUyLjMxOWQ0NjYuOTQ0ZDkyNi43MmQ0NzUuMTM2ZDk0Mi4wOGQ0ODAuMjU2ZDk2NC4wOTZkNDg1LjM3NmQ5ODYuMTEyZDQ4Ni40ZDEwMDcuNjE2ZDQ1Mi42MDhkMTAyMS45NTJkNDEyLjE2ZDEwMjkuMTE5ZDM3MS43MTJkMTAzNi4yODhkMzIyLjU2ZDEwMzYuMjg4ZDI1MC44OGQxMDM2LjI4OGQxOTkuNjhkMTAxNi4zMmQxNDguNDhkOTk2LjM1MmQxMTUuMmQ5NjBkODEuOTJkOTIzLjY0OGQ2Ni41NmQ4NzMuOTg0ZDUxLjJkODI0LjMxOWQ1MS4yZDc2NC45MjhkNTEuMmQ3MDYuNTZkNjYuMDQ4ZDY1NS44NzJkODAuODk2ZDYwNS4xODRkMTExLjYxNmQ1NjcuODA4ZDE0Mi4zMzZkNTMwLjQzMmQxODguOTI4ZDUwOC40MTVkMjM1LjUyZDQ4Ni40ZDI5OS4wMDhkNDg2LjRkMzUzLjI4ZDQ4Ni40ZDM5NC4yNGQ1MDQuODMyZDQzNS4yZDUyMy4yNjRkNDYyLjg0OGQ1NTUuNTJkNDkwLjQ5NmQ1ODcuNzc2ZDUwNC44MzJkNjMyLjMxOWQ1MTkuMTY4ZDY3Ni44NjRkNTE5LjE2OGQ3MjkuMDg4ZDUxOS4xNjhkNzQzLjQyNGQ1MTguMTQ0ZDc1OS4yOTZkNTE3LjEyZDc3NS4xNjhkNTE2LjA5NmQ3ODYuNDMyZDE1OC43MmQ3ODYuNDMyZDQxOC44MTZkNzEwLjY1NmQ0MTguODE2ZDY4MS45ODNkNDExLjEzNmQ2NTUuODcyZDQwMy40NTZkNjI5Ljc2ZDM4OC42MDhkNjEwLjMwNGQzNzMuNzZkNTkwLjg0OGQzNTAuNzJkNTc5LjA3MmQzMjcuNjhkNTY3LjI5NmQyOTUuOTM2ZDU2Ny4yOTZkMjMzLjQ3MmQ1NjcuMjk2ZDIwMC4xOTJkNjA1LjE4NGQxNjYuOTEyZDY0My4wNzJkMTU5Ljc0NGQ3MTAuNjU2ZDQxOC44MTZkNzEwLjY1NmQ0NjMuODcyZDQxNS43NDRkNDU0LjY1NmQ0MTcuNzkyZDQ0Mi44OGQ0MTguODE2ZDQzMS4xMDRkNDE5Ljg0ZDQxNy43OTJkNDE5Ljg0ZDQwNC40OGQ0MTkuODRkMzg4LjYwOGQ0MTguODE2ZDM3Mi43MzZkNDE3Ljc5MmQzNTkuNDI0ZDQxNS43NDRkMjkyLjg2NGQzMzMuODIzZDIyNi4zMDRkNDE1Ljc0NGQyMTUuMDRkNDE3Ljc5MmQyMDAuMTkyZDQxOC44MTZkMTg1LjM0NGQ0MTkuODRkMTcyLjAzMmQ0MTkuODRkMTQyLjMzNmQ0MTkuODRkMTIxLjg1NmQ0MTUuNzQ0ZDIzMy40NzJkMjg1LjY5NmQyNDYuNzg0ZDI4My42NDhkMjYzLjY4ZDI4Mi42MjRkMjgwLjU3NmQyODEuNmQyOTUuOTM2ZDI4MS42ZDMwNy4yZDI4MS42ZDMyMy4wNzJkMjgyLjYyNGQzMzguOTQ0ZDI4My42NDhkMzUzLjI4ZDI4Ni43MmQ0NjMuODcyZDQxNS43NDRoUjNkNTcwLjM2OFI0ZDUxOS4xNjhSNWQ1MS4yUjZkNzQyLjRSN2QtMTIuMjg4UjhkNjkxLjJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMzRSMTJkNTEuMlIxM2Q1NzAuMzY4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTNpM2kzaTJoZzoxMjFvUjFkOTU4LjQ2NFIyYWQyNjEuMTJkMTAyNS4wMjNkMjUyLjkyOGQxMDI1LjAyM2QyNDQuMjI0ZDEwMjUuNTM2ZDIzNS41MmQxMDI2LjA0OGQyMjcuMzI4ZDEwMjYuMDQ4ZDIxNy4wODhkMTAyNi4wNDhkMjA1LjgyNGQxMDI1LjUzNmQxOTQuNTZkMTAyNS4wMjNkMTg3LjM5MmQxMDI0ZDEzLjMxMmQ0OTguNjg4ZDI2LjYyNGQ0OTYuNjRkNDAuOTZkNDk2LjEyOGQ1NS4yOTZkNDk1LjYxNmQ2Ny41ODRkNDk1LjYxNmQ4MC44OTZkNDk1LjYxNmQ5Ny4yOGQ0OTYuMTI4ZDExMy42NjRkNDk2LjY0ZDEyNC45MjhkNDk4LjY4OGQyNzAuMzM2ZDk4Ny4xMzZkNDIwLjg2NGQ0OTguNjg4ZDQ0Mi4zNjhkNDk1LjYxNmQ0NzEuMDRkNDk1LjYxNmQ0ODIuMzA0ZDQ5NS42MTZkNDk2LjY0ZDQ5Ni4xMjhkNTEwLjk3NmQ0OTYuNjRkNTI1LjMxMmQ0OTguNjg4ZDMyMS41MzZkMTEzMC40OTZkMzA3LjJkMTE3Mi40OGQyOTEuODRkMTIwMS4xNTJkMjc2LjQ4ZDEyMjkuODI0ZDI1Ny4wMjRkMTI0Ny4yMzJkMjM3LjU2OGQxMjY0LjY0ZDIxMy41MDRkMTI3MS44MDhkMTg5LjQ0ZDEyNzguOTc2ZDE1Ny42OTZkMTI3OC45NzZkMTM0LjE0NGQxMjc4Ljk3NmQxMTEuMTA0ZDEyNzUuMzkyZDg4LjA2NGQxMjcxLjgwOGQ3MC42NTZkMTI2Ni42ODhkNzAuNjU2ZDEyNDMuMTM2ZDc0Ljc1MmQxMjI0LjcwNGQ3OC44NDhkMTIwNi4yNzJkODcuMDRkMTE4Ny44NGQ5Ni4yNTZkMTE5MC45MTJkMTEyLjEyOGQxMTk0LjQ5NmQxMjhkMTE5OC4wOGQxNDYuNDMyZDExOTguMDhkMTU5Ljc0NGQxMTk4LjA4ZDE3MS41MmQxMTk1LjUyZDE4My4yOTZkMTE5Mi45NmQxOTMuNTM2ZDExODUuMjhkMjAzLjc3NmQxMTc3LjZkMjEyLjQ4ZDExNjMuMjY0ZDIyMS4xODRkMTE0OC45MjhkMjI5LjM3NmQxMTI0LjM1MmQyNjEuMTJkMTAyNS4wMjNoUjNkNTQxLjY5NlI0ZDUyNS4zMTJSNWQxMy4zMTJSNmQ1MjguMzg0UjdkLTI1NC45NzZSOGQ1MTUuMDcyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTIxUjEyZDEzLjMxMlIxM2Q1NDEuNjk2UjE0YWkxaTNpM2kzaTNpMmkzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MjMzb1IxZDk1OC40NjRSMmFkMTU4LjcyZDc4Ni40MzJkMTYwLjc2OGQ4NzIuNDQ4ZDIwMy4yNjRkOTEyLjM4NGQyNDUuNzZkOTUyLjMxOWQzMjguNzA0ZDk1Mi4zMTlkNDAxLjQwOGQ5NTIuMzE5ZDQ2Ni45NDRkOTI2LjcyZDQ3NS4xMzZkOTQyLjA4ZDQ4MC4yNTZkOTY0LjA5NmQ0ODUuMzc2ZDk4Ni4xMTJkNDg2LjRkMTAwNy42MTZkNDUyLjYwOGQxMDIxLjk1MmQ0MTIuMTZkMTAyOS4xMTlkMzcxLjcxMmQxMDM2LjI4OGQzMjIuNTZkMTAzNi4yODhkMjUwLjg4ZDEwMzYuMjg4ZDE5OS42OGQxMDE2LjMyZDE0OC40OGQ5OTYuMzUyZDExNS4yZDk2MGQ4MS45MmQ5MjMuNjQ4ZDY2LjU2ZDg3My45ODRkNTEuMmQ4MjQuMzE5ZDUxLjJkNzY0LjkyOGQ1MS4yZDcwNi41NmQ2Ni4wNDhkNjU1Ljg3MmQ4MC44OTZkNjA1LjE4NGQxMTEuNjE2ZDU2Ny44MDhkMTQyLjMzNmQ1MzAuNDMyZDE4OC45MjhkNTA4LjQxNWQyMzUuNTJkNDg2LjRkMjk5LjAwOGQ0ODYuNGQzNTMuMjhkNDg2LjRkMzk0LjI0ZDUwNC44MzJkNDM1LjJkNTIzLjI2NGQ0NjIuODQ4ZDU1NS41MmQ0OTAuNDk2ZDU4Ny43NzZkNTA0LjgzMmQ2MzIuMzE5ZDUxOS4xNjhkNjc2Ljg2NGQ1MTkuMTY4ZDcyOS4wODhkNTE5LjE2OGQ3NDMuNDI0ZDUxOC4xNDRkNzU5LjI5NmQ1MTcuMTJkNzc1LjE2OGQ1MTYuMDk2ZDc4Ni40MzJkMTU4LjcyZDc4Ni40MzJkNDE4LjgxNmQ3MTAuNjU2ZDQxOC44MTZkNjgxLjk4M2Q0MTEuMTM2ZDY1NS44NzJkNDAzLjQ1NmQ2MjkuNzZkMzg4LjYwOGQ2MTAuMzA0ZDM3My43NmQ1OTAuODQ4ZDM1MC43MmQ1NzkuMDcyZDMyNy42OGQ1NjcuMjk2ZDI5NS45MzZkNTY3LjI5NmQyMzMuNDcyZDU2Ny4yOTZkMjAwLjE5MmQ2MDUuMTg0ZDE2Ni45MTJkNjQzLjA3MmQxNTkuNzQ0ZDcxMC42NTZkNDE4LjgxNmQ3MTAuNjU2ZDMwOC4yMjRkNDE1Ljc0NGQyOTYuOTZkNDE3Ljc5MmQyODMuNjQ4ZDQxOC44MTZkMjcwLjMzNmQ0MTkuODRkMjUzLjk1MmQ0MTkuODRkMjQyLjY4OGQ0MTkuODRkMjMwLjkxMmQ0MTguODE2ZDIxOS4xMzZkNDE3Ljc5MmQyMDYuODQ4ZDQxNS43NDRkMzI0LjYwOGQyODUuNjk2ZDMzOS45NjhkMjgzLjY0OGQzNTYuMzUyZDI4Mi42MjRkMzcyLjczNmQyODEuNmQzOTAuMTQ0ZDI4MS42ZDQwOC41NzZkMjgxLjZkNDIzLjkzNmQyODIuNjI0ZDQzOS4yOTZkMjgzLjY0OGQ0NTMuNjMyZDI4NS42OTZkMzA4LjIyNGQ0MTUuNzQ0aFIzZDU3MC4zNjhSNGQ1MTkuMTY4UjVkNTEuMlI2ZDc0Mi40UjdkLTEyLjI4OFI4ZDY5MS4yUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjMzUjEyZDUxLjJSMTNkNTcwLjM2OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kzaTJoZzoxMjBvUjFkOTU4LjQ2NFIyYWQxNjAuNzY4ZDc1MS42MTZkMzYuODY0ZDQ5OC42ODhkNjAuNDE2ZDQ5NC41OTJkOTAuMTEyZDQ5NC41OTJkMTA0LjQ0OGQ0OTQuNTkyZDExOC4yNzJkNDk1LjYxNmQxMzIuMDk2ZDQ5Ni42NGQxNDcuNDU2ZDQ5OC42ODhkMjU2ZDc1Mi42NGQxMjQuOTI4ZDEwMjRkMTExLjYxNmQxMDI2LjA0OGQ5OC44MTZkMTAyNy4wNzFkODYuMDE2ZDEwMjguMDk2ZDczLjcyOGQxMDI4LjA5NmQ1OS4zOTJkMTAyOC4wOTZkNDYuMDhkMTAyNy4wNzFkMzIuNzY4ZDEwMjYuMDQ4ZDE4LjQzMmQxMDI0ZDE2MC43NjhkNzUxLjYxNmQyNjQuMTkyZDc1Mi42NGQzNzMuNzZkNDk4LjY4OGQzODguMDk2ZDQ5Ni42NGQ0MDIuNDMyZDQ5NS42MTZkNDE2Ljc2OGQ0OTQuNTkyZDQzMS4xMDRkNDk0LjU5MmQ0NTguNzUyZDQ5NC41OTJkNDgyLjMwNGQ0OTguNjg4ZDM2MC40NDhkNzQ4LjU0NGQ1MDIuNzg0ZDEwMjRkNDg4LjQ0OGQxMDI2LjA0OGQ0NzUuMTM2ZDEwMjcuMDcxZDQ2MS44MjRkMTAyOC4wOTZkNDQ3LjQ4OGQxMDI4LjA5NmQ0MTkuODRkMTAyOC4wOTZkMzk2LjI4OGQxMDI0ZDI2NC4xOTJkNzUyLjY0aFIzZDUyMS4yMTZSNGQ1MDIuNzg0UjVkMTguNDMyUjZkNTI5LjQwOFI3ZC00LjA5NlI4ZDUxMC45NzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMjBSMTJkMTguNDMyUjEzZDUyMS4yMTZSMTRhaTFpMmkzaTNpM2kyaTJpM2kzaTNpM2kyaTFpMmkzaTNpM2kyaTJpM2kzaTNpMmhnOjIzMm9SMWQ5NTguNDY0UjJhZDE1OC43MmQ3ODYuNDMyZDE2MC43NjhkODcyLjQ0OGQyMDMuMjY0ZDkxMi4zODRkMjQ1Ljc2ZDk1Mi4zMTlkMzI4LjcwNGQ5NTIuMzE5ZDQwMS40MDhkOTUyLjMxOWQ0NjYuOTQ0ZDkyNi43MmQ0NzUuMTM2ZDk0Mi4wOGQ0ODAuMjU2ZDk2NC4wOTZkNDg1LjM3NmQ5ODYuMTEyZDQ4Ni40ZDEwMDcuNjE2ZDQ1Mi42MDhkMTAyMS45NTJkNDEyLjE2ZDEwMjkuMTE5ZDM3MS43MTJkMTAzNi4yODhkMzIyLjU2ZDEwMzYuMjg4ZDI1MC44OGQxMDM2LjI4OGQxOTkuNjhkMTAxNi4zMmQxNDguNDhkOTk2LjM1MmQxMTUuMmQ5NjBkODEuOTJkOTIzLjY0OGQ2Ni41NmQ4NzMuOTg0ZDUxLjJkODI0LjMxOWQ1MS4yZDc2NC45MjhkNTEuMmQ3MDYuNTZkNjYuMDQ4ZDY1NS44NzJkODAuODk2ZDYwNS4xODRkMTExLjYxNmQ1NjcuODA4ZDE0Mi4zMzZkNTMwLjQzMmQxODguOTI4ZDUwOC40MTVkMjM1LjUyZDQ4Ni40ZDI5OS4wMDhkNDg2LjRkMzUzLjI4ZDQ4Ni40ZDM5NC4yNGQ1MDQuODMyZDQzNS4yZDUyMy4yNjRkNDYyLjg0OGQ1NTUuNTJkNDkwLjQ5NmQ1ODcuNzc2ZDUwNC44MzJkNjMyLjMxOWQ1MTkuMTY4ZDY3Ni44NjRkNTE5LjE2OGQ3MjkuMDg4ZDUxOS4xNjhkNzQzLjQyNGQ1MTguMTQ0ZDc1OS4yOTZkNTE3LjEyZDc3NS4xNjhkNTE2LjA5NmQ3ODYuNDMyZDE1OC43MmQ3ODYuNDMyZDQxOC44MTZkNzEwLjY1NmQ0MTguODE2ZDY4MS45ODNkNDExLjEzNmQ2NTUuODcyZDQwMy40NTZkNjI5Ljc2ZDM4OC42MDhkNjEwLjMwNGQzNzMuNzZkNTkwLjg0OGQzNTAuNzJkNTc5LjA3MmQzMjcuNjhkNTY3LjI5NmQyOTUuOTM2ZDU2Ny4yOTZkMjMzLjQ3MmQ1NjcuMjk2ZDIwMC4xOTJkNjA1LjE4NGQxNjYuOTEyZDY0My4wNzJkMTU5Ljc0NGQ3MTAuNjU2ZDQxOC44MTZkNzEwLjY1NmQxMzYuMTkyZDI4NS42OTZkMTUxLjU1MmQyODMuNjQ4ZDE2Ni45MTJkMjgyLjYyNGQxODIuMjcyZDI4MS42ZDIwMC43MDRkMjgxLjZkMjE3LjA4OGQyODEuNmQyMzMuOTg0ZDI4Mi42MjRkMjUwLjg4ZDI4My42NDhkMjY2LjI0ZDI4NS42OTZkMzg0ZDQxNS43NDRkMzYwLjQ0OGQ0MTkuODRkMzM1Ljg3MmQ0MTkuODRkMzIwLjUxMmQ0MTkuODRkMzA2LjY4OGQ0MTguODE2ZDI5Mi44NjRkNDE3Ljc5MmQyODEuNmQ0MTUuNzQ0ZDEzNi4xOTJkMjg1LjY5NmhSM2Q1NzAuMzY4UjRkNTE5LjE2OFI1ZDUxLjJSNmQ3NDIuNFI3ZC0xMi4yODhSOGQ2OTEuMlI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIzMlIxMmQ1MS4yUjEzZDU3MC4zNjhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTJpM2kzaTNpMmhnOjExOW9SMWQ5NTguNDY0UjJhZDIyLjUyOGQ0OTguNjg4ZDM2Ljg2NGQ0OTYuNjRkNTEuMmQ0OTUuNjE2ZDY1LjUzNmQ0OTQuNTkyZDc2LjhkNDk0LjU5MmQ5MS4xMzZkNDk0LjU5MmQxMDUuOTg0ZDQ5NS42MTZkMTIwLjgzMmQ0OTYuNjRkMTMyLjA5NmQ0OTguNjg4ZDIzNC40OTZkOTI3Ljc0NGQzNTAuMjA4ZDQ5OC42ODhkMzYxLjQ3MmQ0OTYuNjRkMzc0Ljc4NGQ0OTUuNjE2ZDM4OC4wOTZkNDk0LjU5MmQ0MDIuNDMyZDQ5NC41OTJkNDE4LjgxNmQ0OTUuNjE2ZDQzMC41OTJkNDk2LjEyOGQ0NDIuMzY4ZDQ5Ni42NGQ0NTMuNjMyZDQ5OC42ODhkNTY4LjMyZDkyMC41NzZkNjcwLjcyZDQ5OC42ODhkNjgxLjk4NGQ0OTYuNjRkNjkzLjI0OGQ0OTUuNjE2ZDcwNC41MTJkNDk0LjU5MmQ3MTcuODI0ZDQ5NC41OTJkNzI5LjA4OGQ0OTQuNTkyZDc0Mi45MTJkNDk1LjYxNmQ3NTYuNzM2ZDQ5Ni42NGQ3NzEuMDcyZDQ5OC42ODhkNjE0LjRkMTAyNGQ2MDEuMDg4ZDEwMjYuMDQ4ZDU4Ny4yNjRkMTAyNy4wNzFkNTczLjQ0ZDEwMjguMDk2ZDU2Mi4xNzZkMTAyOC4wOTZkNTUwLjkxMmQxMDI4LjA5NmQ1MzcuNmQxMDI3LjA3MWQ1MjQuMjg4ZDEwMjYuMDQ4ZDUxMC45NzZkMTAyNGQzOTguMzM2ZDYyNi42ODhkMjgwLjU3NmQxMDI0ZDI2Ni4yNGQxMDI2LjA0OGQyNTIuNDE2ZDEwMjcuMDcxZDIzOC41OTJkMTAyOC4wOTZkMjI3LjMyOGQxMDI4LjA5NmQyMTYuMDY0ZDEwMjguMDk2ZDIwMi4yNGQxMDI3LjA3MWQxODguNDE2ZDEwMjYuMDQ4ZDE3Ny4xNTJkMTAyNGQyMi41MjhkNDk4LjY4OGhSM2Q3OTMuNlI0ZDc3MS4wNzJSNWQyMi41MjhSNmQ1MjkuNDA4UjdkLTQuMDk2UjhkNTA2Ljg4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTE5UjEyZDIyLjUyOFIxM2Q3OTMuNlIxNGFpMWkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaGc6MjMxb1IxZDk1OC40NjRSMmFkNDMyLjEyOGQ5MzMuODg4ZDQ0MC4zMmQ5NDguMjI0ZDQ0Ni40NjRkOTY5LjcyOGQ0NTIuNjA4ZDk5MS4yMzJkNDUzLjYzMmQxMDEzLjc2ZDQyMC44NjRkMTAyNS4wMjNkMzg1LjUzNmQxMDMwLjY1NmQzNTAuMjA4ZDEwMzYuMjg4ZDMwNy4yZDEwMzYuMjg4ZDI4OC43NjhkMTA4Mi4zNjhkMjkzLjg4OGQxMDgxLjM0NGQzMDcuMmQxMDgxLjM0NGQzNjAuNDQ4ZDEwODEuMzQ0ZDM4Ny41ODRkMTEwNS45MmQ0MTQuNzJkMTEzMC40OTZkNDE0LjcyZDExNjguMzg0ZDQxNC43MmQxMjE5LjU4NGQzNzQuMjcyZDEyNDUuMTg0ZDMzMy44MjRkMTI3MC43ODRkMjY2LjI0ZDEyNzAuNzg0ZDI1MS45MDRkMTI3MC43ODRkMjMwLjRkMTI2OC43MzZkMjA4Ljg5NmQxMjY2LjY4OGQxODguNDE2ZDEyNTguNDk2ZDE4OS40NGQxMjQ0LjE2ZDE5MmQxMjI4LjI4OGQxOTQuNTZkMTIxMi40MTZkMjAyLjc1MmQxMTk5LjEwNGQyMzYuNTQ0ZDEyMTAuMzY4ZDI2Ni4yNGQxMjEwLjM2OGQyOTcuOTg0ZDEyMTAuMzY4ZDMxNy40NGQxMTk5LjYxNmQzMzYuODk2ZDExODguODY0ZDMzNi44OTZkMTE2OS40MDhkMzM2Ljg5NmQxMTQ4LjkyOGQzMTguNDY0ZDExNDAuNzM2ZDMwMC4wMzJkMTEzMi41NDRkMjY5LjMxMmQxMTMyLjU0NGQyNTQuOTc2ZDExMzIuNTQ0ZDI0MC42NGQxMTM0LjU5MmQyMjYuMzA0ZDExMzYuNjRkMjEyLjk5MmQxMTM5LjcxMmQyMTAuOTQ0ZDExMzguNjg4ZDIwNi44NDhkMTEzNC41OTJkMjI2LjMwNGQxMDgwLjMyZDI0NS43NmQxMDMwLjE0NGQxNDguNDhkMTAxMS43MTJkMTAwLjM1MmQ5NDEuNTY4ZDUyLjIyNGQ4NzEuNDI0ZDUyLjIyNGQ3NjEuODU2ZDUyLjIyNGQ3MDMuNDg4ZDY4LjA5NmQ2NTMuMzEyZDgzLjk2OGQ2MDMuMTM2ZDExNi4yMjRkNTY2LjI3MWQxNDguNDhkNTI5LjQwOGQxOTYuMDk2ZDUwNy45MDRkMjQzLjcxMmQ0ODYuNGQzMDcuMmQ0ODYuNGQzNDkuMTg0ZDQ4Ni40ZDM4Mi45NzZkNDkyLjAzMmQ0MTYuNzY4ZDQ5Ny42NjRkNDQ2LjQ2NGQ1MDguOTI4ZDQ0Ni40NjRkNTI2LjMzNmQ0NDEuODU2ZDU0OC44NjRkNDM3LjI0OGQ1NzEuMzkyZDQyOS4wNTZkNTg4LjhkNDAzLjQ1NmQ1ODAuNjA4ZDM3NS44MDhkNTc2ZDM0OC4xNmQ1NzEuMzkyZDMxNS4zOTJkNTcxLjM5MmQyMzUuNTJkNTcxLjM5MmQxOTUuNTg0ZDYyMy4xMDRkMTU1LjY0OGQ2NzQuODE2ZDE1NS42NDhkNzYxLjg1NmQxNTUuNjQ4ZDg2MC4xNmQyMDEuMjE2ZDkwNi4yNGQyNDYuNzg0ZDk1Mi4zMTlkMzIyLjU2ZDk1Mi4zMTlkMzUzLjI4ZDk1Mi4zMTlkMzc4Ljg4ZDk0OC4yMjRkNDA0LjQ4ZDk0NC4xMjhkNDMyLjEyOGQ5MzMuODg4aFIzZDQ4OS40NzJSNGQ0NTMuNjMyUjVkNTIuMjI0UjZkNTM3LjZSN2QtMjQ2Ljc4NFI4ZDQ4NS4zNzZSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMzFSMTJkNTIuMjI0UjEzZDQ4OS40NzJSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTE4b1IxZDk1OC40NjRSMmFkMTcuNDA4ZDQ5OC42ODhkMzEuNzQ0ZDQ5Ni42NGQ0Ny4xMDRkNDk1LjYxNmQ2Mi40NjRkNDk0LjU5MmQ3NC43NTJkNDk0LjU5MmQ4OC4wNjRkNDk0LjU5MmQxMDMuOTM2ZDQ5NS42MTZkMTE5LjgwOGQ0OTYuNjRkMTMxLjA3MmQ0OTguNjg4ZDI3NC40MzJkOTMxLjg0ZDQxOC44MTZkNDk4LjY4OGQ0MzAuMDhkNDk2LjY0ZDQ0NC40MTZkNDk1LjYxNmQ0NTguNzUyZDQ5NC41OTJkNDcyLjA2NGQ0OTQuNTkyZDQ4My4zMjhkNDk0LjU5MmQ0OTcuNjY0ZDQ5NS42MTZkNTEyZDQ5Ni42NGQ1MjYuMzM2ZDQ5OC42ODhkMzIxLjUzNmQxMDI0ZDMwOC4yMjRkMTAyNi4wNDhkMjk0LjkxMmQxMDI3LjA3MWQyODEuNmQxMDI4LjA5NmQyNzAuMzM2ZDEwMjguMDk2ZDI1OS4wNzJkMTAyOC4wOTZkMjQ2LjI3MmQxMDI3LjA3MWQyMzMuNDcyZDEwMjYuMDQ4ZDIyMS4xODRkMTAyNGQxNy40MDhkNDk4LjY4OGhSM2Q1NDMuNzQ0UjRkNTI2LjMzNlI1ZDE3LjQwOFI2ZDUyOS40MDhSN2QtNC4wOTZSOGQ1MTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMThSMTJkMTcuNDA4UjEzZDU0My43NDRSMTRhaTFpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjIzMG9SMWQ5NTguNDY0UjJhZDM1NC4zMDRkNjc3Ljg4N2QzNTQuMzA0ZDYxNy40NzJkMzI0LjYwOGQ1OTMuOTJkMjk0LjkxMmQ1NzAuMzY3ZDIzNi41NDRkNTcwLjM2N2QyMDEuNzI4ZDU3MC4zNjdkMTY5LjQ3MmQ1NzZkMTM3LjIxNmQ1ODEuNjMyZDEwOC41NDRkNTkwLjg0OGQ4OS4wODhkNTU3LjA1NmQ4OS4wODhkNTA5Ljk1MmQxMjMuOTA0ZDQ5OC42ODhkMTY1LjM3NmQ0OTIuNTQ0ZDIwNi44NDhkNDg2LjRkMjQ2Ljc4NGQ0ODYuNGQzMDguMjI0ZDQ4Ni40ZDM0OS42OTZkNTA2LjM2N2QzOTEuMTY4ZDUyNi4zMzZkNDE4LjgxNmQ1NjguMzE5ZDQ0Ny40ODhkNTMxLjQ1NmQ0OTAuNDk2ZDUwOC45MjhkNTMzLjUwNGQ0ODYuNGQ1OTAuODQ4ZDQ4Ni40ZDY0NC4wOTZkNDg2LjRkNjg0LjU0NGQ1MDQuODMyZDcyNC45OTJkNTIzLjI2NGQ3NTIuNjRkNTU1LjUyZDc4MC4yODhkNTg3Ljc3NmQ3OTQuMTEyZDYzMi4zMTlkODA3LjkzNmQ2NzYuODY0ZDgwNy45MzZkNzI5LjA4OGQ4MDcuOTM2ZDc0Mi40ZDgwNi45MTJkNzU4LjI3MWQ4MDUuODg4ZDc3NC4xNDRkODAzLjg0ZDc4NS40MDhkNDUyLjYwOGQ3ODUuNDA4ZDQ1Mi42MDhkODc1LjUyZDQ5NC41OTJkOTEzLjkyZDUzNi41NzZkOTUyLjMxOWQ2MjIuNTkyZDk1Mi4zMTlkNjU5LjQ1NmQ5NTIuMzE5ZDY5MS43MTJkOTQ1LjY2NGQ3MjMuOTY4ZDkzOS4wMDhkNzU2LjczNmQ5MjYuNzJkNzYzLjkwNGQ5NDIuMDhkNzY5LjAyNGQ5NjQuMDk2ZDc3NC4xNDRkOTg2LjExMmQ3NzUuMTY4ZDEwMDcuNjE2ZDcwNS41MzZkMTAzNi4yODhkNjEzLjM3NmQxMDM2LjI4OGQ1NjAuMTI4ZDEwMzYuMjg4ZDUxNC4wNDhkMTAyNC41MTJkNDY3Ljk2OGQxMDEyLjczNmQ0MzQuMTc2ZDk4Ni4xMTJkNDAxLjQwOGQxMDA2LjU5MmQzNTIuNzY4ZDEwMjEuNDRkMzA0LjEyOGQxMDM2LjI4OGQyNDcuODA4ZDEwMzYuMjg4ZDIwMy43NzZkMTAzNi4yODhkMTY2LjRkMTAyNy4wNzFkMTI5LjAyNGQxMDE3Ljg1NmQxMDIuNGQ5OTcuMzc2ZDc1Ljc3NmQ5NzYuODk2ZDYwLjQxNmQ5NDUuMTUyZDQ1LjA1NmQ5MTMuNDA4ZDQ1LjA1NmQ4NjguMzUyZDQ1LjA1NmQ4MjQuMzE5ZDYyLjk3NmQ3OTEuNTUyZDgwLjg5NmQ3NTguNzg0ZDExMS42MTZkNzM3LjI4ZDE0Mi4zMzZkNzE1Ljc3NmQxODIuMjcyZDcwNS4wMjRkMjIyLjIwOGQ2OTQuMjcxZDI2Ny4yNjRkNjk0LjI3MWQyOTMuODg4ZDY5NC4yNzFkMzE1LjM5MmQ2OTUuODA4ZDMzNi44OTZkNjk3LjM0NGQzNTQuMzA0ZDY5OS4zOTJkMzU0LjMwNGQ2NzcuODg3ZDM1Mi4yNTZkNzgwLjI4OGQzMzYuODk2ZDc3OC4yNGQzMTcuNDRkNzc2LjcwNGQyOTcuOTg0ZDc3NS4xNjhkMjgwLjU3NmQ3NzUuMTY4ZDIxNi4wNjRkNzc1LjE2OGQxODEuNzZkNzk3LjE4NGQxNDcuNDU2ZDgxOS4yZDE0Ny40NTZkODY5LjM3NmQxNDcuNDU2ZDg5OS4wNzJkMTU4LjcyZDkxNi40OGQxNjkuOTg0ZDkzMy44ODhkMTg2LjM2OGQ5NDIuNTkyZDIwMi43NTJkOTUxLjI5NmQyMjEuNjk2ZDk1My44NTZkMjQwLjY0ZDk1Ni40MTVkMjU3LjAyNGQ5NTYuNDE1ZDI4OS43OTJkOTU2LjQxNWQzMjMuNTg0ZDk0OS4yNDhkMzU3LjM3NmQ5NDIuMDhkMzgxLjk1MmQ5MjQuNjcyZDM2Ny42MTZkOTAwLjA5NmQzNjAuOTZkODY2LjgxNmQzNTQuMzA0ZDgzMy41MzZkMzUzLjI4ZDc5OS43NDRkMzUyLjI1NmQ3ODAuMjg4ZDcwOS42MzJkNzA5LjYzMmQ3MDkuNjMyZDY4MC45NmQ3MDIuNDY0ZDY1NC44NDhkNjk1LjI5NmQ2MjguNzM2ZDY4MC40NDhkNjA5LjI4ZDY2NS42ZDU4OS44MjRkNjQzLjA3MmQ1NzguNTZkNjIwLjU0NGQ1NjcuMjk2ZDU4OS44MjRkNTY3LjI5NmQ1MjYuMzM2ZDU2Ny4yOTZkNDkzLjU2OGQ2MDQuNjcyZDQ2MC44ZDY0Mi4wNDhkNDUzLjYzMmQ3MDkuNjMyZDcwOS42MzJkNzA5LjYzMmhSM2Q4NTkuMTM2UjRkODA3LjkzNlI1ZDQ1LjA1NlI2ZDUzNy42UjdkLTEyLjI4OFI4ZDQ5Mi41NDRSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMzBSMTJkNDUuMDU2UjEzZDg1OS4xMzZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaGc6MTE3b1IxZDk1OC40NjRSMmFkNzUuNzc2ZDQ5OC42ODhkODcuMDRkNDk2LjY0ZDEwMS4zNzZkNDk1LjYxNmQxMTUuNzEyZDQ5NC41OTJkMTI1Ljk1MmQ0OTQuNTkyZDEzNy4yMTZkNDk0LjU5MmQxNTEuNTUyZDQ5NS42MTZkMTY1Ljg4OGQ0OTYuNjRkMTc3LjE1MmQ0OTguNjg4ZDE3Ny4xNTJkNzg2LjQzMmQxNzcuMTUyZDgzNS41ODRkMTg2LjM2OGQ4NjcuODRkMTk1LjU4NGQ5MDAuMDk2ZDIxNC4wMTZkOTE4LjUyOGQyMzIuNDQ4ZDkzNi45NmQyNTkuMDcyZDk0NC4xMjhkMjg1LjY5NmQ5NTEuMjk2ZDMyMC41MTJkOTUxLjI5NmQzNzIuNzM2ZDk1MS4yOTZkNDA5LjZkOTQwLjAzMmQ0MDkuNmQ0OTguNjg4ZDQyMC44NjRkNDk2LjY0ZDQzNC42ODhkNDk1LjYxNmQ0NDguNTEyZDQ5NC41OTJkNDU5Ljc3NmQ0OTQuNTkyZDQ3MS4wNGQ0OTQuNTkyZDQ4NC44NjRkNDk1LjYxNmQ0OTguNjg4ZDQ5Ni42NGQ1MDkuOTUyZDQ5OC42ODhkNTA5Ljk1MmQxMDA3LjYxNmQ0NzQuMTEyZDEwMTcuODU2ZDQyNC40NDhkMTAyNy4wNzFkMzc0Ljc4NGQxMDM2LjI4OGQzMjEuNTM2ZDEwMzYuMjg4ZDI3MS4zNmQxMDM2LjI4OGQyMjYuODE2ZDEwMjcuNTg0ZDE4Mi4yNzJkMTAxOC44OGQxNDguNDhkOTkyLjI1NmQxMTQuNjg4ZDk2NS42MzJkOTUuMjMyZDkxNy41MDRkNzUuNzc2ZDg2OS4zNzZkNzUuNzc2ZDc5MC41MjhkNzUuNzc2ZDQ5OC42ODhoUjNkNTg3Ljc3NlI0ZDUwOS45NTJSNWQ3NS43NzZSNmQ1MjkuNDA4UjdkLTEyLjI4OFI4ZDQ1My42MzJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMTdSMTJkNzUuNzc2UjEzZDU4Ny43NzZSMTRhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaGc6MjI5b1IxZDk1OC40NjRSMmFkMzU5LjQyNGQ3NzcuMjE2ZDM0NC4wNjRkNzc1LjE2OGQzMjAuNTEyZDc3My4xMmQyOTYuOTZkNzcxLjA3MmQyODAuNTc2ZDc3MS4wNzJkMjE3LjA4OGQ3NzEuMDcyZDE4My44MDhkNzk0LjYyNGQxNTAuNTI4ZDgxOC4xNzVkMTUwLjUyOGQ4NjYuMzA0ZDE1MC41MjhkODk3LjAyNGQxNjEuNzkyZDkxNC40MzJkMTczLjA1NmQ5MzEuODRkMTg5Ljk1MmQ5NDEuMDU2ZDIwNi44NDhkOTUwLjI3MWQyMjcuMzI4ZDk1Mi4zMTlkMjQ3LjgwOGQ5NTQuMzY3ZDI2Ni4yNGQ5NTQuMzY3ZDI4OS43OTJkOTU0LjM2N2QzMTQuODhkOTUxLjgwOGQzMzkuOTY4ZDk0OS4yNDhkMzU5LjQyNGQ5NDQuMTI4ZDM1OS40MjRkNzc3LjIxNmQzNTkuNDI0ZDY3Ny44ODdkMzU5LjQyNGQ2MTcuNDcyZDMyOC43MDRkNTkzLjkyZDI5Ny45ODRkNTcwLjM2N2QyMzkuNjE2ZDU3MC4zNjdkMjAzLjc3NmQ1NzAuMzY3ZDE3Mi41NDRkNTc2ZDE0MS4zMTJkNTgxLjYzMmQxMTEuNjE2ZDU5MC44NDhkOTIuMTZkNTU3LjA1NmQ5Mi4xNmQ1MDkuOTUyZDEyNi45NzZkNDk4LjY4OGQxNjguOTZkNDkyLjU0NGQyMTAuOTQ0ZDQ4Ni40ZDI0OS44NTZkNDg2LjRkMzUyLjI1NmQ0ODYuNGQ0MDUuNTA0ZDUzMi45OTJkNDU4Ljc1MmQ1NzkuNTg0ZDQ1OC43NTJkNjgxLjk4M2Q0NTguNzUyZDEwMTAuNjg4ZDQyMi45MTJkMTAxOC44OGQzNzEuNzEyZDEwMjcuNTg0ZDMyMC41MTJkMTAzNi4yODhkMjY3LjI2NGQxMDM2LjI4OGQyMTcuMDg4ZDEwMzYuMjg4ZDE3Ni42NGQxMDI3LjA3MWQxMzYuMTkyZDEwMTcuODU2ZDEwOC4wMzJkOTk3LjM3NmQ3OS44NzJkOTc2Ljg5NmQ2NC41MTJkOTQ1LjE1MmQ0OS4xNTJkOTEzLjQwOGQ0OS4xNTJkODY4LjM1MmQ0OS4xNTJkODI0LjMxOWQ2Ny4wNzJkNzkxLjA0ZDg0Ljk5MmQ3NTcuNzZkMTE1LjcxMmQ3MzUuNzQzZDE0Ni40MzJkNzEzLjcyOGQxODYuMzY4ZDcwMi45NzZkMjI2LjMwNGQ2OTIuMjIzZDI3MC4zMzZkNjkyLjIyM2QzMDMuMTA0ZDY5Mi4yMjNkMzI0LjA5NmQ2OTMuNzZkMzQ1LjA4OGQ2OTUuMjk2ZDM1OS40MjRkNjk3LjM0NGQzNTkuNDI0ZDY3Ny44ODdkMTU5Ljc0NGQzMTQuMzY3ZDE1OS43NDRkMjY1LjIxNmQxOTAuNDY0ZDIzNS4wMDhkMjIxLjE4NGQyMDQuNzk5ZDI3MC4zMzZkMjA0Ljc5OWQzMTkuNDg4ZDIwNC43OTlkMzUwLjIwOGQyMzUuMDA4ZDM4MC45MjhkMjY1LjIxNmQzODAuOTI4ZDMxNC4zNjdkMzgwLjkyOGQzNjMuNTJkMzUwLjIwOGQzOTMuNzI3ZDMxOS40ODhkNDIzLjkzNmQyNzAuMzM2ZDQyMy45MzZkMjIxLjE4NGQ0MjMuOTM2ZDE5MC40NjRkMzkzLjcyN2QxNTkuNzQ0ZDM2My41MmQxNTkuNzQ0ZDMxNC4zNjdkMjcwLjMzNmQzNzEuNzEyZDI5NC45MTJkMzcxLjcxMmQzMDguMjI0ZDM1Ni4zNTJkMzIxLjUzNmQzNDAuOTkxZDMyMS41MzZkMzE0LjM2N2QzMjEuNTM2ZDI4Ny43NDRkMzA4LjIyNGQyNzIuMzg0ZDI5NC45MTJkMjU3LjAyNGQyNzAuMzM2ZDI1Ny4wMjRkMjQ1Ljc2ZDI1Ny4wMjRkMjMyLjk2ZDI3Mi4zODRkMjIwLjE2ZDI4Ny43NDRkMjIwLjE2ZDMxNC4zNjdkMjIwLjE2ZDM0MC45OTFkMjMyLjk2ZDM1Ni4zNTJkMjQ1Ljc2ZDM3MS43MTJkMjcwLjMzNmQzNzEuNzEyaFIzZDUyOS40MDhSNGQ0NTguNzUyUjVkNDkuMTUyUjZkODE5LjJSN2QtMTIuMjg4UjhkNzcwLjA0OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIyOVIxMmQ0OS4xNTJSMTNkNTI5LjQwOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzoxMTZvUjFkOTU4LjQ2NFIyYWQxMDEuMzc2ZDU3OS41ODRkMjEuNTA0ZDU3OS41ODRkMTcuNDA4ZDU2NS4yNDhkMTkzLjUzNmQzNjguNjRkMjAxLjcyOGQzNjguNjRkMjAxLjcyOGQ0OTguNjg4ZDMzNC44NDhkNDk4LjY4OGQzMzguOTQ0ZDUxNi4wOTZkMzM4Ljk0NGQ1MzcuNTk5ZDMzOC45NDRkNTQ4Ljg2NGQzMzcuOTJkNTU5LjEwNGQzMzYuODk2ZDU2OS4zNDRkMzM0Ljg0OGQ1NzkuNTg0ZDIwMS43MjhkNTc5LjU4NGQyMDEuNzI4ZDgxOS4yZDIwMS43MjhkODYyLjIwOGQyMDUuMzEyZDg4Ny44MDhkMjA4Ljg5NmQ5MTMuNDA4ZDIxNy42ZDkyNy4yMzJkMjI2LjMwNGQ5NDEuMDU2ZDI0MS4xNTJkOTQ1LjY2NGQyNTZkOTUwLjI3MWQyNzguNTI4ZDk1MC4yNzFkMjk1LjkzNmQ5NTAuMjcxZDMxMS4yOTZkOTQ3LjcxMmQzMjYuNjU2ZDk0NS4xNTJkMzM4Ljk0NGQ5NDIuMDhkMzQ2LjExMmQ5NjIuNTZkMzQ3LjY0OGQ5ODQuMDY0ZDM0OS4xODRkMTAwNS41NjhkMzQ5LjE4NGQxMDIxLjk1MmQzMjguNzA0ZDEwMjcuMDcxZDMwNi4xNzZkMTAyOS42MzJkMjgzLjY0OGQxMDMyLjE5MmQyNTguMDQ4ZDEwMzIuMTkyZDE4NC4zMmQxMDMyLjE5MmQxNDIuODQ4ZDk5Ni4zNTJkMTAxLjM3NmQ5NjAuNTEyZDEwMS4zNzZkODc3LjU2OGQxMDEuMzc2ZDU3OS41ODRoUjNkMzY2LjU5MlI0ZDM0OS4xODRSNWQxNy40MDhSNmQ2NTUuMzZSN2QtOC4xOTJSOGQ2MzcuOTUyUjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTE2UjEyZDE3LjQwOFIxM2QzNjYuNTkyUjE0YWkxaTJpMmkyaTJpMmkyaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MjI4b1IxZDk1OC40NjRSMmFkMzU5LjQyNGQ3NzcuMjE2ZDM0NC4wNjRkNzc1LjE2OGQzMjAuNTEyZDc3My4xMmQyOTYuOTZkNzcxLjA3MmQyODAuNTc2ZDc3MS4wNzJkMjE3LjA4OGQ3NzEuMDcyZDE4My44MDhkNzk0LjYyNGQxNTAuNTI4ZDgxOC4xNzVkMTUwLjUyOGQ4NjYuMzA0ZDE1MC41MjhkODk3LjAyNGQxNjEuNzkyZDkxNC40MzJkMTczLjA1NmQ5MzEuODRkMTg5Ljk1MmQ5NDEuMDU2ZDIwNi44NDhkOTUwLjI3MWQyMjcuMzI4ZDk1Mi4zMTlkMjQ3LjgwOGQ5NTQuMzY3ZDI2Ni4yNGQ5NTQuMzY3ZDI4OS43OTJkOTU0LjM2N2QzMTQuODhkOTUxLjgwOGQzMzkuOTY4ZDk0OS4yNDhkMzU5LjQyNGQ5NDQuMTI4ZDM1OS40MjRkNzc3LjIxNmQzNTkuNDI0ZDY3Ny44ODdkMzU5LjQyNGQ2MTcuNDcyZDMyOC43MDRkNTkzLjkyZDI5Ny45ODRkNTcwLjM2N2QyMzkuNjE2ZDU3MC4zNjdkMjAzLjc3NmQ1NzAuMzY3ZDE3Mi41NDRkNTc2ZDE0MS4zMTJkNTgxLjYzMmQxMTEuNjE2ZDU5MC44NDhkOTIuMTZkNTU3LjA1NmQ5Mi4xNmQ1MDkuOTUyZDEyNi45NzZkNDk4LjY4OGQxNjguOTZkNDkyLjU0NGQyMTAuOTQ0ZDQ4Ni40ZDI0OS44NTZkNDg2LjRkMzUyLjI1NmQ0ODYuNGQ0MDUuNTA0ZDUzMi45OTJkNDU4Ljc1MmQ1NzkuNTg0ZDQ1OC43NTJkNjgxLjk4M2Q0NTguNzUyZDEwMTAuNjg4ZDQyMi45MTJkMTAxOC44OGQzNzEuNzEyZDEwMjcuNTg0ZDMyMC41MTJkMTAzNi4yODhkMjY3LjI2NGQxMDM2LjI4OGQyMTcuMDg4ZDEwMzYuMjg4ZDE3Ni42NGQxMDI3LjA3MWQxMzYuMTkyZDEwMTcuODU2ZDEwOC4wMzJkOTk3LjM3NmQ3OS44NzJkOTc2Ljg5NmQ2NC41MTJkOTQ1LjE1MmQ0OS4xNTJkOTEzLjQwOGQ0OS4xNTJkODY4LjM1MmQ0OS4xNTJkODI0LjMxOWQ2Ny4wNzJkNzkxLjA0ZDg0Ljk5MmQ3NTcuNzZkMTE1LjcxMmQ3MzUuNzQzZDE0Ni40MzJkNzEzLjcyOGQxODYuMzY4ZDcwMi45NzZkMjI2LjMwNGQ2OTIuMjIzZDI3MC4zMzZkNjkyLjIyM2QzMDMuMTA0ZDY5Mi4yMjNkMzI0LjA5NmQ2OTMuNzZkMzQ1LjA4OGQ2OTUuMjk2ZDM1OS40MjRkNjk3LjM0NGQzNTkuNDI0ZDY3Ny44ODdkMTExLjYxNmQ0MDUuNTA0ZDEwOS41NjhkMzkyLjE5MmQxMDguNTQ0ZDM3OS45MDRkMTA3LjUyZDM2Ny42MTZkMTA3LjUyZDM1NC4zMDRkMTA3LjUyZDM0Mi4wMTVkMTA4LjU0NGQzMjkuMjE2ZDEwOS41NjhkMzE2LjQxNWQxMTEuNjE2ZDMwMy4xMDRkMTIzLjkwNGQzMDEuMDU2ZDEzNy43MjhkMzAwLjAzMmQxNTEuNTUyZDI5OS4wMDhkMTYzLjg0ZDI5OS4wMDhkMTc1LjEwNGQyOTkuMDA4ZDE4OC45MjhkMzAwLjAzMmQyMDIuNzUyZDMwMS4wNTZkMjE2LjA2NGQzMDMuMTA0ZDIyMC4xNmQzMjYuNjU1ZDIyMC4xNmQzNTQuMzA0ZDIyMC4xNmQzNjYuNTkyZDIxOS4xMzZkMzc5LjM5MWQyMTguMTEyZDM5Mi4xOTJkMjE2LjA2NGQ0MDUuNTA0ZDE4OS40NGQ0MDguNTc2ZDE2My44NGQ0MDguNTc2ZDE1Mi41NzZkNDA4LjU3NmQxMzguMjRkNDA4LjA2M2QxMjMuOTA0ZDQwNy41NTJkMTExLjYxNmQ0MDUuNTA0ZDMyMC41MTJkNDA1LjUwNGQzMTYuNDE2ZDM4MS45NTJkMzE2LjQxNmQzNTQuMzA0ZDMxNi40MTZkMzQyLjAxNWQzMTcuNDRkMzI5LjIxNmQzMTguNDY0ZDMxNi40MTVkMzIwLjUxMmQzMDMuMTA0ZDMzMi44ZDMwMS4wNTZkMzQ2LjYyNGQzMDAuMDMyZDM2MC40NDhkMjk5LjAwOGQzNzEuNzEyZDI5OS4wMDhkMzg0ZDI5OS4wMDhkMzk3LjgyNGQzMDAuMDMyZDQxMS42NDhkMzAxLjA1NmQ0MjQuOTZkMzAzLjEwNGQ0MjguMDMyZDMyOS43MjdkNDI4LjAzMmQzNTQuMzA0ZDQyOC4wMzJkMzc5LjkwNGQ0MjQuOTZkNDA1LjUwNGQzOTguMzM2ZDQwOC41NzZkMzcyLjczNmQ0MDguNTc2ZDM2MS40NzJkNDA4LjU3NmQzNDcuMTM2ZDQwOC4wNjNkMzMyLjhkNDA3LjU1MmQzMjAuNTEyZDQwNS41MDRoUjNkNTI5LjQwOFI0ZDQ1OC43NTJSNWQ0OS4xNTJSNmQ3MjQuOTkyUjdkLTEyLjI4OFI4ZDY3NS44NFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIyOFIxMmQ0OS4xNTJSMTNkNTI5LjQwOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjExNW9SMWQ5NTguNDY0UjJhZDcyLjcwNGQ5MjguNzY4ZDEwMC4zNTJkOTQwLjAzMmQxMzMuNjMyZDk0Ni42ODhkMTY2LjkxMmQ5NTMuMzQ0ZDE5OS42OGQ5NTMuMzQ0ZDIyMy4yMzJkOTUzLjM0NGQyNDQuNzM2ZDk0OC4yMjRkMjY2LjI0ZDk0My4xMDRkMjgyLjExMmQ5MzIuODY0ZDI5Ny45ODRkOTIyLjYyNGQzMDcuNzEyZDkwNy43NzZkMzE3LjQ0ZDg5Mi45MjhkMzE3LjQ0ZDg3NC40OTZkMzE3LjQ0ZDg1NC4wMTZkMzA5Ljc2ZDg0MC43MDRkMzAyLjA4ZDgyNy4zOTJkMjg5LjI4ZDgxOC4xNzVkMjc2LjQ4ZDgwOC45NmQyNTkuNTg0ZDgwMi4zMDRkMjQyLjY4OGQ3OTUuNjQ4ZDIyMy4yMzJkNzg5LjUwNGQxODcuMzkyZDc3Ni4xOTJkMTIxLjg1NmQ3NTEuNjE2ZDkyLjE2ZDcyMC44OTZkNjIuNDY0ZDY5MC4xNzVkNjIuNDY0ZDYzNy45NTJkNjIuNDY0ZDU2OC4zMTlkMTEyLjEyOGQ1MjcuMzZkMTYxLjc5MmQ0ODYuNGQyNTguMDQ4ZDQ4Ni40ZDI5Ny45ODRkNDg2LjRkMzM2LjM4NGQ0OTQuMDhkMzc0Ljc4NGQ1MDEuNzZkNDAzLjQ1NmQ1MTJkNDAxLjQwOGQ1MzIuNDhkMzk1Ljc3NmQ1NTIuOTZkMzkwLjE0NGQ1NzMuNDRkMzgxLjk1MmQ1OTAuODQ4ZDM1OS40MjRkNTgyLjY1NmQzMjguMTkyZDU3NC45NzZkMjk2Ljk2ZDU2Ny4yOTZkMjYxLjEyZDU2Ny4yOTZkMjIzLjIzMmQ1NjcuMjk2ZDE5NC4wNDhkNTgwLjYwOGQxNjQuODY0ZDU5My45MmQxNjQuODY0ZDYyNy43MTJkMTY0Ljg2NGQ2NDUuMTJkMTcyLjAzMmQ2NTcuNDA4ZDE3OS4yZDY2OS42OTVkMTkxLjQ4OGQ2NzguNGQyMDMuNzc2ZDY4Ny4xMDRkMjE5LjY0OGQ2OTMuMjQ4ZDIzNS41MmQ2OTkuMzkyZDI1My45NTJkNzA1LjUzNmQyOTkuMDA4ZDcyMC44OTZkMzIzLjU4NGQ3MjkuMDg4ZDM0NS42ZDc0MC4zNTJkMzY3LjYxNmQ3NTEuNjE2ZDM4My40ODhkNzY4LjUxMmQzOTkuMzZkNzg1LjQwOGQ0MDkuMDg4ZDgwOS40NzJkNDE4LjgxNmQ4MzMuNTM2ZDQxOC44MTZkODY3LjMyOGQ0MTguODE2ZDkwNS4yMTZkNDAzLjQ1NmQ5MzYuNDQ4ZDM4OC4wOTZkOTY3LjY4ZDM1OS45MzZkOTg5LjY5NmQzMzEuNzc2ZDEwMTEuNzEyZDI5MS44NGQxMDI0ZDI1MS45MDRkMTAzNi4yODhkMjAzLjc3NmQxMDM2LjI4OGQxNTQuNjI0ZDEwMzYuMjg4ZDExNy43NmQxMDI5LjYzMmQ4MC44OTZkMTAyMi45NzZkNDkuMTUyZDEwMTEuNzEyZDUxLjJkOTkxLjIzMmQ1Ny44NTZkOTcwLjI0ZDY0LjUxMmQ5NDkuMjQ4ZDcyLjcwNGQ5MjguNzY4aFIzZDQ2NS45MlI0ZDQxOC44MTZSNWQ0OS4xNTJSNmQ1MzcuNlI3ZC0xMi4yODhSOGQ0ODguNDQ4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTE1UjEyZDQ5LjE1MlIxM2Q0NjUuOTJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIyN29SMWQ5NTguNDY0UjJhZDM1OS40MjRkNzc3LjIxNmQzNDQuMDY0ZDc3NS4xNjhkMzIwLjUxMmQ3NzMuMTJkMjk2Ljk2ZDc3MS4wNzJkMjgwLjU3NmQ3NzEuMDcyZDIxNy4wODhkNzcxLjA3MmQxODMuODA4ZDc5NC42MjRkMTUwLjUyOGQ4MTguMTc1ZDE1MC41MjhkODY2LjMwNGQxNTAuNTI4ZDg5Ny4wMjRkMTYxLjc5MmQ5MTQuNDMyZDE3My4wNTZkOTMxLjg0ZDE4OS45NTJkOTQxLjA1NmQyMDYuODQ4ZDk1MC4yNzFkMjI3LjMyOGQ5NTIuMzE5ZDI0Ny44MDhkOTU0LjM2N2QyNjYuMjRkOTU0LjM2N2QyODkuNzkyZDk1NC4zNjdkMzE0Ljg4ZDk1MS44MDhkMzM5Ljk2OGQ5NDkuMjQ4ZDM1OS40MjRkOTQ0LjEyOGQzNTkuNDI0ZDc3Ny4yMTZkMzU5LjQyNGQ2NzcuODg3ZDM1OS40MjRkNjE3LjQ3MmQzMjguNzA0ZDU5My45MmQyOTcuOTg0ZDU3MC4zNjdkMjM5LjYxNmQ1NzAuMzY3ZDIwMy43NzZkNTcwLjM2N2QxNzIuNTQ0ZDU3NmQxNDEuMzEyZDU4MS42MzJkMTExLjYxNmQ1OTAuODQ4ZDkyLjE2ZDU1Ny4wNTZkOTIuMTZkNTA5Ljk1MmQxMjYuOTc2ZDQ5OC42ODhkMTY4Ljk2ZDQ5Mi41NDRkMjEwLjk0NGQ0ODYuNGQyNDkuODU2ZDQ4Ni40ZDM1Mi4yNTZkNDg2LjRkNDA1LjUwNGQ1MzIuOTkyZDQ1OC43NTJkNTc5LjU4NGQ0NTguNzUyZDY4MS45ODNkNDU4Ljc1MmQxMDEwLjY4OGQ0MjIuOTEyZDEwMTguODhkMzcxLjcxMmQxMDI3LjU4NGQzMjAuNTEyZDEwMzYuMjg4ZDI2Ny4yNjRkMTAzNi4yODhkMjE3LjA4OGQxMDM2LjI4OGQxNzYuNjRkMTAyNy4wNzFkMTM2LjE5MmQxMDE3Ljg1NmQxMDguMDMyZDk5Ny4zNzZkNzkuODcyZDk3Ni44OTZkNjQuNTEyZDk0NS4xNTJkNDkuMTUyZDkxMy40MDhkNDkuMTUyZDg2OC4zNTJkNDkuMTUyZDgyNC4zMTlkNjcuMDcyZDc5MS4wNGQ4NC45OTJkNzU3Ljc2ZDExNS43MTJkNzM1Ljc0M2QxNDYuNDMyZDcxMy43MjhkMTg2LjM2OGQ3MDIuOTc2ZDIyNi4zMDRkNjkyLjIyM2QyNzAuMzM2ZDY5Mi4yMjNkMzAzLjEwNGQ2OTIuMjIzZDMyNC4wOTZkNjkzLjc2ZDM0NS4wODhkNjk1LjI5NmQzNTkuNDI0ZDY5Ny4zNDRkMzU5LjQyNGQ2NzcuODg3ZDg3LjA0ZDMzOS45NjdkMTAyLjRkMzE5LjQ4N2QxMjYuOTc2ZDMwNC42NGQxNTEuNTUyZDI4OS43OTJkMTg1LjM0NGQyODkuNzkyZDIwNi44NDhkMjg5Ljc5MmQyMjYuMzA0ZDI5Ni45NmQyNDUuNzZkMzA0LjEyN2QyNjMuNjhkMzEyLjMxOWQyODEuNmQzMjAuNTExZDMwMC4wMzJkMzI3LjY3OWQzMTguNDY0ZDMzNC44NDdkMzM4Ljk0NGQzMzQuODQ3ZDM1Ni4zNTJkMzM0Ljg0N2QzNzEuMmQzMjguNzAzZDM4Ni4wNDhkMzIyLjU1OWQ0MDcuNTUyZDMwMy4xMDRkNDMwLjA4ZDMzMC43NTFkNDQwLjMyZDM2NS41NjhkNDIzLjkzNmQzODUuMDI0ZDM5OC44NDhkMzk5LjM2ZDM3My43NmQ0MTMuNjk2ZDM0MC45OTJkNDEzLjY5NmQzMTkuNDg4ZDQxMy42OTZkMzAwLjAzMmQ0MDYuNTI4ZDI4MC41NzZkMzk5LjM2ZDI2Mi4xNDRkMzkxLjE2OGQyNDMuNzEyZDM4Mi45NzZkMjI1Ljc5MmQzNzUuODA4ZDIwNy44NzJkMzY4LjY0ZDE4OC40MTZkMzY4LjY0ZDE2Ny45MzZkMzY4LjY0ZDE1My42ZDM3NS44MDhkMTM5LjI2NGQzODIuOTc2ZDExOC43ODRkNDAwLjM4NGQxMDcuNTJkMzg2LjA0OGQ5OS4zMjhkMzcxLjE5OWQ5MS4xMzZkMzU2LjM1MmQ4Ny4wNGQzMzkuOTY3aFIzZDUyOS40MDhSNGQ0NTguNzUyUjVkNDkuMTUyUjZkNzM0LjIwOFI3ZC0xMi4yODhSOGQ2ODUuMDU2UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjI3UjEyZDQ5LjE1MlIxM2Q1MjkuNDA4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMTRvUjFkOTU4LjQ2NFIyYWQ4MS45MmQ0OTguNjg4ZDkzLjE4NGQ0OTYuNjRkMTAzLjQyNGQ0OTUuNjE2ZDExMy42NjRkNDk0LjU5MmQxMjQuOTI4ZDQ5NC41OTJkMTM2LjE5MmQ0OTQuNTkyZDE0Ny40NTZkNDk1LjYxNmQxNTguNzJkNDk2LjY0ZDE2Ny45MzZkNDk4LjY4OGQxNzEuMDA4ZDUxNC4wNDhkMTc0LjA4ZDUzOS4xMzZkMTc3LjE1MmQ1NjQuMjIzZDE3Ny4xNTJkNTgxLjYzMmQxOTguNjU2ZDU0Ni44MTZkMjMzLjk4NGQ1MjEuMjE2ZDI2OS4zMTJkNDk1LjYxNmQzMjQuNjA4ZDQ5NS42MTZkMzMyLjhkNDk1LjYxNmQzNDEuNTA0ZDQ5Ni4xMjhkMzUwLjIwOGQ0OTYuNjRkMzU2LjM1MmQ0OTcuNjY0ZDM1OC40ZDUwNi44OGQzNTkuNDI0ZDUxNy4xMmQzNjAuNDQ4ZDUyNy4zNmQzNjAuNDQ4ZDUzOC42MjRkMzYwLjQ0OGQ1NTAuOTEyZDM1OC45MTJkNTY0LjIyM2QzNTcuMzc2ZDU3Ny41MzZkMzU1LjMyOGQ1ODkuODI0ZDM0Ny4xMzZkNTg3Ljc3NmQzMzguNDMyZDU4Ny43NzZkMzI5LjcyOGQ1ODcuNzc2ZDMyNC42MDhkNTg3Ljc3NmQyOTYuOTZkNTg3Ljc3NmQyNzEuODcyZDU5NS40NTZkMjQ2Ljc4NGQ2MDMuMTM2ZDIyNi44MTZkNjIyLjU5MmQyMDYuODQ4ZDY0Mi4wNDhkMTk1LjA3MmQ2NzUuODM5ZDE4My4yOTZkNzA5LjYzMmQxODMuMjk2ZDc2Mi44OGQxODMuMjk2ZDEwMjRkMTcyLjAzMmQxMDI2LjA0OGQxNTguMjA4ZDEwMjcuMDcxZDE0NC4zODRkMTAyOC4wOTZkMTMzLjEyZDEwMjguMDk2ZDEyMS44NTZkMTAyOC4wOTZkMTA4LjAzMmQxMDI3LjA3MWQ5NC4yMDhkMTAyNi4wNDhkODEuOTJkMTAyNGQ4MS45MmQ0OTguNjg4aFIzZDM4MC45MjhSNGQzNjAuNDQ4UjVkODEuOTJSNmQ1MjkuNDA4UjdkLTQuMDk2UjhkNDQ3LjQ4OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTExNFIxMmQ4MS45MlIxM2QzODAuOTI4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjIyNm9SMWQ5NTguNDY0UjJhZDM1OS40MjRkNzc3LjIxNmQzNDQuMDY0ZDc3NS4xNjhkMzIwLjUxMmQ3NzMuMTJkMjk2Ljk2ZDc3MS4wNzJkMjgwLjU3NmQ3NzEuMDcyZDIxNy4wODhkNzcxLjA3MmQxODMuODA4ZDc5NC42MjRkMTUwLjUyOGQ4MTguMTc1ZDE1MC41MjhkODY2LjMwNGQxNTAuNTI4ZDg5Ny4wMjRkMTYxLjc5MmQ5MTQuNDMyZDE3My4wNTZkOTMxLjg0ZDE4OS45NTJkOTQxLjA1NmQyMDYuODQ4ZDk1MC4yNzFkMjI3LjMyOGQ5NTIuMzE5ZDI0Ny44MDhkOTU0LjM2N2QyNjYuMjRkOTU0LjM2N2QyODkuNzkyZDk1NC4zNjdkMzE0Ljg4ZDk1MS44MDhkMzM5Ljk2OGQ5NDkuMjQ4ZDM1OS40MjRkOTQ0LjEyOGQzNTkuNDI0ZDc3Ny4yMTZkMzU5LjQyNGQ2NzcuODg3ZDM1OS40MjRkNjE3LjQ3MmQzMjguNzA0ZDU5My45MmQyOTcuOTg0ZDU3MC4zNjdkMjM5LjYxNmQ1NzAuMzY3ZDIwMy43NzZkNTcwLjM2N2QxNzIuNTQ0ZDU3NmQxNDEuMzEyZDU4MS42MzJkMTExLjYxNmQ1OTAuODQ4ZDkyLjE2ZDU1Ny4wNTZkOTIuMTZkNTA5Ljk1MmQxMjYuOTc2ZDQ5OC42ODhkMTY4Ljk2ZDQ5Mi41NDRkMjEwLjk0NGQ0ODYuNGQyNDkuODU2ZDQ4Ni40ZDM1Mi4yNTZkNDg2LjRkNDA1LjUwNGQ1MzIuOTkyZDQ1OC43NTJkNTc5LjU4NGQ0NTguNzUyZDY4MS45ODNkNDU4Ljc1MmQxMDEwLjY4OGQ0MjIuOTEyZDEwMTguODhkMzcxLjcxMmQxMDI3LjU4NGQzMjAuNTEyZDEwMzYuMjg4ZDI2Ny4yNjRkMTAzNi4yODhkMjE3LjA4OGQxMDM2LjI4OGQxNzYuNjRkMTAyNy4wNzFkMTM2LjE5MmQxMDE3Ljg1NmQxMDguMDMyZDk5Ny4zNzZkNzkuODcyZDk3Ni44OTZkNjQuNTEyZDk0NS4xNTJkNDkuMTUyZDkxMy40MDhkNDkuMTUyZDg2OC4zNTJkNDkuMTUyZDgyNC4zMTlkNjcuMDcyZDc5MS4wNGQ4NC45OTJkNzU3Ljc2ZDExNS43MTJkNzM1Ljc0M2QxNDYuNDMyZDcxMy43MjhkMTg2LjM2OGQ3MDIuOTc2ZDIyNi4zMDRkNjkyLjIyM2QyNzAuMzM2ZDY5Mi4yMjNkMzAzLjEwNGQ2OTIuMjIzZDMyNC4wOTZkNjkzLjc2ZDM0NS4wODhkNjk1LjI5NmQzNTkuNDI0ZDY5Ny4zNDRkMzU5LjQyNGQ2NzcuODg3ZDQyNy4wMDhkNDE1Ljc0NGQ0MTcuNzkyZDQxNy43OTJkNDA2LjAxNmQ0MTguODE2ZDM5NC4yNGQ0MTkuODRkMzgwLjkyOGQ0MTkuODRkMzY3LjYxNmQ0MTkuODRkMzUxLjc0NGQ0MTguODE2ZDMzNS44NzJkNDE3Ljc5MmQzMjIuNTZkNDE1Ljc0NGQyNTZkMzMzLjgyM2QxODkuNDRkNDE1Ljc0NGQxNzguMTc2ZDQxNy43OTJkMTYzLjMyOGQ0MTguODE2ZDE0OC40OGQ0MTkuODRkMTM1LjE2OGQ0MTkuODRkMTA1LjQ3MmQ0MTkuODRkODQuOTkyZDQxNS43NDRkMTk2LjYwOGQyODUuNjk2ZDIwOS45MmQyODMuNjQ4ZDIyNi44MTZkMjgyLjYyNGQyNDMuNzEyZDI4MS42ZDI1OS4wNzJkMjgxLjZkMjcwLjMzNmQyODEuNmQyODYuMjA4ZDI4Mi42MjRkMzAyLjA4ZDI4My42NDhkMzE2LjQxNmQyODYuNzJkNDI3LjAwOGQ0MTUuNzQ0aFIzZDUyOS40MDhSNGQ0NTguNzUyUjVkNDkuMTUyUjZkNzQyLjRSN2QtMTIuMjg4UjhkNjkzLjI0OFI5ZDE4OS40NFIxMGQyNTQuOTc2UjExaTIyNlIxMmQ0OS4xNTJSMTNkNTI5LjQwOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpMmhnOjExM29SMWQ5NTguNDY0UjJhZDQxNy43OTJkMTAyNGQzOTYuMjg4ZDEwMjkuMTE5ZDM3Mi4yMjRkMTAzMi4xOTJkMzQ4LjE2ZDEwMzUuMjYzZDMxOC40NjRkMTAzNS4yNjNkMjY1LjIxNmQxMDM1LjI2M2QyMTcuMDg4ZDEwMjIuNDY0ZDE2OC45NmQxMDA5LjY2NGQxMzIuNjA4ZDk3OC45NDRkOTYuMjU2ZDk0OC4yMjRkNzQuNzUyZDg5OC41NmQ1My4yNDhkODQ4Ljg5NmQ1My4yNDhkNzc1LjE2OGQ1My4yNDhkNzExLjY4ZDczLjIxNmQ2NTguNDMyZDkzLjE4NGQ2MDUuMTg0ZDEzMC4wNDhkNTY2Ljc4NGQxNjYuOTEyZDUyOC4zODRkMjE5LjY0OGQ1MDcuMzkxZDI3Mi4zODRkNDg2LjRkMzM3LjkyZDQ4Ni40ZDM5NS4yNjRkNDg2LjRkNDM2LjIyNGQ0OTIuNTQ0ZDQ3Ny4xODRkNDk4LjY4OGQ1MTguMTQ0ZDUwOS45NTJkNTE4LjE0NGQxMjY1LjY2NGQ1MDYuODhkMTI2Ny43MTJkNDkzLjA1NmQxMjY4LjczNmQ0NzkuMjMyZDEyNjkuNzZkNDY3Ljk2OGQxMjY5Ljc2ZDQ1Ni43MDRkMTI2OS43NmQ0NDIuODhkMTI2OC43MzZkNDI5LjA1NmQxMjY3LjcxMmQ0MTcuNzkyZDEyNjUuNjY0ZDQxNy43OTJkMTAyNGQ0MTcuNzkyZDU3OS41ODRkNDAzLjQ1NmQ1NzYuNTEyZDM5My43MjhkNTc0Ljk3NmQzODRkNTczLjQ0ZDM3NS4yOTZkNTcyLjkyOGQzNjYuNTkyZDU3Mi40MTVkMzU3Ljg4OGQ1NzEuOTA0ZDM0OS4xODRkNTcxLjM5MmQzMzcuOTJkNTcxLjM5MmQyOTIuODY0ZDU3MS4zOTJkMjU5LjA3MmQ1ODYuNzUyZDIyNS4yOGQ2MDIuMTEyZDIwMy4yNjRkNjI5Ljc2ZDE4MS4yNDhkNjU3LjQwOGQxNjkuOTg0ZDY5NS4yOTZkMTU4LjcyZDczMy4xODRkMTU4LjcyZDc3OS4yNjRkMTU4LjcyZDgyNS4zNDRkMTcxLjAwOGQ4NTguMTEyZDE4My4yOTZkODkwLjg4ZDIwNS4zMTJkOTExLjg3MmQyMjcuMzI4ZDkzMi44NjRkMjU3LjAyNGQ5NDIuMDhkMjg2LjcyZDk1MS4yOTZkMzIyLjU2ZDk1MS4yOTZkMzQ5LjE4NGQ5NTEuMjk2ZDM3My4yNDhkOTQ3LjJkMzk3LjMxMmQ5NDMuMTA0ZDQxNy43OTJkOTM3Ljk4NGQ0MTcuNzkyZDU3OS41ODRoUjNkNTk5LjA0UjRkNTE4LjE0NFI1ZDUzLjI0OFI2ZDUzNy42UjdkLTI0NS43NlI4ZDQ4NC4zNTJSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkxMTNSMTJkNTMuMjQ4UjEzZDU5OS4wNFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MjI1b1IxZDk1OC40NjRSMmFkMzU5LjQyNGQ3NzcuMjE2ZDM0NC4wNjRkNzc1LjE2OGQzMjAuNTEyZDc3My4xMmQyOTYuOTZkNzcxLjA3MmQyODAuNTc2ZDc3MS4wNzJkMjE3LjA4OGQ3NzEuMDcyZDE4My44MDhkNzk0LjYyNGQxNTAuNTI4ZDgxOC4xNzVkMTUwLjUyOGQ4NjYuMzA0ZDE1MC41MjhkODk3LjAyNGQxNjEuNzkyZDkxNC40MzJkMTczLjA1NmQ5MzEuODRkMTg5Ljk1MmQ5NDEuMDU2ZDIwNi44NDhkOTUwLjI3MWQyMjcuMzI4ZDk1Mi4zMTlkMjQ3LjgwOGQ5NTQuMzY3ZDI2Ni4yNGQ5NTQuMzY3ZDI4OS43OTJkOTU0LjM2N2QzMTQuODhkOTUxLjgwOGQzMzkuOTY4ZDk0OS4yNDhkMzU5LjQyNGQ5NDQuMTI4ZDM1OS40MjRkNzc3LjIxNmQzNTkuNDI0ZDY3Ny44ODdkMzU5LjQyNGQ2MTcuNDcyZDMyOC43MDRkNTkzLjkyZDI5Ny45ODRkNTcwLjM2N2QyMzkuNjE2ZDU3MC4zNjdkMjAzLjc3NmQ1NzAuMzY3ZDE3Mi41NDRkNTc2ZDE0MS4zMTJkNTgxLjYzMmQxMTEuNjE2ZDU5MC44NDhkOTIuMTZkNTU3LjA1NmQ5Mi4xNmQ1MDkuOTUyZDEyNi45NzZkNDk4LjY4OGQxNjguOTZkNDkyLjU0NGQyMTAuOTQ0ZDQ4Ni40ZDI0OS44NTZkNDg2LjRkMzUyLjI1NmQ0ODYuNGQ0MDUuNTA0ZDUzMi45OTJkNDU4Ljc1MmQ1NzkuNTg0ZDQ1OC43NTJkNjgxLjk4M2Q0NTguNzUyZDEwMTAuNjg4ZDQyMi45MTJkMTAxOC44OGQzNzEuNzEyZDEwMjcuNTg0ZDMyMC41MTJkMTAzNi4yODhkMjY3LjI2NGQxMDM2LjI4OGQyMTcuMDg4ZDEwMzYuMjg4ZDE3Ni42NGQxMDI3LjA3MWQxMzYuMTkyZDEwMTcuODU2ZDEwOC4wMzJkOTk3LjM3NmQ3OS44NzJkOTc2Ljg5NmQ2NC41MTJkOTQ1LjE1MmQ0OS4xNTJkOTEzLjQwOGQ0OS4xNTJkODY4LjM1MmQ0OS4xNTJkODI0LjMxOWQ2Ny4wNzJkNzkxLjA0ZDg0Ljk5MmQ3NTcuNzZkMTE1LjcxMmQ3MzUuNzQzZDE0Ni40MzJkNzEzLjcyOGQxODYuMzY4ZDcwMi45NzZkMjI2LjMwNGQ2OTIuMjIzZDI3MC4zMzZkNjkyLjIyM2QzMDMuMTA0ZDY5Mi4yMjNkMzI0LjA5NmQ2OTMuNzZkMzQ1LjA4OGQ2OTUuMjk2ZDM1OS40MjRkNjk3LjM0NGQzNTkuNDI0ZDY3Ny44ODdkMjY0LjE5MmQ0MTUuNzQ0ZDI1Mi45MjhkNDE3Ljc5MmQyMzkuNjE2ZDQxOC44MTZkMjI2LjMwNGQ0MTkuODRkMjA5LjkyZDQxOS44NGQxOTguNjU2ZDQxOS44NGQxODYuODhkNDE4LjgxNmQxNzUuMTA0ZDQxNy43OTJkMTYyLjgxNmQ0MTUuNzQ0ZDI4MC41NzZkMjg1LjY5NmQyOTUuOTM2ZDI4My42NDhkMzEyLjMyZDI4Mi42MjRkMzI4LjcwNGQyODEuNmQzNDYuMTEyZDI4MS42ZDM2NC41NDRkMjgxLjZkMzc5LjkwNGQyODIuNjI0ZDM5NS4yNjRkMjgzLjY0OGQ0MDkuNmQyODUuNjk2ZDI2NC4xOTJkNDE1Ljc0NGhSM2Q1MjkuNDA4UjRkNDU4Ljc1MlI1ZDQ5LjE1MlI2ZDc0Mi40UjdkLTEyLjI4OFI4ZDY5My4yNDhSOWQxODkuNDRSMTBkMjU0Ljk3NlIxMWkyMjVSMTJkNDkuMTUyUjEzZDUyOS40MDhSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kyaTNpM2kzaTNpMmhnOjExMm9SMWQ5NTguNDY0UjJhZDgwLjg5NmQ0OTguNjg4ZDkxLjEzNmQ0OTYuNjRkMTAxLjg4OGQ0OTUuNjE2ZDExMi42NGQ0OTQuNTkyZDEyMy45MDRkNDk0LjU5MmQxMzQuMTQ0ZDQ5NC41OTJkMTQ1LjQwOGQ0OTUuNjE2ZDE1Ni42NzJkNDk2LjY0ZDE2Ni45MTJkNDk4LjY4OGQxNjcuOTM2ZDUwMC43MzZkMTY5LjQ3MmQ1MTEuNDg3ZDE3MS4wMDhkNTIyLjI0ZDE3Mi41NDRkNTM0LjUyOGQxNzQuMDhkNTQ2LjgxNmQxNzUuNjE2ZDU1OC4wNzlkMTc3LjE1MmQ1NjkuMzQ0ZDE3Ny4xNTJkNTcyLjQxNWQxODcuMzkyZDU1Ni4wMzFkMjAxLjcyOGQ1NDAuNjcyZDIxNi4wNjRkNTI1LjMxMmQyMzYuMDMyZDUxMy4wMjRkMjU2ZDUwMC43MzZkMjgxLjA4OGQ0OTMuNTY4ZDMwNi4xNzZkNDg2LjRkMzM2Ljg5NmQ0ODYuNGQzODIuOTc2ZDQ4Ni40ZDQyMi40ZDUwMS43NmQ0NjEuODI0ZDUxNy4xMmQ0ODkuOTg0ZDU0OS4zNzZkNTE4LjE0NGQ1ODEuNjMyZDUzNC4wMTZkNjMxLjI5NmQ1NDkuODg4ZDY4MC45NmQ1NDkuODg4ZDc0OC41NDRkNTQ5Ljg4OGQ4ODMuNzEyZDQ3Ni42NzJkOTYwZDQwMy40NTZkMTAzNi4yODhkMjY5LjMxMmQxMDM2LjI4OGQyNDYuNzg0ZDEwMzYuMjg4ZDIyMy4yMzJkMTAzMy4yMTVkMTk5LjY4ZDEwMzAuMTQ0ZDE4Mi4yNzJkMTAyNS4wMjNkMTgyLjI3MmQxMjY1LjY2NGQxNjkuOTg0ZDEyNjcuNzEyZDE1Ni4xNmQxMjY4LjczNmQxNDIuMzM2ZDEyNjkuNzZkMTMxLjA3MmQxMjY5Ljc2ZDExOS44MDhkMTI2OS43NmQxMDUuOTg0ZDEyNjguNzM2ZDkyLjE2ZDEyNjcuNzEyZDgwLjg5NmQxMjY1LjY2NGQ4MC44OTZkNDk4LjY4OGQxODIuMjcyZDkzNy45ODRkMjAxLjcyOGQ5NDUuMTUyZDIyMi4yMDhkOTQ4LjIyNGQyNDIuNjg4ZDk1MS4yOTZkMjc1LjQ1NmQ5NTEuMjk2ZDMxMi4zMmQ5NTEuMjk2ZDM0My4wNGQ5MzkuNTJkMzczLjc2ZDkyNy43NDRkMzk1Ljc3NmQ5MDMuMTY4ZDQxNy43OTJkODc4LjU5MmQ0MzAuNTkyZDg0MS4yMTZkNDQzLjM5MmQ4MDMuODRkNDQzLjM5MmQ3NTIuNjRkNDQzLjM5MmQ2NzAuNzJkNDEzLjE4NGQ2MjIuNTkyZDM4Mi45NzZkNTc0LjQ2NGQzMTQuMzY4ZDU3NC40NjRkMjg4Ljc2OGQ1NzQuNDY0ZDI2NS4yMTZkNTgzLjY4ZDI0MS42NjRkNTkyLjg5NmQyMjMuMjMyZDYxMS4zMjhkMjA0LjhkNjI5Ljc2ZDE5My41MzZkNjU3LjkyZDE4Mi4yNzJkNjg2LjA3OWQxODIuMjcyZDcyNC45OTJkMTgyLjI3MmQ5MzcuOTg0aFIzZDYwNC4xNlI0ZDU0OS44ODhSNWQ4MC44OTZSNmQ1MzcuNlI3ZC0yNDUuNzZSOGQ0NTYuNzA0UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMTEyUjEyZDgwLjg5NlIxM2Q2MDQuMTZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjIyNG9SMWQ5NTguNDY0UjJhZDM1OS40MjRkNzc3LjIxNmQzNDQuMDY0ZDc3NS4xNjhkMzIwLjUxMmQ3NzMuMTJkMjk2Ljk2ZDc3MS4wNzJkMjgwLjU3NmQ3NzEuMDcyZDIxNy4wODhkNzcxLjA3MmQxODMuODA4ZDc5NC42MjRkMTUwLjUyOGQ4MTguMTc1ZDE1MC41MjhkODY2LjMwNGQxNTAuNTI4ZDg5Ny4wMjRkMTYxLjc5MmQ5MTQuNDMyZDE3My4wNTZkOTMxLjg0ZDE4OS45NTJkOTQxLjA1NmQyMDYuODQ4ZDk1MC4yNzFkMjI3LjMyOGQ5NTIuMzE5ZDI0Ny44MDhkOTU0LjM2N2QyNjYuMjRkOTU0LjM2N2QyODkuNzkyZDk1NC4zNjdkMzE0Ljg4ZDk1MS44MDhkMzM5Ljk2OGQ5NDkuMjQ4ZDM1OS40MjRkOTQ0LjEyOGQzNTkuNDI0ZDc3Ny4yMTZkMzU5LjQyNGQ2NzcuODg3ZDM1OS40MjRkNjE3LjQ3MmQzMjguNzA0ZDU5My45MmQyOTcuOTg0ZDU3MC4zNjdkMjM5LjYxNmQ1NzAuMzY3ZDIwMy43NzZkNTcwLjM2N2QxNzIuNTQ0ZDU3NmQxNDEuMzEyZDU4MS42MzJkMTExLjYxNmQ1OTAuODQ4ZDkyLjE2ZDU1Ny4wNTZkOTIuMTZkNTA5Ljk1MmQxMjYuOTc2ZDQ5OC42ODhkMTY4Ljk2ZDQ5Mi41NDRkMjEwLjk0NGQ0ODYuNGQyNDkuODU2ZDQ4Ni40ZDM1Mi4yNTZkNDg2LjRkNDA1LjUwNGQ1MzIuOTkyZDQ1OC43NTJkNTc5LjU4NGQ0NTguNzUyZDY4MS45ODNkNDU4Ljc1MmQxMDEwLjY4OGQ0MjIuOTEyZDEwMTguODhkMzcxLjcxMmQxMDI3LjU4NGQzMjAuNTEyZDEwMzYuMjg4ZDI2Ny4yNjRkMTAzNi4yODhkMjE3LjA4OGQxMDM2LjI4OGQxNzYuNjRkMTAyNy4wNzFkMTM2LjE5MmQxMDE3Ljg1NmQxMDguMDMyZDk5Ny4zNzZkNzkuODcyZDk3Ni44OTZkNjQuNTEyZDk0NS4xNTJkNDkuMTUyZDkxMy40MDhkNDkuMTUyZDg2OC4zNTJkNDkuMTUyZDgyNC4zMTlkNjcuMDcyZDc5MS4wNGQ4NC45OTJkNzU3Ljc2ZDExNS43MTJkNzM1Ljc0M2QxNDYuNDMyZDcxMy43MjhkMTg2LjM2OGQ3MDIuOTc2ZDIyNi4zMDRkNjkyLjIyM2QyNzAuMzM2ZDY5Mi4yMjNkMzAzLjEwNGQ2OTIuMjIzZDMyNC4wOTZkNjkzLjc2ZDM0NS4wODhkNjk1LjI5NmQzNTkuNDI0ZDY5Ny4zNDRkMzU5LjQyNGQ2NzcuODg3ZDM1Ny4zNzZkMjg1LjY5NmQzNzIuNzM2ZDI4My42NDhkMzg4LjA5NmQyODIuNjI0ZDQwMy40NTZkMjgxLjZkNDIxLjg4OGQyODEuNmQ0MzguMjcyZDI4MS42ZDQ1NS4xNjhkMjgyLjYyNGQ0NzIuMDY0ZDI4My42NDhkNDg3LjQyNGQyODUuNjk2ZDYwNS4xODRkNDE1Ljc0NGQ1ODEuNjMyZDQxOS44NGQ1NTcuMDU2ZDQxOS44NGQ1NDEuNjk2ZDQxOS44NGQ1MjcuODcyZDQxOC44MTZkNTE0LjA0OGQ0MTcuNzkyZDUwMi43ODRkNDE1Ljc0NGQzNTcuMzc2ZDI4NS42OTZoUjNkNTI5LjQwOFI0ZDQ1OC43NTJSNWQ0OS4xNTJSNmQ3NDIuNFI3ZC0xMi4yODhSOGQ2OTMuMjQ4UjlkMTg5LjQ0UjEwZDI1NC45NzZSMTFpMjI0UjEyZDQ5LjE1MlIxM2Q1MjkuNDA4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNpM2kyaGdoeTg6Zm9udE5hbWV5NTpBbGxlcmc"}];
flash.display.DisplayObject.GRAPHICS_INVALID = 2;
flash.display.DisplayObject.MATRIX_INVALID = 4;
flash.display.DisplayObject.MATRIX_CHAIN_INVALID = 8;
flash.display.DisplayObject.MATRIX_OVERRIDDEN = 16;
flash.display.DisplayObject.TRANSFORM_INVALID = 32;
flash.display.DisplayObject.BOUNDS_INVALID = 64;
flash.display.DisplayObject.RENDER_VALIDATE_IN_PROGRESS = 1024;
flash.display.DisplayObject.ALL_RENDER_FLAGS = 98;
flash.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
flash.text.Font.DEFAULT_FONT_SCALE = 9.0;
flash.text.Font.DEFAULT_FONT_NAME = "Bitstream_Vera_Sans";
flash.text.Font.DEFAULT_CLASS_NAME = "flash.text.Font";
flash.text.Font.nmeRegisteredFonts = new Array();
com.DefaultFont.resourceName = "NME_font_com_DefaultFont";
com.gamekit.text.LatexParser.baseFontSize = 14;
com.mahjong.view.TileView.roundDiameter = 16;
com.mahjong.view.TileView.depth = 5;
com.mahjong.view.TileView.defaultSizeWidth = 48;
com.mahjong.view.TileView.defaultSizeHeight = 72;
flash.Lib.HTML_ACCELEROMETER_EVENT_TYPE = "devicemotion";
flash.Lib.HTML_ORIENTATION_EVENT_TYPE = "orientationchange";
flash.Lib.DEFAULT_HEIGHT = 500;
flash.Lib.DEFAULT_WIDTH = 500;
flash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseover","mouseout","mousewheel","dblclick","click"];
flash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES = ["mousedown","mousemove","mouseup"];
flash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize","blur","focus"];
flash.Lib.NME_IDENTIFIER = "haxe:jeash";
flash.Lib.VENDOR_HTML_TAG = "data-";
flash.Lib.starttime = haxe.Timer.stamp();
flash.display._BitmapData.MinstdGenerator.a = 16807;
flash.display._BitmapData.MinstdGenerator.m = -2147483648 - 1;
flash.display.BitmapDataChannel.ALPHA = 8;
flash.display.BitmapDataChannel.BLUE = 4;
flash.display.BitmapDataChannel.GREEN = 2;
flash.display.BitmapDataChannel.RED = 1;
flash.display.Graphics.TILE_SCALE = 1;
flash.display.Graphics.TILE_ROTATION = 2;
flash.display.Graphics.TILE_RGB = 4;
flash.display.Graphics.TILE_ALPHA = 8;
flash.display.Graphics.TILE_TRANS_2x2 = 16;
flash.display.Graphics.TILE_BLEND_NORMAL = 0;
flash.display.Graphics.TILE_BLEND_ADD = 65536;
flash.display.Graphics.BMP_REPEAT = 16;
flash.display.Graphics.BMP_SMOOTH = 65536;
flash.display.Graphics.CORNER_ROUND = 0;
flash.display.Graphics.CORNER_MITER = 4096;
flash.display.Graphics.CORNER_BEVEL = 8192;
flash.display.Graphics.CURVE = 2;
flash.display.Graphics.END_NONE = 0;
flash.display.Graphics.END_ROUND = 256;
flash.display.Graphics.END_SQUARE = 512;
flash.display.Graphics.LINE = 1;
flash.display.Graphics.MOVE = 0;
flash.display.Graphics.NME_MAX_DIM = 5000;
flash.display.Graphics.PIXEL_HINTING = 16384;
flash.display.Graphics.RADIAL = 1;
flash.display.Graphics.SCALE_HORIZONTAL = 2;
flash.display.Graphics.SCALE_NONE = 0;
flash.display.Graphics.SCALE_NORMAL = 3;
flash.display.Graphics.SCALE_VERTICAL = 1;
flash.display.Graphics.SPREAD_REPEAT = 2;
flash.display.Graphics.SPREAD_REFLECT = 4;
flash.display.GraphicsPathCommand.LINE_TO = 2;
flash.display.GraphicsPathCommand.MOVE_TO = 1;
flash.display.GraphicsPathCommand.CURVE_TO = 3;
flash.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
flash.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
flash.display.GraphicsPathCommand.NO_OP = 0;
flash.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
flash.events.Event.ACTIVATE = "activate";
flash.events.Event.ADDED = "added";
flash.events.Event.ADDED_TO_STAGE = "addedToStage";
flash.events.Event.CANCEL = "cancel";
flash.events.Event.CHANGE = "change";
flash.events.Event.CLOSE = "close";
flash.events.Event.COMPLETE = "complete";
flash.events.Event.CONNECT = "connect";
flash.events.Event.CONTEXT3D_CREATE = "context3DCreate";
flash.events.Event.DEACTIVATE = "deactivate";
flash.events.Event.ENTER_FRAME = "enterFrame";
flash.events.Event.ID3 = "id3";
flash.events.Event.INIT = "init";
flash.events.Event.MOUSE_LEAVE = "mouseLeave";
flash.events.Event.OPEN = "open";
flash.events.Event.REMOVED = "removed";
flash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
flash.events.Event.RENDER = "render";
flash.events.Event.RESIZE = "resize";
flash.events.Event.SCROLL = "scroll";
flash.events.Event.SELECT = "select";
flash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
flash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
flash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
flash.events.Event.UNLOAD = "unload";
flash.events.Event.SOUND_COMPLETE = "soundComplete";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
flash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
flash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
flash.events.MouseEvent.MOUSE_OUT = "mouseOut";
flash.events.MouseEvent.MOUSE_OVER = "mouseOver";
flash.events.MouseEvent.MOUSE_UP = "mouseUp";
flash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
flash.events.MouseEvent.RIGHT_CLICK = "rightClick";
flash.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
flash.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
flash.events.MouseEvent.ROLL_OUT = "rollOut";
flash.events.MouseEvent.ROLL_OVER = "rollOver";
flash.display.Stage.NAME = "Stage";
flash.display.Stage.nmeAcceleration = { x : 0.0, y : 1.0, z : 0.0};
flash.display.Stage.OrientationPortrait = 1;
flash.display.Stage.OrientationPortraitUpsideDown = 2;
flash.display.Stage.OrientationLandscapeRight = 3;
flash.display.Stage.OrientationLandscapeLeft = 4;
flash.display.Stage.DEFAULT_FRAMERATE = 0.0;
flash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
flash.display.Stage.nmeMouseChanges = [flash.events.MouseEvent.MOUSE_OUT,flash.events.MouseEvent.MOUSE_OVER,flash.events.MouseEvent.ROLL_OUT,flash.events.MouseEvent.ROLL_OVER];
flash.display.Stage.nmeTouchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
flash.display.StageQuality.BEST = "best";
flash.display.StageQuality.HIGH = "high";
flash.display.StageQuality.MEDIUM = "medium";
flash.display.StageQuality.LOW = "low";
flash.errors.Error.DEFAULT_TO_STRING = "Error";
flash.events.TextEvent.LINK = "link";
flash.events.TextEvent.TEXT_INPUT = "textInput";
flash.events.ErrorEvent.ERROR = "error";
flash.events.Listener.sIDs = 1;
flash.events.EventPhase.CAPTURING_PHASE = 0;
flash.events.EventPhase.AT_TARGET = 1;
flash.events.EventPhase.BUBBLING_PHASE = 2;
flash.events.FocusEvent.FOCUS_IN = "focusIn";
flash.events.FocusEvent.FOCUS_OUT = "focusOut";
flash.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
flash.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
flash.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
flash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
flash.events.IOErrorEvent.IO_ERROR = "ioError";
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";
flash.events.ProgressEvent.PROGRESS = "progress";
flash.events.ProgressEvent.SOCKET_DATA = "socketData";
flash.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
flash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
flash.events.TouchEvent.TOUCH_END = "touchEnd";
flash.events.TouchEvent.TOUCH_MOVE = "touchMove";
flash.events.TouchEvent.TOUCH_OUT = "touchOut";
flash.events.TouchEvent.TOUCH_OVER = "touchOver";
flash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
flash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
flash.events.TouchEvent.TOUCH_TAP = "touchTap";
flash.filters.DropShadowFilter.DEGREES_FULL_RADIUS = 360.0;
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
flash.media.Sound.EXTENSION_MP3 = "mp3";
flash.media.Sound.EXTENSION_OGG = "ogg";
flash.media.Sound.EXTENSION_WAV = "wav";
flash.media.Sound.EXTENSION_AAC = "aac";
flash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
flash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
flash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
flash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
flash.net.URLRequestMethod.DELETE = "DELETE";
flash.net.URLRequestMethod.GET = "GET";
flash.net.URLRequestMethod.HEAD = "HEAD";
flash.net.URLRequestMethod.OPTIONS = "OPTIONS";
flash.net.URLRequestMethod.POST = "POST";
flash.net.URLRequestMethod.PUT = "PUT";
flash.system.ApplicationDomain.currentDomain = new flash.system.ApplicationDomain(null);
flash.system.SecurityDomain.currentDomain = new flash.system.SecurityDomain();
flash.text.TextField.mDefaultFont = "Bitstream_Vera_Sans";
flash.text.FontInstance.mSolidFonts = new haxe.ds.StringMap();
flash.text.TextFieldAutoSize.CENTER = "CENTER";
flash.text.TextFieldAutoSize.LEFT = "LEFT";
flash.text.TextFieldAutoSize.NONE = "NONE";
flash.text.TextFieldAutoSize.RIGHT = "RIGHT";
flash.text.TextFieldType.DYNAMIC = "DYNAMIC";
flash.text.TextFieldType.INPUT = "INPUT";
flash.ui.Keyboard.NUMBER_0 = 48;
flash.ui.Keyboard.NUMBER_1 = 49;
flash.ui.Keyboard.NUMBER_2 = 50;
flash.ui.Keyboard.NUMBER_3 = 51;
flash.ui.Keyboard.NUMBER_4 = 52;
flash.ui.Keyboard.NUMBER_5 = 53;
flash.ui.Keyboard.NUMBER_6 = 54;
flash.ui.Keyboard.NUMBER_7 = 55;
flash.ui.Keyboard.NUMBER_8 = 56;
flash.ui.Keyboard.NUMBER_9 = 57;
flash.ui.Keyboard.A = 65;
flash.ui.Keyboard.B = 66;
flash.ui.Keyboard.C = 67;
flash.ui.Keyboard.D = 68;
flash.ui.Keyboard.E = 69;
flash.ui.Keyboard.F = 70;
flash.ui.Keyboard.G = 71;
flash.ui.Keyboard.H = 72;
flash.ui.Keyboard.I = 73;
flash.ui.Keyboard.J = 74;
flash.ui.Keyboard.K = 75;
flash.ui.Keyboard.L = 76;
flash.ui.Keyboard.M = 77;
flash.ui.Keyboard.N = 78;
flash.ui.Keyboard.O = 79;
flash.ui.Keyboard.P = 80;
flash.ui.Keyboard.Q = 81;
flash.ui.Keyboard.R = 82;
flash.ui.Keyboard.S = 83;
flash.ui.Keyboard.T = 84;
flash.ui.Keyboard.U = 85;
flash.ui.Keyboard.V = 86;
flash.ui.Keyboard.W = 87;
flash.ui.Keyboard.X = 88;
flash.ui.Keyboard.Y = 89;
flash.ui.Keyboard.Z = 90;
flash.ui.Keyboard.NUMPAD_0 = 96;
flash.ui.Keyboard.NUMPAD_1 = 97;
flash.ui.Keyboard.NUMPAD_2 = 98;
flash.ui.Keyboard.NUMPAD_3 = 99;
flash.ui.Keyboard.NUMPAD_4 = 100;
flash.ui.Keyboard.NUMPAD_5 = 101;
flash.ui.Keyboard.NUMPAD_6 = 102;
flash.ui.Keyboard.NUMPAD_7 = 103;
flash.ui.Keyboard.NUMPAD_8 = 104;
flash.ui.Keyboard.NUMPAD_9 = 105;
flash.ui.Keyboard.NUMPAD_MULTIPLY = 106;
flash.ui.Keyboard.NUMPAD_ADD = 107;
flash.ui.Keyboard.NUMPAD_ENTER = 108;
flash.ui.Keyboard.NUMPAD_SUBTRACT = 109;
flash.ui.Keyboard.NUMPAD_DECIMAL = 110;
flash.ui.Keyboard.NUMPAD_DIVIDE = 111;
flash.ui.Keyboard.F1 = 112;
flash.ui.Keyboard.F2 = 113;
flash.ui.Keyboard.F3 = 114;
flash.ui.Keyboard.F4 = 115;
flash.ui.Keyboard.F5 = 116;
flash.ui.Keyboard.F6 = 117;
flash.ui.Keyboard.F7 = 118;
flash.ui.Keyboard.F8 = 119;
flash.ui.Keyboard.F9 = 120;
flash.ui.Keyboard.F10 = 121;
flash.ui.Keyboard.F11 = 122;
flash.ui.Keyboard.F12 = 123;
flash.ui.Keyboard.F13 = 124;
flash.ui.Keyboard.F14 = 125;
flash.ui.Keyboard.F15 = 126;
flash.ui.Keyboard.BACKSPACE = 8;
flash.ui.Keyboard.TAB = 9;
flash.ui.Keyboard.ENTER = 13;
flash.ui.Keyboard.SHIFT = 16;
flash.ui.Keyboard.CONTROL = 17;
flash.ui.Keyboard.CAPS_LOCK = 18;
flash.ui.Keyboard.ESCAPE = 27;
flash.ui.Keyboard.SPACE = 32;
flash.ui.Keyboard.PAGE_UP = 33;
flash.ui.Keyboard.PAGE_DOWN = 34;
flash.ui.Keyboard.END = 35;
flash.ui.Keyboard.HOME = 36;
flash.ui.Keyboard.LEFT = 37;
flash.ui.Keyboard.RIGHT = 39;
flash.ui.Keyboard.UP = 38;
flash.ui.Keyboard.DOWN = 40;
flash.ui.Keyboard.INSERT = 45;
flash.ui.Keyboard.DELETE = 46;
flash.ui.Keyboard.NUMLOCK = 144;
flash.ui.Keyboard.BREAK = 19;
flash.ui.Keyboard.SEMICOLON = 186;
flash.ui.Keyboard.EQUAL = 187;
flash.ui.Keyboard.COMMA = 188;
flash.ui.Keyboard.MINUS = 189;
flash.ui.Keyboard.PERIOD = 190;
flash.ui.Keyboard.SLASH = 191;
flash.ui.Keyboard.BACKQUOTE = 192;
flash.ui.Keyboard.LEFTBRACKET = 219;
flash.ui.Keyboard.BACKSLASH = 220;
flash.ui.Keyboard.RIGHTBRACKET = 221;
flash.ui.Keyboard.DOM_VK_CANCEL = 3;
flash.ui.Keyboard.DOM_VK_HELP = 6;
flash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
flash.ui.Keyboard.DOM_VK_TAB = 9;
flash.ui.Keyboard.DOM_VK_CLEAR = 12;
flash.ui.Keyboard.DOM_VK_RETURN = 13;
flash.ui.Keyboard.DOM_VK_ENTER = 14;
flash.ui.Keyboard.DOM_VK_SHIFT = 16;
flash.ui.Keyboard.DOM_VK_CONTROL = 17;
flash.ui.Keyboard.DOM_VK_ALT = 18;
flash.ui.Keyboard.DOM_VK_PAUSE = 19;
flash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
flash.ui.Keyboard.DOM_VK_ESCAPE = 27;
flash.ui.Keyboard.DOM_VK_SPACE = 32;
flash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
flash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
flash.ui.Keyboard.DOM_VK_END = 35;
flash.ui.Keyboard.DOM_VK_HOME = 36;
flash.ui.Keyboard.DOM_VK_LEFT = 37;
flash.ui.Keyboard.DOM_VK_UP = 38;
flash.ui.Keyboard.DOM_VK_RIGHT = 39;
flash.ui.Keyboard.DOM_VK_DOWN = 40;
flash.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
flash.ui.Keyboard.DOM_VK_INSERT = 45;
flash.ui.Keyboard.DOM_VK_DELETE = 46;
flash.ui.Keyboard.DOM_VK_0 = 48;
flash.ui.Keyboard.DOM_VK_1 = 49;
flash.ui.Keyboard.DOM_VK_2 = 50;
flash.ui.Keyboard.DOM_VK_3 = 51;
flash.ui.Keyboard.DOM_VK_4 = 52;
flash.ui.Keyboard.DOM_VK_5 = 53;
flash.ui.Keyboard.DOM_VK_6 = 54;
flash.ui.Keyboard.DOM_VK_7 = 55;
flash.ui.Keyboard.DOM_VK_8 = 56;
flash.ui.Keyboard.DOM_VK_9 = 57;
flash.ui.Keyboard.DOM_VK_SEMICOLON = 59;
flash.ui.Keyboard.DOM_VK_EQUALS = 61;
flash.ui.Keyboard.DOM_VK_A = 65;
flash.ui.Keyboard.DOM_VK_B = 66;
flash.ui.Keyboard.DOM_VK_C = 67;
flash.ui.Keyboard.DOM_VK_D = 68;
flash.ui.Keyboard.DOM_VK_E = 69;
flash.ui.Keyboard.DOM_VK_F = 70;
flash.ui.Keyboard.DOM_VK_G = 71;
flash.ui.Keyboard.DOM_VK_H = 72;
flash.ui.Keyboard.DOM_VK_I = 73;
flash.ui.Keyboard.DOM_VK_J = 74;
flash.ui.Keyboard.DOM_VK_K = 75;
flash.ui.Keyboard.DOM_VK_L = 76;
flash.ui.Keyboard.DOM_VK_M = 77;
flash.ui.Keyboard.DOM_VK_N = 78;
flash.ui.Keyboard.DOM_VK_O = 79;
flash.ui.Keyboard.DOM_VK_P = 80;
flash.ui.Keyboard.DOM_VK_Q = 81;
flash.ui.Keyboard.DOM_VK_R = 82;
flash.ui.Keyboard.DOM_VK_S = 83;
flash.ui.Keyboard.DOM_VK_T = 84;
flash.ui.Keyboard.DOM_VK_U = 85;
flash.ui.Keyboard.DOM_VK_V = 86;
flash.ui.Keyboard.DOM_VK_W = 87;
flash.ui.Keyboard.DOM_VK_X = 88;
flash.ui.Keyboard.DOM_VK_Y = 89;
flash.ui.Keyboard.DOM_VK_Z = 90;
flash.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
flash.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
flash.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
flash.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
flash.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
flash.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
flash.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
flash.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
flash.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
flash.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
flash.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
flash.ui.Keyboard.DOM_VK_MULTIPLY = 106;
flash.ui.Keyboard.DOM_VK_ADD = 107;
flash.ui.Keyboard.DOM_VK_SEPARATOR = 108;
flash.ui.Keyboard.DOM_VK_SUBTRACT = 109;
flash.ui.Keyboard.DOM_VK_DECIMAL = 110;
flash.ui.Keyboard.DOM_VK_DIVIDE = 111;
flash.ui.Keyboard.DOM_VK_F1 = 112;
flash.ui.Keyboard.DOM_VK_F2 = 113;
flash.ui.Keyboard.DOM_VK_F3 = 114;
flash.ui.Keyboard.DOM_VK_F4 = 115;
flash.ui.Keyboard.DOM_VK_F5 = 116;
flash.ui.Keyboard.DOM_VK_F6 = 117;
flash.ui.Keyboard.DOM_VK_F7 = 118;
flash.ui.Keyboard.DOM_VK_F8 = 119;
flash.ui.Keyboard.DOM_VK_F9 = 120;
flash.ui.Keyboard.DOM_VK_F10 = 121;
flash.ui.Keyboard.DOM_VK_F11 = 122;
flash.ui.Keyboard.DOM_VK_F12 = 123;
flash.ui.Keyboard.DOM_VK_F13 = 124;
flash.ui.Keyboard.DOM_VK_F14 = 125;
flash.ui.Keyboard.DOM_VK_F15 = 126;
flash.ui.Keyboard.DOM_VK_F16 = 127;
flash.ui.Keyboard.DOM_VK_F17 = 128;
flash.ui.Keyboard.DOM_VK_F18 = 129;
flash.ui.Keyboard.DOM_VK_F19 = 130;
flash.ui.Keyboard.DOM_VK_F20 = 131;
flash.ui.Keyboard.DOM_VK_F21 = 132;
flash.ui.Keyboard.DOM_VK_F22 = 133;
flash.ui.Keyboard.DOM_VK_F23 = 134;
flash.ui.Keyboard.DOM_VK_F24 = 135;
flash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
flash.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
flash.ui.Keyboard.DOM_VK_COMMA = 188;
flash.ui.Keyboard.DOM_VK_PERIOD = 190;
flash.ui.Keyboard.DOM_VK_SLASH = 191;
flash.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
flash.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
flash.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
flash.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
flash.ui.Keyboard.DOM_VK_QUOTE = 222;
flash.ui.Keyboard.DOM_VK_META = 224;
flash.ui.Keyboard.DOM_VK_KANA = 21;
flash.ui.Keyboard.DOM_VK_HANGUL = 21;
flash.ui.Keyboard.DOM_VK_JUNJA = 23;
flash.ui.Keyboard.DOM_VK_FINAL = 24;
flash.ui.Keyboard.DOM_VK_HANJA = 25;
flash.ui.Keyboard.DOM_VK_KANJI = 25;
flash.ui.Keyboard.DOM_VK_CONVERT = 28;
flash.ui.Keyboard.DOM_VK_NONCONVERT = 29;
flash.ui.Keyboard.DOM_VK_ACEPT = 30;
flash.ui.Keyboard.DOM_VK_MODECHANGE = 31;
flash.ui.Keyboard.DOM_VK_SELECT = 41;
flash.ui.Keyboard.DOM_VK_PRINT = 42;
flash.ui.Keyboard.DOM_VK_EXECUTE = 43;
flash.ui.Keyboard.DOM_VK_SLEEP = 95;
flash.utils.Endian.BIG_ENDIAN = "bigEndian";
flash.utils.Endian.LITTLE_ENDIAN = "littleEndian";
flash.utils.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
ApplicationMain.main();
})();

//@ sourceMappingURL=Mahjong.js.map