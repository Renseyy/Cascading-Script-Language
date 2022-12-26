let lib = {
    context:{
        functions:{
            'function':{
                arguments:[
                    {
                        name:'name',
                        type:[{
                            name:'StaticNode'
                        }]
                    },
                    {
                        name:'arg',
                        type:[{
                            name:'array',
                            insideTypes:['type']
                        }]
                    },
                    {
                        name:'callable',
                        type:[{
                            name:'fragment'
                        }]
                    }
                ],
                exec:function(runContext){
                    runFragment(callable,{

                    })
                }
            }
        },
        staticNodes:[
            
        ]
    }
}