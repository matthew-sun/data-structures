function distribute(nums,queues,n,digit) {
    for( var i=0; i<n+1 ;i++) {
        if( digit == 1 ) {
            queues[nums[i]%10].enqueue(nums[i]);
        }else {
            queues[Math.floor(nums[i]/10)].enqueue(nums[i]);
        }
    }
}

function collect(queues,nums) {
    var i=0;
    for(var digit=0;digit<11;digit++) {
        while(!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}

function dispArray(arr) {
    for(var i=0;i<arr.length;i++) {
        console.log(arr[i] + ' ');
    }
}
