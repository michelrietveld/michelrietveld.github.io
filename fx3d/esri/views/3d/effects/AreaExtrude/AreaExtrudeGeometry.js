/**
 * Copyright @ 2018 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["esri/core/declare","esri/geometry/support/centroid","esri/views/3d/support/PromiseLightweight","esri/views/3d/layers/graphics/Graphics3DSymbolCommonCode","esri/core/libs/earcut/earcut","esri/views/3d/lib/gl-matrix","../../support/geometryUtils"],function(t,e,n,i,r,p,s){var a=p.vec3d,o=a.create(),d=a.create(),h=a.create(),c=a.create(),u=a.create(),x=a.create(),l=a.create(),m=a.create(),v=6378137,f={Down:0,Up:1},g=Math.cos(5*(Math.PI/180)),y=100.11,_=t(n.Promise,{constructor:function(t,n,r){var p=t.geometry.rings,s={rings:p,hasZ:!1};this.center=e.polygonCentroid(s),this._geometryData=i.copyPathData(p,t.geometry.hasZ),this._geometryData&&n>=0&&r>=0?(this.index=n,this.stride=r,this.resolve()):this.reject()},createBuffers:function(t,e){var n,p,a,o,d,h,c,u,x=this._geometryData.polygons,l=[],m=this._geometryData.vertexData;if(!m)return l;var v=m.length/3,g=new Float64Array(m.length);i.reproject(m,0,t,g,0,e,v);for(var _=new Float64Array(g),b=0;b<x.length;++b){n=x[b],c=n.count,u=n.index;var w=new Float64Array(m.buffer,3*u*m.BYTES_PER_ELEMENT,3*c);if(p=n.holeIndices.map(function(t){return t-u}),a=r(w,p,3),!(a.length<1)){var D={polygonIndex:b},E=new Float64Array(_.buffer,3*u*_.BYTES_PER_ELEMENT,3*c),F=this._computeNormalAndDistance(E);D.dist=F.distance;var z=s.getOrigin(g,v,u,c);if(z){D.origin=z;var A=[],N=[];o=n.count,d=2*o;for(var U=0;U<o;U++)h=U*this.stride,A[0+h]=w[0+3*U],A[1+h]=w[1+3*U],A[2+h]=1,A[3+h]=this.index,A[4+h]=f.Down,A[5+h]=this.center[0],A[6+h]=this.center[1],h=(U+o)*this.stride,A[0+h]=w[0+3*U],A[1+h]=w[1+3*U],A[2+h]=y,A[3+h]=this.index,A[4+h]=f.Up,A[5+h]=this.center[0],A[6+h]=this.center[1];for(var M=0,P=0,L=0;L<n.pathLengths.length;L++){P=n.pathLengths[L];for(var S=0;S<P;S++)S!==P-1?N.push(S+1+M,S+M,S+1+o+M,S+1+o+M,S+M,S+o+M):N.push(0+M,S+M,0+o+M,0+o+M,S+M,S+o+M);M+=P}this._subdivision2(w,E,a,o,A,N),D.indexNums=N.length,D.vertexNum=A.length/this.stride,D.vertices=new Float32Array(A),D.indices=new Uint32Array(N),l.push(D)}}}return l},_computeNormalAndDistance:function(t){var e=0,n=3,i=6;a.set3(t[e++],t[e++],t[e++],o),a.set3(t[n++],t[n++],t[n++],d),a.set3(t[i++],t[i++],t[i++],h),a.subtract(o,d,c),a.subtract(h,d,u);var r=a.create();a.cross(c,u,r),a.normalize(r,r);var p=Math.abs(a.dot(r,o)),s=v-p,x=a.normalize(o),l=a.dot(r,x),m=Math.abs(s/l);return{normal:r,distance:m}},_subdivision:function(t,e,n,i,r,p){for(var s,a,o,d,h,c,u,x,l=e.length/3,m=0,v=0,g=0;g<l;g++)d=e[m++],h=e[m++],c=e[m++],s=3*d,a=3*h,o=3*c,u=(t[s]+t[a]+t[o])/3,x=(t[s+1]+t[a+1]+t[o+1])/3,r.push(u,x,y,this.index,f.Up,this.center[0],this.center[1]),p.push(d+n,h+n,i+v),p.push(h+n,c+n,i+v),p.push(c+n,d+n,i+v),v++},_doSubdivision:function(t,e,n){if(t.length>0)for(var i,r,p,s,o,d,h,c,u,v,_=-1,b=e.length/this.stride;null!=(i=t.pop());)if(a.set(i.pt0,x),a.set(i.pt1,l),a.set(i.pt2,m),i.n0||(i.n0=a.create(),a.normalize(x,i.n0)),i.n1||(i.n1=a.create(),a.normalize(l,i.n1)),i.n2||(i.n2=a.create(),a.normalize(m,i.n2)),r=a.dot(i.n0,i.n1),p=a.dot(i.n1,i.n2),s=a.dot(i.n0,i.n2),r<g||p<g||s<g){if(o=Math.min(r,p,s),!isNaN(o)&&null!=o)if(o==r){_++,d=.5*(x[0]+l[0]),h=.5*(x[1]+l[1]),c=.5*(x[2]+l[2]),u=.5*(i.pt00[0]+i.pt11[0]),v=.5*(i.pt00[1]+i.pt11[1]);var w=a.createFrom(d,h,c);a.normalize(w),t.push({pt0:i.pt0,pt1:[d,h,c],pt2:i.pt2,pt00:i.pt00,pt11:[u,v],pt22:i.pt22,index0:i.index0,index1:b+_,index2:i.index2,n0:i.n0,n1:w,n2:i.n2}),t.push({pt0:[d,h,c],pt1:i.pt1,pt2:i.pt2,pt00:[u,v],pt11:i.pt11,pt22:i.pt22,index0:b+_,index1:i.index1,index2:i.index2,n0:w,n1:i.n1,n2:i.n2}),e.push(u,v,y,this.index,f.Up,this.center[0],this.center[1]),n.push(b+_,i.index0,i.index1)}else if(o==p){_++,d=.5*(l[0]+m[0]),h=.5*(l[1]+m[1]),c=.5*(l[2]+m[2]),u=.5*(i.pt22[0]+i.pt11[0]),v=.5*(i.pt22[1]+i.pt11[1]);var w=a.createFrom(d,h,c);a.normalize(w),t.push({pt0:i.pt0,pt1:i.pt1,pt2:[d,h,c],pt00:i.pt00,pt11:i.pt11,pt22:[u,v],index0:i.index0,index1:i.index1,index2:b+_,n0:i.n0,n1:i.n1,n2:w}),t.push({pt0:i.pt0,pt1:[d,h,c],pt2:i.pt2,pt00:i.pt00,pt11:[u,v],pt22:i.pt22,index0:i.index0,index1:b+_,index2:i.index2,n0:i.n0,n1:w,n2:i.n2}),e.push(u,v,y,this.index,f.Up,this.center[0],this.center[1]),n.push(b+_,i.index1,i.index2)}else if(o==s){_++,d=.5*(x[0]+m[0]),h=.5*(x[1]+m[1]),c=.5*(x[2]+m[2]),u=.5*(i.pt22[0]+i.pt00[0]),v=.5*(i.pt22[1]+i.pt00[1]);var w=a.createFrom(d,h,c);a.normalize(w),t.push({pt0:i.pt0,pt1:i.pt1,pt2:[d,h,c],pt00:i.pt00,pt11:i.pt11,pt22:[u,v],index0:i.index0,index1:i.index1,index2:b+_,n0:i.n0,n1:i.n1,n2:w}),t.push({pt0:[d,h,c],pt1:i.pt1,pt2:i.pt2,pt00:[u,v],pt11:i.pt11,pt22:i.pt22,index0:b+_,index1:i.index1,index2:i.index2,n0:w,n1:i.n1,n2:i.n2}),e.push(u,v,y,this.index,f.Up,this.center[0],this.center[1]),n.push(b+_,i.index2,i.index0)}}else n.push(i.index0,i.index1,i.index2)},_subdivision2:function(t,e,n,i,r,p){for(var s,a,o,d,h,c,u=n.length/3,x=0,l=0;l<u;l++)d=n[x++],h=n[x++],c=n[x++],s=3*d,a=3*h,o=3*c,this._doSubdivision([{pt0:[e[s],e[s+1],e[s+2]],pt1:[e[a],e[a+1],e[a+2]],pt2:[e[o],e[o+1],e[o+2]],pt00:[t[s],t[s+1]],pt11:[t[a],t[a+1]],pt22:[t[o],t[o+1]],index0:d+i,index1:h+i,index2:c+i}],r,p)},destroy:function(){this.isFulfilled()||this.reject()}});return _});