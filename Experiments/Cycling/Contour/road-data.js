/* Geographic cache coverage and Overpass query construction; no UI dependencies. */
const ContourRoadData = (() => {
  function subtract(bounds, covered) {
    const x0=Math.max(bounds.minX,covered.minX),x1=Math.min(bounds.maxX,covered.maxX);
    const y0=Math.max(bounds.minY,covered.minY),y1=Math.min(bounds.maxY,covered.maxY);
    if(x0>=x1||y0>=y1)return [bounds];
    return [
      {minX:bounds.minX,maxX:x0,minY:bounds.minY,maxY:bounds.maxY},
      {minX:x1,maxX:bounds.maxX,minY:bounds.minY,maxY:bounds.maxY},
      {minX:x0,maxX:x1,minY:bounds.minY,maxY:y0},
      {minX:x0,maxX:x1,minY:y1,maxY:bounds.maxY}
    ].filter(b=>b.maxX-b.minX>0.01&&b.maxY-b.minY>0.01);
  }
  function patches(bounds, maxSpan) {
    const result=[bounds];
    while(result.length<4){
      const index=result.findIndex(b=>Math.max(b.maxX-b.minX,b.maxY-b.minY)>maxSpan);
      if(index<0)break;
      const b=result.splice(index,1)[0];
      if(b.maxX-b.minX>b.maxY-b.minY){const mid=(b.minX+b.maxX)/2;result.push({...b,maxX:mid},{...b,minX:mid})}
      else{const mid=(b.minY+b.maxY)/2;result.push({...b,maxY:mid},{...b,minY:mid})}
    }
    return result;
  }
  function query(bbox) {
    const excluded='motorway|motorway_link|steps|construction|proposed|raceway|busway';
    const explicit='yes|designated|permissive';
    const conditional='[!"access:conditional"][!"bicycle:conditional"]';
    // Match the unconditional access rules used by roadAllowed before downloading nodes.
    return `[out:json][timeout:25][maxsize:134217728];(way["highway"]["highway"!~"^(${excluded}|footway|pedestrian|bridleway|corridor|trunk|trunk_link)$"]["bicycle"!~"^(no|private|use_sidepath|dismount)$"]["access"!~"^(no|private|customers|destination)$"]["vehicle"!~"^(no|private)$"]${conditional}(${bbox});way["highway"]["highway"!~"^(${excluded})$"]["bicycle"~"^(${explicit})$"]${conditional}(${bbox});)->.roads;(.roads;node(w.roads);rel(bw.roads)["type"="restriction"];);out body qt;`;
  }
  function merge(datasets) {
    const elements=new Map();
    for(const data of datasets)for(const element of data.elements)elements.set(element.type+'/'+element.id,element);
    return {elements:[...elements.values()]};
  }
  return {subtract,patches,query,merge};
})();
if(typeof module!=='undefined')module.exports=ContourRoadData;
