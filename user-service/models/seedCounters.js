const logger = require("../utils/logger");
const counter = require("./counter");

async function seedCounter()
{
   await counter.updateOne(
    {_id: "manager"},
    {
        $setOnInsert:{seq: 1000}
    },
    {upsert: true}
   );

   await counter.updateOne(
    {_id: "employee"},
    {
        $setOnInsert:{seq: 2000}
    },
    {upsert: true}
   );

   logger.info("Counters Initialized");
}

module.exports=seedCounter;