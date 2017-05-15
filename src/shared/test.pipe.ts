import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
 @Pipe({name: 'testPipe'})
 export class testPipe implements PipeTransform {
 	transform(value: any, join: string): any {
 		console.log(join);

 		for(var i in value){
 			console.log(value[i].direccion);
 		}
 		return value;
 	}
 }
