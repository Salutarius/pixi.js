/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects. It is the base class of all display objects that act as a container for other objects.
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.CanvasGraphics = function()
{
	
}

// constructor

PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
{
	
	for (var i=0; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		var points = data.points;
		
		context.strokeStyle = color = '#' + ('00000' + ( data.lineColor | 0).toString(16)).substr(-6);

		context.lineWidth = data.lineWidth;
		context.globalAlpha = data.lineAlpha;
		
		if(data.type == PIXI.Graphics.POLY)
		{
			if(data.lineWidth <= 0)continue;
			
			context.beginPath();
			
			context.moveTo(points[0], points[1]);
			
			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			} 
	      	
	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}
			
			context.stroke();
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			// TODO - need to be Undefined!
			if(data.fillColor)
			{
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);

				context.fillRect(points[0], points[1], points[2], points[3]);
				
			}
			if(data.lineWidth)
			{
				context.strokeRect(points[0], points[1], points[2], points[3]);
			}
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
			
			if(data.fill)
			{
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{
			
			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			
			var elipseData =  data.points;
			
			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;
	
			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;
			
      		context.beginPath();
			
			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle
			
			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  
			context.closePath();
			
			if(data.fill)
			{
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
      			context.stroke();
			}
		}
      	
	   
	};
}