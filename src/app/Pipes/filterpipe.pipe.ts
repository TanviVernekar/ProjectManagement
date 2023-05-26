import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {
  
  transform(value: any,filterstring : string) {
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




  
  }
}
