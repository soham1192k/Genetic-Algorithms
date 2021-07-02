#include<bits/stdc++.h>
#include <time.h>
#include<windows.h>
using namespace std;
struct Member{
    string DNA;
    int fitness;
};
struct Population{
    vector<Member>Members=vector<Member>(50000);
};
bool cmp(Member &a,Member &b){
    return a.fitness>b.fitness;
}
int main(){
    string DNA="ewohtp79 9yr98q4ygt 89pq4y 9p8qt g";
    bool done=false;
    int MutationRate=25;
    srand(time(NULL));
    Population Pop;
    for(int i=0;i<Pop.Members.size();i++){
        Pop.Members[i].DNA.resize(DNA.size());
        for(int j=0;j<DNA.size();j++){
            Pop.Members[i].DNA[j]=(unsigned char)rand()%96+32;
        }
        Pop.Members[i].fitness=0;
    }
    int Generation=0;
    while(!done){
        Generation++;
        for(int i=0;i<Pop.Members.size();i++){
            Pop.Members[i].fitness=0;
            for(int j=0;j<Pop.Members[i].DNA.size();j++){
                if(Pop.Members[i].DNA[j]==DNA[j]){
                    Pop.Members[i].fitness+=10;
                }
            }
            if(Pop.Members[i].DNA==DNA) done=true;
        }
        sort(Pop.Members.begin(),Pop.Members.end(),cmp);
        vector<Member>Parents;
        Parents.push_back(Pop.Members[0]);
        Parents.push_back(Pop.Members[1]);
        for(int i=0;i<Pop.Members.size();i++){
            for(int j=0;j<Pop.Members[i].DNA.size();j++){
                int temp=rand()%Parents.size();
                Pop.Members[i].DNA[j]=Parents[temp].DNA[j];
                if(rand()%1000<MutationRate){
                    Pop.Members[i].DNA[j]=(unsigned char)rand()%96+32;
                }
            }
        }
        cout<<"Generation: "<<Generation<<", Highest Fitness: "<<Parents[0].fitness<<", With Sequence: "<<Parents[0].DNA<<'\n';
        Sleep(2000);
    }
    cout<<"Evolved!!\n";
    return 0;
}