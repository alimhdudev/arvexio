import { checkDescription } from "../libs/checkdescription";
import { checkSubscription } from "../libs/subscription";
import { checkSubscriptionCheck } from "../libs/subscriptioncheck";

interface DescriptionResult {
    description: number;
}

export const Mbs = async () => {
    let MEGABYTES = 250;

    const isPro = await checkSubscription();
    const { description } = await checkDescription() as DescriptionResult;
    
    if(!isPro) {
        MEGABYTES = 250;
    }

    if(isPro) {
        if (description===1900) {MEGABYTES=250;}
        if (description===18000) {MEGABYTES=250;}
    
        if (description===4900) {MEGABYTES=450;}
        if (description===46800) {MEGABYTES=450;}
    
        if (description===14900) {MEGABYTES=650;}
        if (description===142800) {MEGABYTES=650;}
    }

    return MEGABYTES;
}