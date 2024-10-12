import { checkDescription } from "../libs/checkdescription";
import { checkSubscription } from "../libs/subscription";
import { checkSubscriptionCheck } from "../libs/subscriptioncheck";

interface DescriptionResult {
    description: number;
}

export const Minutes = async () => {
    let MEGABYTES = 1;

    const isPro = await checkSubscription();
    const { description } = await checkDescription() as DescriptionResult;
    
    if(!isPro) {
        MEGABYTES = 1;
    }

    if(isPro) {
        if (description===1900) {MEGABYTES=2;}
        if (description===18000) {MEGABYTES=2;}
    
        if (description===4900) {MEGABYTES=3;}
        if (description===46800) {MEGABYTES=3;}
    
        if (description===14900) {MEGABYTES=5;}
        if (description===142800) {MEGABYTES=5;}
    }

    return MEGABYTES;
}