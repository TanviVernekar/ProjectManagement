import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {
  
  transform(value: any,filterstring : string) {
  console.log('value',value)
    if(value?.length === 0 || filterstring === ''){
      return value;
    }
    const employees = [];
    for(const employee of value){
      if(employee['name']?.toLowerCase().includes(filterstring?.toLocaleLowerCase())){
        employees.push(employee);
       
      }
    }
    return employees;


  // transform(value: any, ...args:any):any {
  //   if(!value) return null;
  //   if(!args) return value;

  //   return value.filter((item)=>{
  //     console.log(item)
  //     return item.includes(args)
  //   })
  // }


  
  }
}
